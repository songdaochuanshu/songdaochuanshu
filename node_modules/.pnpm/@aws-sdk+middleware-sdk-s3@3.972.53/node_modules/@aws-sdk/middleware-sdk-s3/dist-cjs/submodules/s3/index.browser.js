const { NoOpLogger, getSmithyContext } = require("@smithy/core/client");
const { HttpRequest, HttpResponse } = require("@smithy/core/protocols");
const { parseRfc7231DateTime } = require("@smithy/core/serde");
const { SignatureV4SignWithCredentials } = require("@aws-sdk/signature-v4-multi-region");
const { setFeature } = require("@aws-sdk/core/client");
require("@smithy/core/config");
const { httpSigningMiddlewareOptions } = require("@smithy/core");
const { Readable } = require("node:stream");
const { validate, parse } = require("@aws-sdk/core/util");
const { AwsRestXmlProtocol } = require("@aws-sdk/core/protocols");
const { NormalizedSchema } = require("@smithy/core/schema");

const CONTENT_LENGTH_HEADER = "content-length";
const DECODED_CONTENT_LENGTH_HEADER = "x-amz-decoded-content-length";
function checkContentLengthHeader() {
    return (next, context) => async (args) => {
        const { request } = args;
        if (HttpRequest.isInstance(request)) {
            if (!(CONTENT_LENGTH_HEADER in request.headers) && !(DECODED_CONTENT_LENGTH_HEADER in request.headers)) {
                const message = `Are you using a Stream of unknown length as the Body of a PutObject request? Consider using Upload instead from @aws-sdk/lib-storage.`;
                if (typeof context?.logger?.warn === "function" && !(context.logger instanceof NoOpLogger)) {
                    context.logger.warn(message);
                }
                else {
                    console.warn(message);
                }
            }
        }
        return next({ ...args });
    };
}
const checkContentLengthHeaderMiddlewareOptions = {
    step: "finalizeRequest",
    tags: ["CHECK_CONTENT_LENGTH_HEADER"],
    name: "getCheckContentLengthHeaderPlugin",
    override: true,
};
const getCheckContentLengthHeaderPlugin = (unused) => ({
    applyToStack: (clientStack) => {
        clientStack.add(checkContentLengthHeader(), checkContentLengthHeaderMiddlewareOptions);
    },
});

const regionRedirectEndpointMiddleware = (config) => {
    return (next, context) => async (args) => {
        const originalRegion = await config.region();
        const regionProviderRef = config.region;
        let unlock = () => { };
        if (context.__s3RegionRedirect) {
            Object.defineProperty(config, "region", {
                writable: false,
                value: async () => {
                    return context.__s3RegionRedirect;
                },
            });
            unlock = () => Object.defineProperty(config, "region", {
                writable: true,
                value: regionProviderRef,
            });
        }
        try {
            const result = await next(args);
            if (context.__s3RegionRedirect) {
                unlock();
                const region = await config.region();
                if (originalRegion !== region) {
                    throw new Error("Region was not restored following S3 region redirect.");
                }
            }
            return result;
        }
        catch (e) {
            unlock();
            throw e;
        }
    };
};
const regionRedirectEndpointMiddlewareOptions = {
    tags: ["REGION_REDIRECT", "S3"],
    name: "regionRedirectEndpointMiddleware",
    override: true,
    relation: "before",
    toMiddleware: "endpointV2Middleware",
};

function regionRedirectMiddleware(clientConfig) {
    return (next, context) => async (args) => {
        try {
            return await next(args);
        }
        catch (err) {
            if (clientConfig.followRegionRedirects) {
                const statusCode = err?.$metadata?.httpStatusCode;
                const isHeadBucket = context.commandName === "HeadBucketCommand";
                const bucketRegionHeader = err?.$response?.headers?.["x-amz-bucket-region"];
                if (bucketRegionHeader) {
                    if (statusCode === 301 ||
                        (statusCode === 400 && (err?.name === "IllegalLocationConstraintException" || isHeadBucket))) {
                        try {
                            const actualRegion = bucketRegionHeader;
                            context.logger?.debug(`Redirecting from ${await clientConfig.region()} to ${actualRegion}`);
                            context.__s3RegionRedirect = actualRegion;
                        }
                        catch (e) {
                            throw new Error("Region redirect failed: " + e);
                        }
                        return next(args);
                    }
                }
            }
            throw err;
        }
    };
}
const regionRedirectMiddlewareOptions = {
    step: "initialize",
    tags: ["REGION_REDIRECT", "S3"],
    name: "regionRedirectMiddleware",
    override: true,
};
const getRegionRedirectMiddlewarePlugin = (clientConfig) => ({
    applyToStack: (clientStack) => {
        clientStack.add(regionRedirectMiddleware(clientConfig), regionRedirectMiddlewareOptions);
        clientStack.addRelativeTo(regionRedirectEndpointMiddleware(clientConfig), regionRedirectEndpointMiddlewareOptions);
    },
});

class S3ExpressIdentityCache {
    data;
    lastPurgeTime = Date.now();
    static EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS = 30_000;
    constructor(data = {}) {
        this.data = data;
    }
    get(key) {
        const entry = this.data[key];
        if (!entry) {
            return;
        }
        return entry;
    }
    set(key, entry) {
        this.data[key] = entry;
        return entry;
    }
    delete(key) {
        delete this.data[key];
    }
    async purgeExpired() {
        const now = Date.now();
        if (this.lastPurgeTime + S3ExpressIdentityCache.EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS > now) {
            return;
        }
        for (const key in this.data) {
            const entry = this.data[key];
            if (!entry.isRefreshing) {
                const credential = await entry.identity;
                if (credential.expiration) {
                    if (credential.expiration.getTime() < now) {
                        delete this.data[key];
                    }
                }
            }
        }
    }
}

