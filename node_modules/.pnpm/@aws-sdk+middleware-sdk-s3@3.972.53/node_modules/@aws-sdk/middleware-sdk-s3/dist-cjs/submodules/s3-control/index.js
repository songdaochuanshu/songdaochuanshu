const { validateOutpostService, validatePartition, validateAccountId, getArnResources } = require("@aws-sdk/middleware-sdk-s3/s3");
const { partition } = require("@aws-sdk/core/client");
const { validate, parse } = require("@aws-sdk/core/util");
const { HttpRequest } = require("@smithy/core/protocols");

function resolveS3ControlConfig(input) {
    const { useArnRegion } = input;
    return Object.assign(input, {
        useArnRegion: typeof useArnRegion === "function" ? useArnRegion : () => Promise.resolve(useArnRegion),
    });
}

const CONTEXT_OUTPOST_ID = "outpost_id";
const CONTEXT_ACCOUNT_ID = "account_id";
const CONTEXT_ARN_REGION = "outpost_arn_region";
const CONTEXT_SIGNING_SERVICE = "signing_service";
const CONTEXT_SIGNING_REGION = "signing_region";

const parseOutpostArnablesMiddleaware = (options) => (next, context) => async (args) => {
    const { input } = args;
    const parameter = input.Name && validate(input.Name) ? "Name" : input.Bucket && validate(input.Bucket) ? "Bucket" : undefined;
    if (!parameter)
        return next(args);
    const clientRegion = await options.region();
    const useArnRegion = await options.useArnRegion();
    const useFipsEndpoint = await options.useFipsEndpoint();
    const useDualstackEndpoint = await options.useDualstackEndpoint();
    const baseRegion = clientRegion;
    let clientPartition;
    let signingRegion;
    if (options.regionInfoProvider) {
        ({ partition: clientPartition, signingRegion = baseRegion } = (await options.regionInfoProvider(baseRegion, {
            useFipsEndpoint,
            useDualstackEndpoint,
        })));
    }
    else {
        signingRegion = context.endpointV2?.properties?.authSchemes?.[0]?.signingRegion || baseRegion;
        clientPartition = partition(signingRegion).name;
    }
    const validatorOptions = {
        clientPartition};
    let arn;
    if (parameter === "Name") {
        arn = parse(input.Name);
        validateOutpostsArn(arn, validatorOptions);
        const { outpostId, accesspointName } = parseOutpostsAccessPointArnResource(arn.resource);
        input.Name = accesspointName;
        context[CONTEXT_OUTPOST_ID] = outpostId;
    }
    else {
        arn = parse(input.Bucket);
        validateOutpostsArn(arn, validatorOptions);
        const { outpostId, bucketName } = parseOutpostBucketArnResource(arn.resource);
        input.Bucket = bucketName;
        context[CONTEXT_OUTPOST_ID] = outpostId;
    }
    context[CONTEXT_SIGNING_SERVICE] = arn.service;
    context[CONTEXT_SIGNING_REGION] = useArnRegion ? arn.region : signingRegion;
    if (!input.AccountId) {
        input.AccountId = arn.accountId;
    }
    if (useArnRegion)
        context[CONTEXT_ARN_REGION] = arn.region;
    return next(args);
};
const parseOutpostArnablesMiddleawareOptions = {
    toMiddleware: "serializerMiddleware",
    relation: "before",
    tags: ["CONVERT_ARN", "OUTPOST_BUCKET_ARN", "OUTPOST_ACCESS_POINT_ARN", "OUTPOST"],
    name: "parseOutpostArnablesMiddleaware",
};
const validateOutpostsArn = (arn, { clientPartition }) => {
    const { service, partition, accountId, region } = arn;
    validateOutpostService(service);
    validatePartition(partition, { clientPartition });
    validateAccountId(accountId);
};
const parseOutpostsAccessPointArnResource = (resource) => {
    const { outpostId, accesspointName } = getArnResources(resource);
    if (!outpostId) {
        throw new Error("ARN resource should begin with 'outpost'");
    }
    return {
        outpostId,
        accesspointName,
    };
};
const parseOutpostBucketArnResource = (resource) => {
    const delimiter = resource.includes(":") ? ":" : "/";
    const [resourceType, ...rest] = resource.split(delimiter);
    if (resourceType === "outpost") {
        if (!rest[0] || rest[1] !== "bucket" || !rest[2] || rest.length !== 3) {
            throw new Error(`Outpost Bucket ARN should have resource outpost${delimiter}{outpostId}${delimiter}bucket${delimiter}{bucketName}`);
        }
        const [outpostId, _, bucketName] = rest;
        return { outpostId, bucketName };
    }
    else {
        throw new Error(`ARN resource should begin with 'outpost${delimiter}'`);
    }
};

