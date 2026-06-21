const { setFeature } = require("@aws-sdk/core/client");
const { HttpRequest } = require("@smithy/core/protocols");
const { isArrayBuffer, toUint8Array, createBufferedReadable, createChecksumStream } = require("@smithy/core/serde");
const { AwsCrc32c } = require("@aws-crypto/crc32c");
const { getCrc32ChecksumAlgorithmFunction } = require("./flexible-checksums/getCrc32ChecksumAlgorithmFunction");
const { normalizeProvider } = require("@smithy/core/client");

const generateCRC64NVMETable = () => {
    const sliceLength = 8;
    const tables = new Array(sliceLength);
    for (let slice = 0; slice < sliceLength; slice++) {
        const table = new Array(512);
        for (let i = 0; i < 256; i++) {
            let crc = BigInt(i);
            for (let j = 0; j < 8 * (slice + 1); j++) {
                if (crc & 1n) {
                    crc = (crc >> 1n) ^ 0x9a6c9329ac4bc9b5n;
                }
                else {
                    crc = crc >> 1n;
                }
            }
            table[i * 2] = Number((crc >> 32n) & 0xffffffffn);
            table[i * 2 + 1] = Number(crc & 0xffffffffn);
        }
        tables[slice] = new Uint32Array(table);
    }
    return tables;
};
let CRC64_NVME_REVERSED_TABLE;
let t0, t1, t2, t3;
let t4, t5, t6, t7;
const ensureTablesInitialized = () => {
    if (!CRC64_NVME_REVERSED_TABLE) {
        CRC64_NVME_REVERSED_TABLE = generateCRC64NVMETable();
        [t0, t1, t2, t3, t4, t5, t6, t7] = CRC64_NVME_REVERSED_TABLE;
    }
};
class Crc64Nvme {
    c1 = 0;
    c2 = 0;
    constructor() {
        ensureTablesInitialized();
        this.reset();
    }
    update(data) {
        const len = data.length;
        let i = 0;
        let crc1 = this.c1;
        let crc2 = this.c2;
        while (i + 8 <= len) {
            const idx0 = ((crc2 ^ data[i++]) & 255) << 1;
            const idx1 = (((crc2 >>> 8) ^ data[i++]) & 255) << 1;
            const idx2 = (((crc2 >>> 16) ^ data[i++]) & 255) << 1;
            const idx3 = (((crc2 >>> 24) ^ data[i++]) & 255) << 1;
            const idx4 = ((crc1 ^ data[i++]) & 255) << 1;
            const idx5 = (((crc1 >>> 8) ^ data[i++]) & 255) << 1;
            const idx6 = (((crc1 >>> 16) ^ data[i++]) & 255) << 1;
            const idx7 = (((crc1 >>> 24) ^ data[i++]) & 255) << 1;
            crc1 = t7[idx0] ^ t6[idx1] ^ t5[idx2] ^ t4[idx3] ^ t3[idx4] ^ t2[idx5] ^ t1[idx6] ^ t0[idx7];
            crc2 =
                t7[idx0 + 1] ^
                    t6[idx1 + 1] ^
                    t5[idx2 + 1] ^
                    t4[idx3 + 1] ^
                    t3[idx4 + 1] ^
                    t2[idx5 + 1] ^
                    t1[idx6 + 1] ^
                    t0[idx7 + 1];
        }
        while (i < len) {
            const idx = ((crc2 ^ data[i]) & 255) << 1;
            crc2 = ((crc2 >>> 8) | ((crc1 & 255) << 24)) >>> 0;
            crc1 = (crc1 >>> 8) ^ t0[idx];
            crc2 ^= t0[idx + 1];
            i++;
        }
        this.c1 = crc1;
        this.c2 = crc2;
    }
    async digest() {
        const c1 = this.c1 ^ 4294967295;
        const c2 = this.c2 ^ 4294967295;
        return new Uint8Array([
            c1 >>> 24,
            (c1 >>> 16) & 255,
            (c1 >>> 8) & 255,
            c1 & 255,
            c2 >>> 24,
            (c2 >>> 16) & 255,
            (c2 >>> 8) & 255,
            c2 & 255,
        ]);
    }
    reset() {
        this.c1 = 4294967295;
        this.c2 = 4294967295;
    }
}