class S3ExpressIdentityCacheEntry {
    _identity;
    isRefreshing;
    accessed;
    constructor(_identity, isRefreshing = false, accessed = Date.now()) {
        this._identity = _identity;
        this.isRefreshing = isRefreshing;
        this.accessed = accessed;
    }
    get identity() {
        this.accessed = Date.now();
        return this._identity;
    }
}

class S3ExpressIdentityProviderImpl {
    createSessionFn;
    cache;
    static REFRESH_WINDOW_MS = 60_000;
    constructor(createSessionFn, cache = new S3ExpressIdentityCache()) {
        this.createSessionFn = createSessionFn;
        this.cache = cache;
    }
    async getS3ExpressIdentity(awsIdentity, identityProperties) {
        const key = identityProperties.Bucket;
        const { cache } = this;
        const entry = cache.get(key);
        if (entry) {
            return entry.identity.then((identity) => {
                const isExpired = (identity.expiration?.getTime() ?? 0) < Date.now();
                if (isExpired) {
                    return cache.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
                }
                const isExpiringSoon = (identity.expiration?.getTime() ?? 0) < Date.now() + S3ExpressIdentityProviderImpl.REFRESH_WINDOW_MS;
                if (isExpiringSoon && !entry.isRefreshing) {
                    entry.isRefreshing = true;
                    this.getIdentity(key).then((id) => {
                        cache.set(key, new S3ExpressIdentityCacheEntry(Promise.resolve(id)));
                    });
                }
                return identity;
            });
        }
        return cache.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
    }
    async getIdentity(key) {
        await this.cache.purgeExpired().catch((error) => {
            console.warn("Error while clearing expired entries in S3ExpressIdentityCache: \n" + error);
        });
        const session = await this.createSessionFn(key);
        if (!session.Credentials?.AccessKeyId || !session.Credentials?.SecretAccessKey) {
            throw new Error("s3#createSession response credential missing AccessKeyId or SecretAccessKey.");
        }
        const identity = {
            accessKeyId: session.Credentials.AccessKeyId,
            secretAccessKey: session.Credentials.SecretAccessKey,
            sessionToken: session.Credentials.SessionToken,
            expiration: session.Credentials.Expiration ? new Date(session.Credentials.Expiration) : undefined,
        };
        return identity;
    }
}

const resolveS3Config = (input, { session, }) => {
    const [s3ClientProvider, CreateSessionCommandCtor] = session;
    const { forcePathStyle, useAccelerateEndpoint, disableMultiregionAccessPoints, followRegionRedirects, s3ExpressIdentityProvider, bucketEndpoint, expectContinueHeader, } = input;
    return Object.assign(input, {
        forcePathStyle: forcePathStyle ?? false,
        useAccelerateEndpoint: useAccelerateEndpoint ?? false,
        disableMultiregionAccessPoints: disableMultiregionAccessPoints ?? false,
        followRegionRedirects: followRegionRedirects ?? false,
        s3ExpressIdentityProvider: s3ExpressIdentityProvider ??
            new S3ExpressIdentityProviderImpl(async (key) => s3ClientProvider().send(new CreateSessionCommandCtor({
                Bucket: key,
            }))),
        bucketEndpoint: bucketEndpoint ?? false,
        expectContinueHeader: expectContinueHeader ?? 2_097_152,
    });
};

const s3ExpiresMiddleware = (config) => {
    return (next, context) => async (args) => {
        const result = await next(args);
        const { response } = result;
        if (HttpResponse.isInstance(response)) {
            if (response.headers.expires) {
                response.headers.expiresstring = response.headers.expires;
                try {
                    parseRfc7231DateTime(response.headers.expires);
                }
                catch (e) {
                    context.logger?.warn(`AWS SDK Warning for ${context.clientName}::${context.commandName} response parsing (${response.headers.expires}): ${e}`);
                    delete response.headers.expires;
                }
            }
        }
        return result;
    };
};
const s3ExpiresMiddlewareOptions = {
    tags: ["S3"],
    name: "s3ExpiresMiddleware",
    override: true,
    relation: "after",
    toMiddleware: "deserializerMiddleware",
};
const getS3ExpiresMiddlewarePlugin = (clientConfig) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(s3ExpiresMiddleware(), s3ExpiresMiddlewareOptions);
    },
});

class SignatureV4S3Express extends SignatureV4SignWithCredentials {
}

const S3_EXPRESS_BUCKET_TYPE = "Directory";
const S3_EXPRESS_BACKEND = "S3Express";
const S3_EXPRESS_AUTH_SCHEME = "sigv4-s3express";
const SESSION_TOKEN_QUERY_PARAM = "X-Amz-S3session-Token";
const SESSION_TOKEN_HEADER = SESSION_TOKEN_QUERY_PARAM.toLowerCase();

