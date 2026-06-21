const packageInfo = require("../package.json");
const { Sha1 } = require("@aws-crypto/sha1-browser");
const { Sha256 } = require("@aws-crypto/sha256-browser");
const { createDefaultUserAgentProvider } = require("@aws-sdk/core/client");
const { blobHasher: streamHasher, Md5 } = require("@smithy/core/checksum");
const { invalidProvider, loadConfigsForDefaultMode } = require("@smithy/core/client");
const { DEFAULT_USE_DUALSTACK_ENDPOINT, DEFAULT_USE_FIPS_ENDPOINT, resolveDefaultsModeConfig } = require("@smithy/core/config");
const { eventStreamSerdeProvider } = require("@smithy/core/event-streams");
const { DEFAULT_MAX_ATTEMPTS, DEFAULT_RETRY_MODE } = require("@smithy/core/retry");
const { calculateBodyLength } = require("@smithy/core/serde");
const { FetchHttpHandler: RequestHandler, streamCollector } = require("@smithy/fetch-http-handler");
const { getRuntimeConfig: getSharedRuntimeConfig } = require("./runtimeConfig.shared");
const getRuntimeConfig = (config) => {
    const defaultsMode = resolveDefaultsModeConfig(config);
    const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
    const clientSharedValues = getSharedRuntimeConfig(config);
    return {
        ...clientSharedValues,
        ...config,
        runtime: "browser",
        defaultsMode,
        bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
        credentialDefaultProvider: config?.credentialDefaultProvider ?? ((_) => () => Promise.reject(new Error("Credential is missing"))),
        defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({ serviceId: clientSharedValues.serviceId, clientVersion: packageInfo.version }),
        eventStreamSerdeProvider: config?.eventStreamSerdeProvider ?? eventStreamSerdeProvider,
        maxAttempts: config?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS,
        md5: config?.md5 ?? Md5,
        region: config?.region ?? invalidProvider("Region is missing"),
        requestHandler: RequestHandler.create(config?.requestHandler ?? defaultConfigProvider),
        retryMode: config?.retryMode ?? (async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE),
        sha1: config?.sha1 ?? Sha1,
        sha256: config?.sha256 ?? Sha256,
        streamCollector: config?.streamCollector ?? streamCollector,
        streamHasher: config?.streamHasher ?? streamHasher,
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (() => Promise.resolve(DEFAULT_USE_DUALSTACK_ENDPOINT)),
        useFipsEndpoint: config?.useFipsEndpoint ?? (() => Promise.resolve(DEFAULT_USE_FIPS_ENDPOINT)),
    };
};
exports.getRuntimeConfig = getRuntimeConfig;