const crc64NvmeCrtContainer = {
    CrtCrc64Nvme: null,
};

const RequestChecksumCalculation = {
    WHEN_SUPPORTED: "WHEN_SUPPORTED",
    WHEN_REQUIRED: "WHEN_REQUIRED",
};
const DEFAULT_REQUEST_CHECKSUM_CALCULATION = RequestChecksumCalculation.WHEN_SUPPORTED;
const ResponseChecksumValidation = {
    WHEN_SUPPORTED: "WHEN_SUPPORTED",
    WHEN_REQUIRED: "WHEN_REQUIRED",
};
const DEFAULT_RESPONSE_CHECKSUM_VALIDATION = RequestChecksumCalculation.WHEN_SUPPORTED;
var ChecksumAlgorithm;
(function (ChecksumAlgorithm) {
    ChecksumAlgorithm["MD5"] = "MD5";
    ChecksumAlgorithm["CRC32"] = "CRC32";
    ChecksumAlgorithm["CRC32C"] = "CRC32C";
    ChecksumAlgorithm["CRC64NVME"] = "CRC64NVME";
    ChecksumAlgorithm["SHA1"] = "SHA1";
    ChecksumAlgorithm["SHA256"] = "SHA256";
})(ChecksumAlgorithm || (ChecksumAlgorithm = {}));
var ChecksumLocation;
(function (ChecksumLocation) {
    ChecksumLocation["HEADER"] = "header";
    ChecksumLocation["TRAILER"] = "trailer";
})(ChecksumLocation || (ChecksumLocation = {}));
const DEFAULT_CHECKSUM_ALGORITHM = ChecksumAlgorithm.CRC32;

var SelectorType;
(function (SelectorType) {
    SelectorType["ENV"] = "env";
    SelectorType["CONFIG"] = "shared config entry";
})(SelectorType || (SelectorType = {}));
const stringUnionSelector = (obj, key, union, type) => {
    if (!(key in obj))
        return undefined;
    const value = obj[key].toUpperCase();
    if (!Object.values(union).includes(value)) {
        throw new TypeError(`Cannot load ${type} '${key}'. Expected one of ${Object.values(union)}, got '${obj[key]}'.`);
    }
    return value;
};

const ENV_REQUEST_CHECKSUM_CALCULATION = "AWS_REQUEST_CHECKSUM_CALCULATION";
const CONFIG_REQUEST_CHECKSUM_CALCULATION = "request_checksum_calculation";
const NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => stringUnionSelector(env, ENV_REQUEST_CHECKSUM_CALCULATION, RequestChecksumCalculation, SelectorType.ENV),
    configFileSelector: (profile) => stringUnionSelector(profile, CONFIG_REQUEST_CHECKSUM_CALCULATION, RequestChecksumCalculation, SelectorType.CONFIG),
    default: DEFAULT_REQUEST_CHECKSUM_CALCULATION,
};

const ENV_RESPONSE_CHECKSUM_VALIDATION = "AWS_RESPONSE_CHECKSUM_VALIDATION";
const CONFIG_RESPONSE_CHECKSUM_VALIDATION = "response_checksum_validation";
const NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => stringUnionSelector(env, ENV_RESPONSE_CHECKSUM_VALIDATION, ResponseChecksumValidation, SelectorType.ENV),
    configFileSelector: (profile) => stringUnionSelector(profile, CONFIG_RESPONSE_CHECKSUM_VALIDATION, ResponseChecksumValidation, SelectorType.CONFIG),
    default: DEFAULT_RESPONSE_CHECKSUM_VALIDATION,
};

const getChecksumAlgorithmForRequest = (input, { requestChecksumRequired, requestAlgorithmMember, requestChecksumCalculation }) => {
    if (!requestAlgorithmMember) {
        return requestChecksumCalculation === RequestChecksumCalculation.WHEN_SUPPORTED || requestChecksumRequired
            ? DEFAULT_CHECKSUM_ALGORITHM
            : undefined;
    }
    if (!input[requestAlgorithmMember]) {
        return undefined;
    }
    const checksumAlgorithm = input[requestAlgorithmMember];
    return checksumAlgorithm;
};