const s3ExpressMiddleware = (options) => {
    return (next, context) => async (args) => {
        if (context.endpointV2) {
            const endpoint = context.endpointV2;
            const isS3ExpressAuth = endpoint.properties?.authSchemes?.[0]?.name === S3_EXPRESS_AUTH_SCHEME;
            const isS3ExpressBucket = endpoint.properties?.backend === S3_EXPRESS_BACKEND ||
                endpoint.properties?.bucketType === S3_EXPRESS_BUCKET_TYPE;
            if (isS3ExpressBucket) {
                setFeature(context, "S3_EXPRESS_BUCKET", "J");
                context.isS3ExpressBucket = true;
            }
            if (isS3ExpressAuth) {
                const requestBucket = args.input.Bucket;
                if (requestBucket) {
                    const s3ExpressIdentity = await options.s3ExpressIdentityProvider.getS3ExpressIdentity(await options.credentials(), {
                        Bucket: requestBucket,
                    });
                    context.s3ExpressIdentity = s3ExpressIdentity;
                    if (HttpRequest.isInstance(args.request) && s3ExpressIdentity.sessionToken) {
                        args.request.headers[SESSION_TOKEN_HEADER] = s3ExpressIdentity.sessionToken;
                    }
                }
            }
        }
        return next(args);
    };
};
const s3ExpressMiddlewareOptions = {
    name: "s3ExpressMiddleware",
    step: "build",
    tags: ["S3", "S3_EXPRESS"],
    override: true,
};
const getS3ExpressPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(s3ExpressMiddleware(options), s3ExpressMiddlewareOptions);
    },
});

const signS3Express = async (s3ExpressIdentity, signingOptions, request, sigV4MultiRegionSigner) => {
    const signedRequest = await sigV4MultiRegionSigner.signWithCredentials(request, s3ExpressIdentity, {});
    if (signedRequest.headers["X-Amz-Security-Token"] || signedRequest.headers["x-amz-security-token"]) {
        throw new Error("X-Amz-Security-Token must not be set for s3-express requests.");
    }
    return signedRequest;
};

const defaultErrorHandler = (signingProperties) => (error) => {
    throw error;
};
const defaultSuccessHandler = (httpResponse, signingProperties) => { };
const s3ExpressHttpSigningMiddlewareOptions = httpSigningMiddlewareOptions;
const s3ExpressHttpSigningMiddleware = (config) => (next, context) => async (args) => {
    if (!HttpRequest.isInstance(args.request)) {
        return next(args);
    }
    const smithyContext = getSmithyContext(context);
    const scheme = smithyContext.selectedHttpAuthScheme;
    if (!scheme) {
        throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
    }
    const { httpAuthOption: { signingProperties = {} }, identity, signer, } = scheme;
    let request;
    if (context.s3ExpressIdentity) {
        request = await signS3Express(context.s3ExpressIdentity, signingProperties, args.request, await config.signer());
    }
    else {
        request = await signer.sign(args.request, identity, signingProperties);
    }
    const output = await next({
        ...args,
        request,
    }).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
    (signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
    return output;
};
const getS3ExpressHttpSigningPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(s3ExpressHttpSigningMiddleware(config), httpSigningMiddlewareOptions);
    },
});

function toStream(bytes) {
    return Readable.from(Buffer.from(bytes));
}

const THROW_IF_EMPTY_BODY = {
    CopyObjectCommand: true,
    UploadPartCopyCommand: true,
    CompleteMultipartUploadCommand: true,
};
const throw200ExceptionsMiddleware = (config) => (next, context) => async (args) => {
    const result = await next(args);
    const { response } = result;
    if (!HttpResponse.isInstance(response)) {
        return result;
    }
    const { statusCode, body } = response;
    if (statusCode < 200 || statusCode >= 300) {
        return result;
    }
    const bodyBytes = await collectBody(body, config);
    response.body = toStream(bodyBytes);
    if (bodyBytes.length === 0 && THROW_IF_EMPTY_BODY[context.commandName]) {
        const err = new Error("S3 aborted request");
        err.$metadata = {
            httpStatusCode: 503,
        };
        err.name = "InternalError";
        throw err;
    }
    const bodyStringTail = config.utf8Encoder(bodyBytes.subarray(bodyBytes.length - 16));
    if (bodyStringTail && bodyStringTail.endsWith("</Error>")) {
        response.statusCode = 503;
    }
    return result;
};
const collectBody = (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
const throw200ExceptionsMiddlewareOptions = {
    relation: "after",
    toMiddleware: "deserializerMiddleware",
    tags: ["THROW_200_EXCEPTIONS", "S3"],
    name: "throw200ExceptionsMiddleware",
    override: true,
};
const getThrow200ExceptionsPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(throw200ExceptionsMiddleware(config), throw200ExceptionsMiddlewareOptions);
    },
});

function bucketEndpointMiddleware$1(options) {
    return (next, context) => async (args) => {
        if (options.bucketEndpoint) {
            const endpoint = context.endpointV2;
            if (endpoint) {
                const bucket = args.input.Bucket;
                if (typeof bucket === "string") {
                    try {
                        const bucketEndpointUrl = new URL(bucket);
                        context.endpointV2 = {
                            ...endpoint,
                            url: bucketEndpointUrl,
                        };
                    }
                    catch (e) {
                        const warning = `@aws-sdk/middleware-sdk-s3: bucketEndpoint=true was set but Bucket=${bucket} could not be parsed as URL.`;
                        if (context.logger?.constructor?.name === "NoOpLogger") {
                            console.warn(warning);
                        }
                        else {
                            context.logger?.warn?.(warning);
                        }
                        throw e;
                    }
                }
            }
        }
        return next(args);
    };
}
const bucketEndpointMiddlewareOptions$1 = {
    name: "bucketEndpointMiddleware",
    override: true,
    relation: "after",
    toMiddleware: "endpointV2Middleware",
};