const REGEX_S3CONTROL_HOSTNAME = /^(.+\.)?s3-control(-fips)?[.-]([a-z0-9-]+)\./;
const getOutpostEndpoint = (hostname, { isCustomEndpoint, regionOverride, useFipsEndpoint }) => {
    if (isCustomEndpoint) {
        return hostname;
    }
    const match = hostname.match(REGEX_S3CONTROL_HOSTNAME);
    if (!match) {
        return hostname;
    }
    const [matched, prefix, fips, region] = hostname.match(REGEX_S3CONTROL_HOSTNAME);
    return [
        `s3-outposts${useFipsEndpoint ? "-fips" : ""}`,
        regionOverride || region,
        hostname.replace(new RegExp(`^${matched}`), ""),
    ]
        .filter((part) => part !== undefined)
        .join(".");
};

const ACCOUNT_ID_HEADER = "x-amz-account-id";
const OUTPOST_ID_HEADER = "x-amz-outpost-id";
const updateArnablesRequestMiddleware = (config) => (next, context) => async (args) => {
    const { request } = args;
    if (!HttpRequest.isInstance(request)) {
        return next(args);
    }
    if (context[CONTEXT_ACCOUNT_ID]) {
        request.headers[ACCOUNT_ID_HEADER] = context[CONTEXT_ACCOUNT_ID];
    }
    if (context[CONTEXT_OUTPOST_ID]) {
        const { isCustomEndpoint } = config;
        const useFipsEndpoint = await config.useFipsEndpoint();
        request.headers[OUTPOST_ID_HEADER] = context[CONTEXT_OUTPOST_ID];
        request.hostname = getOutpostEndpoint(request.hostname, {
            isCustomEndpoint,
            regionOverride: context[CONTEXT_ARN_REGION],
            useFipsEndpoint,
        });
    }
    return next(args);
};
const updateArnablesRequestMiddlewareOptions = {
    toMiddleware: "serializerMiddleware",
    relation: "after",
    name: "updateArnablesRequestMiddleware",
    tags: ["ACCOUNT_ID", "OUTPOST_ID", "OUTPOST"],
};

const getProcessArnablesPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(parseOutpostArnablesMiddleaware(options), parseOutpostArnablesMiddleawareOptions);
        clientStack.addRelativeTo(updateArnablesRequestMiddleware(options), updateArnablesRequestMiddlewareOptions);
    },
});

const hostPrefixDeduplicationMiddleware = () => {
    return (next, context) => (args) => {
        return next(args);
    };
};
const hostPrefixDeduplicationMiddlewareOptions = {
    tags: ["HOST_PREFIX_DEDUPLICATION", "ENDPOINT_V2", "ENDPOINT"],
    toMiddleware: "serializerMiddleware",
    relation: "after",
    name: "hostPrefixDeduplicationMiddleware",
    override: true,
};
const getHostPrefixDeduplicationPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(hostPrefixDeduplicationMiddleware(), hostPrefixDeduplicationMiddlewareOptions);
    },
});

const redirectFromPostIdMiddleware = (config) => (next, context) => async (args) => {
    const { input, request } = args;
    if (!HttpRequest.isInstance(request))
        return next(args);
    if (input.OutpostId) {
        const { isCustomEndpoint } = config;
        const useFipsEndpoint = await config.useFipsEndpoint();
        request.hostname = getOutpostEndpoint(request.hostname, { isCustomEndpoint, useFipsEndpoint });
        context[CONTEXT_SIGNING_SERVICE] = "s3-outposts";
    }
    return next(args);
};
const redirectFromPostIdMiddlewareOptions = {
    step: "build",
    name: "redirectFromPostIdMiddleware",
    tags: ["OUTPOST"],
    override: true,
};
const getRedirectFromPostIdPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(redirectFromPostIdMiddleware(options), redirectFromPostIdMiddlewareOptions);
    },
});

exports.getHostPrefixDeduplicationPlugin = getHostPrefixDeduplicationPlugin;
exports.getOutpostEndpoint = getOutpostEndpoint;
exports.getProcessArnablesPlugin = getProcessArnablesPlugin;
exports.getRedirectFromPostIdPlugin = getRedirectFromPostIdPlugin;
exports.hostPrefixDeduplicationMiddleware = hostPrefixDeduplicationMiddleware;
exports.hostPrefixDeduplicationMiddlewareOptions = hostPrefixDeduplicationMiddlewareOptions;
exports.parseOutpostArnablesMiddleaware = parseOutpostArnablesMiddleaware;
exports.parseOutpostArnablesMiddleawareOptions = parseOutpostArnablesMiddleawareOptions;
exports.redirectFromPostIdMiddleware = redirectFromPostIdMiddleware;
exports.redirectFromPostIdMiddlewareOptions = redirectFromPostIdMiddlewareOptions;
exports.resolveS3ControlConfig = resolveS3ControlConfig;
exports.updateArnablesRequestMiddleware = updateArnablesRequestMiddleware;
exports.updateArnablesRequestMiddlewareOptions = updateArnablesRequestMiddlewareOptions;