const getChecksumLocationName = (algorithm) => algorithm === ChecksumAlgorithm.MD5 ? "content-md5" : `x-amz-checksum-${algorithm.toLowerCase()}`;

const hasHeader = (header, headers) => {
    const soughtHeader = header.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            return true;
        }
    }
    return false;
};

const hasHeaderWithPrefix = (headerPrefix, headers) => {
    const soughtHeaderPrefix = headerPrefix.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (headerName.toLowerCase().startsWith(soughtHeaderPrefix)) {
            return true;
        }
    }
    return false;
};

const isStreaming = (body) => body !== undefined && typeof body !== "string" && !ArrayBuffer.isView(body) && !isArrayBuffer(body);

const CLIENT_SUPPORTED_ALGORITHMS = [
    ChecksumAlgorithm.CRC32,
    ChecksumAlgorithm.CRC32C,
    ChecksumAlgorithm.CRC64NVME,
    ChecksumAlgorithm.SHA1,
    ChecksumAlgorithm.SHA256,
];
const PRIORITY_ORDER_ALGORITHMS = [
    ChecksumAlgorithm.SHA256,
    ChecksumAlgorithm.SHA1,
    ChecksumAlgorithm.CRC32,
    ChecksumAlgorithm.CRC32C,
    ChecksumAlgorithm.CRC64NVME,
];

const selectChecksumAlgorithmFunction = (checksumAlgorithm, config) => {
    const { checksumAlgorithms = {} } = config;
    switch (checksumAlgorithm) {
        case ChecksumAlgorithm.MD5:
            return checksumAlgorithms?.MD5 ?? config.md5;
        case ChecksumAlgorithm.CRC32:
            return checksumAlgorithms?.CRC32 ?? getCrc32ChecksumAlgorithmFunction();
        case ChecksumAlgorithm.CRC32C:
            return checksumAlgorithms?.CRC32C ?? AwsCrc32c;
        case ChecksumAlgorithm.CRC64NVME:
            if (typeof crc64NvmeCrtContainer.CrtCrc64Nvme !== "function") {
                return checksumAlgorithms?.CRC64NVME ?? Crc64Nvme;
            }
            return checksumAlgorithms?.CRC64NVME ?? crc64NvmeCrtContainer.CrtCrc64Nvme;
        case ChecksumAlgorithm.SHA1:
            return checksumAlgorithms?.SHA1 ?? config.sha1;
        case ChecksumAlgorithm.SHA256:
            return checksumAlgorithms?.SHA256 ?? config.sha256;
        default:
            if (checksumAlgorithms?.[checksumAlgorithm]) {
                return checksumAlgorithms[checksumAlgorithm];
            }
            throw new Error(`The checksum algorithm "${checksumAlgorithm}" is not supported by the client.` +
                ` Select one of ${CLIENT_SUPPORTED_ALGORITHMS}, or provide an implementation to ` +
                ` the client constructor checksums field.`);
    }
};

const stringHasher = (checksumAlgorithmFn, body) => {
    const hash = new checksumAlgorithmFn();
    hash.update(toUint8Array(body || ""));
    return hash.digest();
};