function validateBucketNameMiddleware({ bucketEndpoint }) {
    return (next) => async (args) => {
        const { input: { Bucket }, } = args;
        if (!bucketEndpoint && typeof Bucket === "string" && !validate(Bucket) && Bucket.indexOf("/") >= 0) {
            const err = new Error(`Bucket name shouldn't contain '/', received '${Bucket}'`);
            err.name = "InvalidBucketName";
            throw err;
        }
        return next({ ...args });
    };
}
const validateBucketNameMiddlewareOptions = {
    step: "initialize",
    tags: ["VALIDATE_BUCKET_NAME"],
    name: "validateBucketNameMiddleware",
    override: true,
};
const getValidateBucketNamePlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(validateBucketNameMiddleware(options), validateBucketNameMiddlewareOptions);
        clientStack.addRelativeTo(bucketEndpointMiddleware$1(options), bucketEndpointMiddlewareOptions$1);
    },
});

class S3RestXmlProtocol extends AwsRestXmlProtocol {
    async serializeRequest(operationSchema, input, context) {
        const request = await super.serializeRequest(operationSchema, input, context);
        const ns = NormalizedSchema.of(operationSchema.input);
        const staticStructureSchema = ns.getSchema();
        let bucketMemberIndex = 0;
        const requiredMemberCount = staticStructureSchema[6] ?? 0;
        if (input && typeof input === "object") {
            for (const [memberName, memberNs] of ns.structIterator()) {
                if (++bucketMemberIndex > requiredMemberCount) {
                    break;
                }
                if (memberName === "Bucket") {
                    if (!input.Bucket && memberNs.getMergedTraits().httpLabel) {
                        throw new Error(`No value provided for input HTTP label: Bucket.`);
                    }
                    break;
                }
            }
        }
        return request;
    }
}

const DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
const IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
const DOTS_PATTERN = /\.\./;
const DOT_PATTERN = /\./;
const S3_HOSTNAME_PATTERN = /^(.+\.)?s3(-fips)?(\.dualstack)?[.-]([a-z0-9-]+)\./;
const S3_US_EAST_1_ALTNAME_PATTERN = /^s3(-external-1)?\.amazonaws\.com$/;
const AWS_PARTITION_SUFFIX = "amazonaws.com";
const isBucketNameOptions = (options) => typeof options.bucketName === "string";
const isDnsCompatibleBucketName = (bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
const getRegionalSuffix = (hostname) => {
    const parts = hostname.match(S3_HOSTNAME_PATTERN);
    return [parts[4], hostname.replace(new RegExp(`^${parts[0]}`), "")];
};
const getSuffix = (hostname) => S3_US_EAST_1_ALTNAME_PATTERN.test(hostname) ? ["us-east-1", AWS_PARTITION_SUFFIX] : getRegionalSuffix(hostname);
const getSuffixForArnEndpoint = (hostname) => S3_US_EAST_1_ALTNAME_PATTERN.test(hostname)
    ? [hostname.replace(`.${AWS_PARTITION_SUFFIX}`, ""), AWS_PARTITION_SUFFIX]
    : getRegionalSuffix(hostname);
const validateArnEndpointOptions = (options) => {
    if (options.pathStyleEndpoint) {
        throw new Error("Path-style S3 endpoint is not supported when bucket is an ARN");
    }
    if (options.accelerateEndpoint) {
        throw new Error("Accelerate endpoint is not supported when bucket is an ARN");
    }
    if (!options.tlsCompatible) {
        throw new Error("HTTPS is required when bucket is an ARN");
    }
};
const validateService = (service) => {
    if (service !== "s3" && service !== "s3-outposts" && service !== "s3-object-lambda") {
        throw new Error("Expect 's3' or 's3-outposts' or 's3-object-lambda' in ARN service component");
    }
};
const validateS3Service = (service) => {
    if (service !== "s3") {
        throw new Error("Expect 's3' in Accesspoint ARN service component");
    }
};
const validateOutpostService = (service) => {
    if (service !== "s3-outposts") {
        throw new Error("Expect 's3-posts' in Outpost ARN service component");
    }
};
const validatePartition = (partition, options) => {
    if (partition !== options.clientPartition) {
        throw new Error(`Partition in ARN is incompatible, got "${partition}" but expected "${options.clientPartition}"`);
    }
};
const validateRegion = (region, options) => { };
const validateRegionalClient = (region) => {
    if (["s3-external-1", "aws-global"].includes(region)) {
        throw new Error(`Client region ${region} is not regional`);
    }
};
const validateAccountId = (accountId) => {
    if (!/[0-9]{12}/.exec(accountId)) {
        throw new Error("Access point ARN accountID does not match regex '[0-9]{12}'");
    }
};
const validateDNSHostLabel = (label, options = { tlsCompatible: true }) => {
    if (label.length >= 64 ||
        !/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/.test(label) ||
        /(\d+\.){3}\d+/.test(label) ||
        /[.-]{2}/.test(label) ||
        (options?.tlsCompatible && DOT_PATTERN.test(label))) {
        throw new Error(`Invalid DNS label ${label}`);
    }
};
const validateCustomEndpoint = (options) => {
    if (options.isCustomEndpoint) {
        if (options.dualstackEndpoint)
            throw new Error("Dualstack endpoint is not supported with custom endpoint");
        if (options.accelerateEndpoint)
            throw new Error("Accelerate endpoint is not supported with custom endpoint");
    }
};
const getArnResources = (resource) => {
    const delimiter = resource.includes(":") ? ":" : "/";
    const [resourceType, ...rest] = resource.split(delimiter);
    if (resourceType === "accesspoint") {
        if (rest.length !== 1 || rest[0] === "") {
            throw new Error(`Access Point ARN should have one resource accesspoint${delimiter}{accesspointname}`);
        }
        return { accesspointName: rest[0] };
    }
    else if (resourceType === "outpost") {
        if (!rest[0] || rest[1] !== "accesspoint" || !rest[2] || rest.length !== 3) {
            throw new Error(`Outpost ARN should have resource outpost${delimiter}{outpostId}${delimiter}accesspoint${delimiter}{accesspointName}`);
        }
        const [outpostId, _, accesspointName] = rest;
        return { outpostId, accesspointName };
    }
    else {
        throw new Error(`ARN resource should begin with 'accesspoint${delimiter}' or 'outpost${delimiter}'`);
    }
};
const validateNoDualstack = (dualstackEndpoint) => { };
const validateNoFIPS = (useFipsEndpoint) => {
    if (useFipsEndpoint)
        throw new Error(`FIPS region is not supported with Outpost.`);
};
const validateMrapAlias = (name) => {
    try {
        name.split(".").forEach((label) => {
            validateDNSHostLabel(label);
        });
    }
    catch (e) {
        throw new Error(`"${name}" is not a DNS compatible name.`);
    }
};

const bucketHostname = (options) => {
    validateCustomEndpoint(options);
    return isBucketNameOptions(options)
        ?
            getEndpointFromBucketName(options)
        :
            getEndpointFromArn(options);
};
const getEndpointFromBucketName = ({ accelerateEndpoint = false, clientRegion: region, baseHostname, bucketName, dualstackEndpoint = false, fipsEndpoint = false, pathStyleEndpoint = false, tlsCompatible = true, isCustomEndpoint = false, }) => {
    const [clientRegion, hostnameSuffix] = isCustomEndpoint ? [region, baseHostname] : getSuffix(baseHostname);
    if (pathStyleEndpoint || !isDnsCompatibleBucketName(bucketName) || (tlsCompatible && DOT_PATTERN.test(bucketName))) {
        return {
            bucketEndpoint: false,
            hostname: dualstackEndpoint ? `s3.dualstack.${clientRegion}.${hostnameSuffix}` : baseHostname,
        };
    }
    if (accelerateEndpoint) {
        baseHostname = `s3-accelerate${dualstackEndpoint ? ".dualstack" : ""}.${hostnameSuffix}`;
    }
    else if (dualstackEndpoint) {
        baseHostname = `s3.dualstack.${clientRegion}.${hostnameSuffix}`;
    }
    return {
        bucketEndpoint: true,
        hostname: `${bucketName}.${baseHostname}`,
    };
};
const getEndpointFromArn = (options) => {
    const { isCustomEndpoint, baseHostname, clientRegion } = options;
    const hostnameSuffix = isCustomEndpoint ? baseHostname : getSuffixForArnEndpoint(baseHostname)[1];
    const { pathStyleEndpoint, accelerateEndpoint = false, fipsEndpoint = false, tlsCompatible = true, bucketName, clientPartition = "aws", } = options;
    validateArnEndpointOptions({ pathStyleEndpoint, accelerateEndpoint, tlsCompatible });
    const { service, partition, accountId, region, resource } = bucketName;
    validateService(service);
    validatePartition(partition, { clientPartition });
    validateAccountId(accountId);
    const { accesspointName, outpostId } = getArnResources(resource);
    if (service === "s3-object-lambda") {
        return getEndpointFromObjectLambdaArn({ ...options, tlsCompatible, bucketName, accesspointName, hostnameSuffix });
    }
    if (region === "") {
        return getEndpointFromMRAPArn({ ...options, mrapAlias: accesspointName, hostnameSuffix });
    }
    if (outpostId) {
        return getEndpointFromOutpostArn({ ...options, clientRegion, outpostId, accesspointName, hostnameSuffix });
    }
    return getEndpointFromAccessPointArn({ ...options, clientRegion, accesspointName, hostnameSuffix });
};
const getEndpointFromObjectLambdaArn = ({ dualstackEndpoint = false, fipsEndpoint = false, tlsCompatible = true, useArnRegion, clientRegion, clientSigningRegion = clientRegion, accesspointName, bucketName, hostnameSuffix, }) => {
    const { accountId, region, service } = bucketName;
    validateRegionalClient(clientRegion);
    const DNSHostLabel = `${accesspointName}-${accountId}`;
    validateDNSHostLabel(DNSHostLabel, { tlsCompatible });
    const endpointRegion = useArnRegion ? region : clientRegion;
    const signingRegion = useArnRegion ? region : clientSigningRegion;
    return {
        bucketEndpoint: true,
        hostname: `${DNSHostLabel}.${service}${fipsEndpoint ? "-fips" : ""}.${endpointRegion}.${hostnameSuffix}`,
        signingRegion,
        signingService: service,
    };
};
const getEndpointFromMRAPArn = ({ disableMultiregionAccessPoints, dualstackEndpoint = false, isCustomEndpoint, mrapAlias, hostnameSuffix, }) => {
    if (disableMultiregionAccessPoints === true) {
        throw new Error("SDK is attempting to use a MRAP ARN. Please enable to feature.");
    }
    validateMrapAlias(mrapAlias);
    return {
        bucketEndpoint: true,
        hostname: `${mrapAlias}${isCustomEndpoint ? "" : `.accesspoint.s3-global`}.${hostnameSuffix}`,
        signingRegion: "*",
    };
};
const getEndpointFromOutpostArn = ({ useArnRegion, clientRegion, clientSigningRegion = clientRegion, bucketName, outpostId, dualstackEndpoint = false, fipsEndpoint = false, tlsCompatible = true, accesspointName, isCustomEndpoint, hostnameSuffix, }) => {
    validateRegionalClient(clientRegion);
    const DNSHostLabel = `${accesspointName}-${bucketName.accountId}`;
    validateDNSHostLabel(DNSHostLabel, { tlsCompatible });
    const endpointRegion = useArnRegion ? bucketName.region : clientRegion;
    const signingRegion = useArnRegion ? bucketName.region : clientSigningRegion;
    validateOutpostService(bucketName.service);
    validateDNSHostLabel(outpostId, { tlsCompatible });
    validateNoFIPS(fipsEndpoint);
    const hostnamePrefix = `${DNSHostLabel}.${outpostId}`;
    return {
        bucketEndpoint: true,
        hostname: `${hostnamePrefix}${isCustomEndpoint ? "" : `.s3-outposts.${endpointRegion}`}.${hostnameSuffix}`,
        signingRegion,
        signingService: "s3-outposts",
    };
};
const getEndpointFromAccessPointArn = ({ useArnRegion, clientRegion, clientSigningRegion = clientRegion, bucketName, dualstackEndpoint = false, fipsEndpoint = false, tlsCompatible = true, accesspointName, isCustomEndpoint, hostnameSuffix, }) => {
    validateRegionalClient(clientRegion);
    const hostnamePrefix = `${accesspointName}-${bucketName.accountId}`;
    validateDNSHostLabel(hostnamePrefix, { tlsCompatible });
    const endpointRegion = useArnRegion ? bucketName.region : clientRegion;
    const signingRegion = useArnRegion ? bucketName.region : clientSigningRegion;
    validateS3Service(bucketName.service);
    return {
        bucketEndpoint: true,
        hostname: `${hostnamePrefix}${isCustomEndpoint
            ? ""
            : `.s3-accesspoint${fipsEndpoint ? "-fips" : ""}${dualstackEndpoint ? ".dualstack" : ""}.${endpointRegion}`}.${hostnameSuffix}`,
        signingRegion,
    };
};

const bucketEndpointMiddleware = (options) => (next, context) => async (args) => {
    const { Bucket: bucketName } = args.input;
    let replaceBucketInPath = options.bucketEndpoint;
    const request = args.request;
    if (HttpRequest.isInstance(request)) {
        if (options.bucketEndpoint) {
            request.hostname = bucketName;
        }
        else if (validate(bucketName)) {
            const bucketArn = parse(bucketName);
            const clientRegion = await options.region();
            const useDualstackEndpoint = await options.useDualstackEndpoint();
            const useFipsEndpoint = await options.useFipsEndpoint();
            const { partition, signingRegion = clientRegion } = (await options.regionInfoProvider(clientRegion, { useDualstackEndpoint, useFipsEndpoint })) || {};
            const useArnRegion = await options.useArnRegion();
            const { hostname, bucketEndpoint, signingRegion: modifiedSigningRegion, signingService, } = bucketHostname({
                bucketName: bucketArn,
                baseHostname: request.hostname,
                accelerateEndpoint: options.useAccelerateEndpoint,
                dualstackEndpoint: useDualstackEndpoint,
                fipsEndpoint: useFipsEndpoint,
                pathStyleEndpoint: options.forcePathStyle,
                tlsCompatible: request.protocol === "https:",
                useArnRegion,
                clientPartition: partition,
                clientSigningRegion: signingRegion,
                clientRegion: clientRegion,
                isCustomEndpoint: options.isCustomEndpoint,
                disableMultiregionAccessPoints: await options.disableMultiregionAccessPoints(),
            });
            if (modifiedSigningRegion && modifiedSigningRegion !== signingRegion) {
                context["signing_region"] = modifiedSigningRegion;
            }
            if (signingService && signingService !== "s3") {
                context["signing_service"] = signingService;
            }
            request.hostname = hostname;
            replaceBucketInPath = bucketEndpoint;
        }
        else {
            const clientRegion = await options.region();
            const dualstackEndpoint = await options.useDualstackEndpoint();
            const fipsEndpoint = await options.useFipsEndpoint();
            const { hostname, bucketEndpoint } = bucketHostname({
                bucketName,
                clientRegion,
                baseHostname: request.hostname,
                accelerateEndpoint: options.useAccelerateEndpoint,
                dualstackEndpoint,
                fipsEndpoint,
                pathStyleEndpoint: options.forcePathStyle,
                tlsCompatible: request.protocol === "https:",
                isCustomEndpoint: options.isCustomEndpoint,
            });
            request.hostname = hostname;
            replaceBucketInPath = bucketEndpoint;
        }
        if (replaceBucketInPath) {
            request.path = request.path.replace(/^(\/)?[^\/]+/, "");
            if (request.path === "") {
                request.path = "/";
            }
        }
    }
    return next({ ...args, request });
};
const bucketEndpointMiddlewareOptions = {
    tags: ["BUCKET_ENDPOINT"],
    name: "bucketEndpointMiddleware",
    relation: "before",
    toMiddleware: "hostHeaderMiddleware",
    override: true,
};
const getBucketEndpointPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(bucketEndpointMiddleware(options), bucketEndpointMiddlewareOptions);
    },
});