const flexibleChecksumsMiddlewareOptions = {
    name: "flexibleChecksumsMiddleware",
    step: "build",
    tags: ["BODY_CHECKSUM"],
    override: true,
};
const flexibleChecksumsMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
    if (!HttpRequest.isInstance(args.request)) {
        return next(args);
    }
    if (hasHeaderWithPrefix("x-amz-checksum-", args.request.headers)) {
        return next(args);
    }
    const { request, input } = args;
    const { body: requestBody, headers } = request;
    const { base64Encoder, streamHasher } = config;
    const { requestChecksumRequired, requestAlgorithmMember } = middlewareConfig;
    const requestChecksumCalculation = await config.requestChecksumCalculation();
    const requestAlgorithmMemberName = requestAlgorithmMember?.name;
    const requestAlgorithmMemberHttpHeader = requestAlgorithmMember?.httpHeader;
    if (requestAlgorithmMemberName && !input[requestAlgorithmMemberName]) {
        if (requestChecksumCalculation === RequestChecksumCalculation.WHEN_SUPPORTED || requestChecksumRequired) {
            input[requestAlgorithmMemberName] = DEFAULT_CHECKSUM_ALGORITHM;
            if (requestAlgorithmMemberHttpHeader) {
                headers[requestAlgorithmMemberHttpHeader] = DEFAULT_CHECKSUM_ALGORITHM;
            }
        }
    }
    const checksumAlgorithm = getChecksumAlgorithmForRequest(input, {
        requestChecksumRequired,
        requestAlgorithmMember: requestAlgorithmMember?.name,
        requestChecksumCalculation,
    });
    let updatedBody = requestBody;
    let updatedHeaders = headers;
    if (checksumAlgorithm) {
        switch (checksumAlgorithm) {
            case ChecksumAlgorithm.CRC32:
                setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_CRC32", "U");
                break;
            case ChecksumAlgorithm.CRC32C:
                setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_CRC32C", "V");
                break;
            case ChecksumAlgorithm.CRC64NVME:
                setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_CRC64", "W");
                break;
            case ChecksumAlgorithm.SHA1:
                setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_SHA1", "X");
                break;
            case ChecksumAlgorithm.SHA256:
                setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_SHA256", "Y");
                break;
        }
        const checksumLocationName = getChecksumLocationName(checksumAlgorithm);
        const checksumAlgorithmFn = selectChecksumAlgorithmFunction(checksumAlgorithm, config);
        if (isStreaming(requestBody)) {
            const { getAwsChunkedEncodingStream, bodyLengthChecker } = config;
            updatedBody = getAwsChunkedEncodingStream(typeof config.requestStreamBufferSize === "number" && config.requestStreamBufferSize >= 8 * 1024
                ? createBufferedReadable(requestBody, config.requestStreamBufferSize, context.logger)
                : requestBody, {
                base64Encoder,
                bodyLengthChecker,
                checksumLocationName,
                checksumAlgorithmFn,
                streamHasher,
            });
            updatedHeaders = {
                ...headers,
                "content-encoding": headers["content-encoding"]
                    ? `${headers["content-encoding"]},aws-chunked`
                    : "aws-chunked",
                "transfer-encoding": "chunked",
                "x-amz-decoded-content-length": headers["content-length"],
                "x-amz-content-sha256": "STREAMING-UNSIGNED-PAYLOAD-TRAILER",
                "x-amz-trailer": checksumLocationName,
            };
            delete updatedHeaders["content-length"];
        }
        else if (!hasHeader(checksumLocationName, headers)) {
            const rawChecksum = await stringHasher(checksumAlgorithmFn, requestBody);
            updatedHeaders = {
                ...headers,
                [checksumLocationName]: base64Encoder(rawChecksum),
            };
        }
    }
    try {
        const result = await next({
            ...args,
            request: {
                ...request,
                headers: updatedHeaders,
                body: updatedBody,
            },
        });
        return result;
    }
    catch (e) {
        if (e instanceof Error && e.name === "InvalidChunkSizeError") {
            try {
                if (!e.message.endsWith(".")) {
                    e.message += ".";
                }
                e.message +=
                    " Set [requestStreamBufferSize=number e.g. 65_536] in client constructor to instruct AWS SDK to buffer your input stream.";
            }
            catch (ignored) {
            }
        }
        throw e;
    }
};