function resolveBucketEndpointConfig(input) {
    const { bucketEndpoint = false, forcePathStyle = false, useAccelerateEndpoint = false, useArnRegion, disableMultiregionAccessPoints = false, } = input;
    return Object.assign(input, {
        bucketEndpoint,
        forcePathStyle,
        useAccelerateEndpoint,
        useArnRegion: typeof useArnRegion === "function" ? useArnRegion : () => Promise.resolve(useArnRegion),
        disableMultiregionAccessPoints: typeof disableMultiregionAccessPoints === "function"
            ? disableMultiregionAccessPoints
            : () => Promise.resolve(disableMultiregionAccessPoints),
    });
}

function addExpectContinueMiddleware(options) {
    return (next) => async (args) => {
        const { request } = args;
        if (options.expectContinueHeader !== false &&
            HttpRequest.isInstance(request) &&
            request.body &&
            options.runtime === "node" &&
            options.requestHandler?.constructor?.name !== "FetchHttpHandler") {
            let sendHeader = true;
            if (typeof options.expectContinueHeader === "number") {
                try {
                    const bodyLength = Number(request.headers?.["content-length"]) ?? options.bodyLengthChecker?.(request.body) ?? Infinity;
                    sendHeader = bodyLength >= options.expectContinueHeader;
                }
                catch (e) { }
            }
            else {
                sendHeader = !!options.expectContinueHeader;
            }
            if (sendHeader) {
                request.headers.Expect = "100-continue";
            }
        }
        return next({
            ...args,
            request,
        });
    };
}
const addExpectContinueMiddlewareOptions = {
    step: "build",
    tags: ["SET_EXPECT_HEADER", "EXPECT_HEADER"],
    name: "addExpectContinueMiddleware",
    override: true,
};
const getAddExpectContinuePlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(addExpectContinueMiddleware(options), addExpectContinueMiddlewareOptions);
    },
});

function locationConstraintMiddleware(options) {
    return (next) => async (args) => {
        const { CreateBucketConfiguration } = args.input;
        const region = await options.region();
        if (!CreateBucketConfiguration?.LocationConstraint && !CreateBucketConfiguration?.Location) {
            if (region !== "us-east-1") {
                args.input.CreateBucketConfiguration = args.input.CreateBucketConfiguration ?? {};
                args.input.CreateBucketConfiguration.LocationConstraint = region;
            }
        }
        return next(args);
    };
}
const locationConstraintMiddlewareOptions = {
    step: "initialize",
    tags: ["LOCATION_CONSTRAINT", "CREATE_BUCKET_CONFIGURATION"],
    name: "locationConstraintMiddleware",
    override: true,
};
const getLocationConstraintPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.add(locationConstraintMiddleware(config), locationConstraintMiddlewareOptions);
    },
});

function resolveLocationConstraintConfig(input) {
    return input;
}

function ssecMiddleware(options) {
    return (next) => async (args) => {
        const input = { ...args.input };
        const properties = [
            {
                target: "SSECustomerKey",
                hash: "SSECustomerKeyMD5",
            },
            {
                target: "CopySourceSSECustomerKey",
                hash: "CopySourceSSECustomerKeyMD5",
            },
        ];
        for (const prop of properties) {
            const value = input[prop.target];
            if (value) {
                let valueForHash;
                if (typeof value === "string") {
                    if (isValidBase64EncodedSSECustomerKey(value, options)) {
                        valueForHash = options.base64Decoder(value);
                    }
                    else {
                        valueForHash = options.utf8Decoder(value);
                        input[prop.target] = options.base64Encoder(valueForHash);
                    }
                }
                else {
                    valueForHash = ArrayBuffer.isView(value)
                        ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
                        : new Uint8Array(value);
                    input[prop.target] = options.base64Encoder(valueForHash);
                }
                const hash = new options.md5();
                hash.update(valueForHash);
                input[prop.hash] = options.base64Encoder(await hash.digest());
            }
        }
        return next({
            ...args,
            input,
        });
    };
}
const ssecMiddlewareOptions = {
    name: "ssecMiddleware",
    step: "initialize",
    tags: ["SSE"],
    override: true,
};
const getSsecPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.add(ssecMiddleware(config), ssecMiddlewareOptions);
    },
});
function isValidBase64EncodedSSECustomerKey(str, options) {
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    if (!base64Regex.test(str))
        return false;
    try {
        const decodedBytes = options.base64Decoder(str);
        return decodedBytes.length === 32;
    }
    catch {
        return false;
    }
}

const no = Symbol.for("node-only");
const NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS = no;
const NODE_DISABLE_MULTIREGION_ACCESS_POINT_CONFIG_OPTIONS = no;
const NODE_DISABLE_MULTIREGION_ACCESS_POINT_ENV_NAME = no;
const NODE_DISABLE_MULTIREGION_ACCESS_POINT_INI_NAME = no;
const NODE_USE_ARN_REGION_CONFIG_OPTIONS = no;
const NODE_USE_ARN_REGION_ENV_NAME = no;
const NODE_USE_ARN_REGION_INI_NAME = no;