const flexibleChecksumsInputMiddlewareOptions = {
    name: "flexibleChecksumsInputMiddleware",
    toMiddleware: "serializerMiddleware",
    relation: "before",
    tags: ["BODY_CHECKSUM"],
    override: true,
};
const flexibleChecksumsInputMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
    const input = args.input;
    const { requestValidationModeMember } = middlewareConfig;
    const requestChecksumCalculation = await config.requestChecksumCalculation();
    const responseChecksumValidation = await config.responseChecksumValidation();
    switch (requestChecksumCalculation) {
        case RequestChecksumCalculation.WHEN_REQUIRED:
            setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_WHEN_REQUIRED", "a");
            break;
        case RequestChecksumCalculation.WHEN_SUPPORTED:
            setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_WHEN_SUPPORTED", "Z");
            break;
    }
    switch (responseChecksumValidation) {
        case ResponseChecksumValidation.WHEN_REQUIRED:
            setFeature(context, "FLEXIBLE_CHECKSUMS_RES_WHEN_REQUIRED", "c");
            break;
        case ResponseChecksumValidation.WHEN_SUPPORTED:
            setFeature(context, "FLEXIBLE_CHECKSUMS_RES_WHEN_SUPPORTED", "b");
            break;
    }
    if (requestValidationModeMember && !input[requestValidationModeMember]) {
        if (responseChecksumValidation === ResponseChecksumValidation.WHEN_SUPPORTED) {
            input[requestValidationModeMember] = "ENABLED";
        }
    }
    return next(args);
};

const getChecksumAlgorithmListForResponse = (responseAlgorithms = []) => {
    const validChecksumAlgorithms = [];
    let i = PRIORITY_ORDER_ALGORITHMS.length;
    for (const algorithm of responseAlgorithms) {
        const priority = PRIORITY_ORDER_ALGORITHMS.indexOf(algorithm);
        if (priority !== -1) {
            validChecksumAlgorithms[priority] = algorithm;
        }
        else {
            validChecksumAlgorithms[i++] = algorithm;
        }
    }
    return validChecksumAlgorithms.filter(Boolean);
};

const isChecksumWithPartNumber = (checksum) => {
    const lastHyphenIndex = checksum.lastIndexOf("-");
    if (lastHyphenIndex !== -1) {
        const numberPart = checksum.slice(lastHyphenIndex + 1);
        if (!numberPart.startsWith("0")) {
            const number = parseInt(numberPart, 10);
            if (!isNaN(number) && number >= 1 && number <= 10000) {
                return true;
            }
        }
    }
    return false;
};

const getChecksum = async (body, { checksumAlgorithmFn, base64Encoder }) => base64Encoder(await stringHasher(checksumAlgorithmFn, body));

const validateChecksumFromResponse = async (response, { config, responseAlgorithms, logger }) => {
    const checksumAlgorithms = getChecksumAlgorithmListForResponse(responseAlgorithms);
    const { body: responseBody, headers: responseHeaders } = response;
    for (const algorithm of checksumAlgorithms) {
        const responseHeader = getChecksumLocationName(algorithm);
        const checksumFromResponse = responseHeaders[responseHeader];
        if (checksumFromResponse) {
            let checksumAlgorithmFn;
            try {
                checksumAlgorithmFn = selectChecksumAlgorithmFunction(algorithm, config);
            }
            catch (error) {
                if (algorithm === ChecksumAlgorithm.CRC64NVME) {
                    logger?.warn(`Skipping ${ChecksumAlgorithm.CRC64NVME} checksum validation: ${error.message}`);
                    continue;
                }
                throw error;
            }
            const { base64Encoder } = config;
            if (isStreaming(responseBody)) {
                response.body = createChecksumStream({
                    expectedChecksum: checksumFromResponse,
                    checksumSourceLocation: responseHeader,
                    checksum: new checksumAlgorithmFn(),
                    source: responseBody,
                    base64Encoder,
                });
                return;
            }
            const checksum = await getChecksum(responseBody, { checksumAlgorithmFn, base64Encoder });
            if (checksum === checksumFromResponse) {
                break;
            }
            throw new Error(`Checksum mismatch: expected "${checksum}" but received "${checksumFromResponse}"` +
                ` in response header "${responseHeader}".`);
        }
    }
};

const flexibleChecksumsResponseMiddlewareOptions = {
    name: "flexibleChecksumsResponseMiddleware",
    toMiddleware: "deserializerMiddleware",
    relation: "after",
    tags: ["BODY_CHECKSUM"],
    override: true,
};
const flexibleChecksumsResponseMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
    if (!HttpRequest.isInstance(args.request)) {
        return next(args);
    }
    const input = args.input;
    const result = await next(args);
    const response = result.response;
    const { requestValidationModeMember, responseAlgorithms } = middlewareConfig;
    if (requestValidationModeMember && input[requestValidationModeMember] === "ENABLED") {
        const { clientName, commandName } = context;
        const customChecksumAlgorithms = Object.keys(config.checksumAlgorithms ?? {}).filter((algorithm) => {
            const responseHeader = getChecksumLocationName(algorithm);
            return response.headers[responseHeader] !== undefined;
        });
        const algoList = getChecksumAlgorithmListForResponse([
            ...(responseAlgorithms ?? []),
            ...customChecksumAlgorithms,
        ]);
        const isS3WholeObjectMultipartGetResponseChecksum = clientName === "S3Client" &&
            commandName === "GetObjectCommand" &&
            algoList.every((algorithm) => {
                const responseHeader = getChecksumLocationName(algorithm);
                const checksumFromResponse = response.headers[responseHeader];
                return !checksumFromResponse || isChecksumWithPartNumber(checksumFromResponse);
            });
        if (isS3WholeObjectMultipartGetResponseChecksum) {
            return result;
        }
        await validateChecksumFromResponse(response, {
            config,
            responseAlgorithms: algoList,
            logger: context.logger,
        });
    }
    return result;
};

const getFlexibleChecksumsPlugin = (config, middlewareConfig) => ({
    applyToStack: (clientStack) => {
        clientStack.add(flexibleChecksumsMiddleware(config, middlewareConfig), flexibleChecksumsMiddlewareOptions);
        clientStack.addRelativeTo(flexibleChecksumsInputMiddleware(config, middlewareConfig), flexibleChecksumsInputMiddlewareOptions);
        clientStack.addRelativeTo(flexibleChecksumsResponseMiddleware(config, middlewareConfig), flexibleChecksumsResponseMiddlewareOptions);
    },
});

const resolveFlexibleChecksumsConfig = (input) => {
    const { requestChecksumCalculation, responseChecksumValidation, requestStreamBufferSize } = input;
    return Object.assign(input, {
        requestChecksumCalculation: normalizeProvider(requestChecksumCalculation ?? DEFAULT_REQUEST_CHECKSUM_CALCULATION),
        responseChecksumValidation: normalizeProvider(responseChecksumValidation ?? DEFAULT_RESPONSE_CHECKSUM_VALIDATION),
        requestStreamBufferSize: Number(requestStreamBufferSize ?? 0),
        checksumAlgorithms: input.checksumAlgorithms ?? {},
    });
};

exports.CONFIG_REQUEST_CHECKSUM_CALCULATION = CONFIG_REQUEST_CHECKSUM_CALCULATION;
exports.CONFIG_RESPONSE_CHECKSUM_VALIDATION = CONFIG_RESPONSE_CHECKSUM_VALIDATION;
exports.ChecksumAlgorithm = ChecksumAlgorithm;
exports.ChecksumLocation = ChecksumLocation;
exports.Crc64Nvme = Crc64Nvme;
exports.DEFAULT_CHECKSUM_ALGORITHM = DEFAULT_CHECKSUM_ALGORITHM;
exports.DEFAULT_REQUEST_CHECKSUM_CALCULATION = DEFAULT_REQUEST_CHECKSUM_CALCULATION;
exports.DEFAULT_RESPONSE_CHECKSUM_VALIDATION = DEFAULT_RESPONSE_CHECKSUM_VALIDATION;
exports.ENV_REQUEST_CHECKSUM_CALCULATION = ENV_REQUEST_CHECKSUM_CALCULATION;
exports.ENV_RESPONSE_CHECKSUM_VALIDATION = ENV_RESPONSE_CHECKSUM_VALIDATION;
exports.NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS = NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS;
exports.NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS = NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS;
exports.RequestChecksumCalculation = RequestChecksumCalculation;
exports.ResponseChecksumValidation = ResponseChecksumValidation;
exports.crc64NvmeCrtContainer = crc64NvmeCrtContainer;
exports.flexibleChecksumsMiddleware = flexibleChecksumsMiddleware;
exports.flexibleChecksumsMiddlewareOptions = flexibleChecksumsMiddlewareOptions;
exports.getFlexibleChecksumsPlugin = getFlexibleChecksumsPlugin;
exports.resolveFlexibleChecksumsConfig = resolveFlexibleChecksumsConfig;