exports.NODE_DISABLE_MULTIREGION_ACCESS_POINT_CONFIG_OPTIONS = NODE_DISABLE_MULTIREGION_ACCESS_POINT_CONFIG_OPTIONS;
exports.NODE_DISABLE_MULTIREGION_ACCESS_POINT_ENV_NAME = NODE_DISABLE_MULTIREGION_ACCESS_POINT_ENV_NAME;
exports.NODE_DISABLE_MULTIREGION_ACCESS_POINT_INI_NAME = NODE_DISABLE_MULTIREGION_ACCESS_POINT_INI_NAME;
exports.NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS = NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS;
exports.NODE_USE_ARN_REGION_CONFIG_OPTIONS = NODE_USE_ARN_REGION_CONFIG_OPTIONS;
exports.NODE_USE_ARN_REGION_ENV_NAME = NODE_USE_ARN_REGION_ENV_NAME;
exports.NODE_USE_ARN_REGION_INI_NAME = NODE_USE_ARN_REGION_INI_NAME;
exports.S3ExpressIdentityCache = S3ExpressIdentityCache;
exports.S3ExpressIdentityCacheEntry = S3ExpressIdentityCacheEntry;
exports.S3ExpressIdentityProviderImpl = S3ExpressIdentityProviderImpl;
exports.S3RestXmlProtocol = S3RestXmlProtocol;
exports.SignatureV4S3Express = SignatureV4S3Express;
exports.addExpectContinueMiddleware = addExpectContinueMiddleware;
exports.addExpectContinueMiddlewareOptions = addExpectContinueMiddlewareOptions;
exports.bucketEndpointMiddleware = bucketEndpointMiddleware;
exports.bucketEndpointMiddlewareOptions = bucketEndpointMiddlewareOptions;
exports.bucketHostname = bucketHostname;
exports.checkContentLengthHeader = checkContentLengthHeader;
exports.checkContentLengthHeaderMiddlewareOptions = checkContentLengthHeaderMiddlewareOptions;
exports.getAddExpectContinuePlugin = getAddExpectContinuePlugin;
exports.getArnResources = getArnResources;
exports.getBucketEndpointPlugin = getBucketEndpointPlugin;
exports.getCheckContentLengthHeaderPlugin = getCheckContentLengthHeaderPlugin;
exports.getLocationConstraintPlugin = getLocationConstraintPlugin;
exports.getRegionRedirectMiddlewarePlugin = getRegionRedirectMiddlewarePlugin;
exports.getS3ExpiresMiddlewarePlugin = getS3ExpiresMiddlewarePlugin;
exports.getS3ExpressHttpSigningPlugin = getS3ExpressHttpSigningPlugin;
exports.getS3ExpressPlugin = getS3ExpressPlugin;
exports.getSsecPlugin = getSsecPlugin;
exports.getSuffixForArnEndpoint = getSuffixForArnEndpoint;
exports.getThrow200ExceptionsPlugin = getThrow200ExceptionsPlugin;
exports.getValidateBucketNamePlugin = getValidateBucketNamePlugin;
exports.isValidBase64EncodedSSECustomerKey = isValidBase64EncodedSSECustomerKey;
exports.locationConstraintMiddleware = locationConstraintMiddleware;
exports.locationConstraintMiddlewareOptions = locationConstraintMiddlewareOptions;
exports.regionRedirectEndpointMiddleware = regionRedirectEndpointMiddleware;
exports.regionRedirectEndpointMiddlewareOptions = regionRedirectEndpointMiddlewareOptions;
exports.regionRedirectMiddleware = regionRedirectMiddleware;
exports.regionRedirectMiddlewareOptions = regionRedirectMiddlewareOptions;
exports.resolveBucketEndpointConfig = resolveBucketEndpointConfig;
exports.resolveLocationConstraintConfig = resolveLocationConstraintConfig;
exports.resolveS3Config = resolveS3Config;
exports.s3ExpiresMiddleware = s3ExpiresMiddleware;
exports.s3ExpiresMiddlewareOptions = s3ExpiresMiddlewareOptions;
exports.s3ExpressHttpSigningMiddleware = s3ExpressHttpSigningMiddleware;
exports.s3ExpressHttpSigningMiddlewareOptions = s3ExpressHttpSigningMiddlewareOptions;
exports.s3ExpressMiddleware = s3ExpressMiddleware;
exports.s3ExpressMiddlewareOptions = s3ExpressMiddlewareOptions;
exports.ssecMiddleware = ssecMiddleware;
exports.ssecMiddlewareOptions = ssecMiddlewareOptions;
exports.throw200ExceptionsMiddleware = throw200ExceptionsMiddleware;
exports.throw200ExceptionsMiddlewareOptions = throw200ExceptionsMiddlewareOptions;
exports.validateAccountId = validateAccountId;
exports.validateBucketNameMiddleware = validateBucketNameMiddleware;
exports.validateBucketNameMiddlewareOptions = validateBucketNameMiddlewareOptions;
exports.validateDNSHostLabel = validateDNSHostLabel;
exports.validateNoDualstack = validateNoDualstack;
exports.validateNoFIPS = validateNoFIPS;
exports.validateOutpostService = validateOutpostService;
exports.validatePartition = validatePartition;
exports.validateRegion = validateRegion;
