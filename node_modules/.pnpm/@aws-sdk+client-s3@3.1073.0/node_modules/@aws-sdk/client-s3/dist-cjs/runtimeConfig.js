const packageInfo = require("../package.json");
const { createDefaultUserAgentProvider, emitWarningIfUnsupportedVersion: awsCheckVersion, NODE_APP_ID_CONFIG_OPTIONS } = require("@aws-sdk/core/client");
const { NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, NODE_SIGV4A_CONFIG_OPTIONS } = require("@aws-sdk/core/httpAuthSchemes");
const { defaultProvider: credentialDefaultProvider } = require("@aws-sdk/credential-provider-node");
const { NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS, NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS } = require("@aws-sdk/middleware-flexible-checksums");
const { NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS, NODE_USE_ARN_REGION_CONFIG_OPTIONS } = require("@aws-sdk/middleware-sdk-s3/s3");
const { readableStreamHasher: streamHasher } = require("@smithy/core/checksum");
const { emitWarningIfUnsupportedVersion, loadConfigsForDefaultMode } = require("@smithy/core/client");
const { loadConfig: loadNodeConfig, NODE_REGION_CONFIG_FILE_OPTIONS, NODE_REGION_CONFIG_OPTIONS, NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, resolveDefaultsModeConfig } = require("@smithy/core/config");
const { eventStreamSerdeProvider } = require("@smithy/core/event-streams");
const { DEFAULT_RETRY_MODE, NODE_MAX_ATTEMPT_CONFIG_OPTIONS, NODE_RETRY_MODE_CONFIG_OPTIONS } = require("@smithy/core/retry");
const { calculateBodyLength, Hash } = require("@smithy/core/serde");
const { NodeHttpHandler: RequestHandler, streamCollector } = require("@smithy/node-http-handler");
const { getRuntimeConfig: getSharedRuntimeConfig } = require("./runtimeConfig.shared");
const getRuntimeConfig = (config) => {
    emitWarningIfUnsupportedVersion(process.version);
    const defaultsMode = resolveDefaultsModeConfig(config);
    const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
    const clientSharedValues = getSharedRuntimeConfig(config);
    awsCheckVersion(process.version);
    const loaderConfig = {
        profile: config?.profile,
        logger: clientSharedValues.logger,
    };
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        authSchemePreference: config?.authSchemePreference ?? loadNodeConfig(NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
        bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
        credentialDefaultProvider: config?.credentialDefaultProvider ?? credentialDefaultProvider,
        defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({ serviceId: clientSharedValues.serviceId, clientVersion: packageInfo.version }),
        disableS3ExpressSessionAuth: config?.disableS3ExpressSessionAuth ?? loadNodeConfig(NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS, loaderConfig),
        eventStreamSerdeProvider: config?.eventStreamSerdeProvider ?? eventStreamSerdeProvider,
        maxAttempts: config?.maxAttempts ?? loadNodeConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
        md5: config?.md5 ?? Hash.bind(null, "md5"),
        region: config?.region ?? loadNodeConfig(NODE_REGION_CONFIG_OPTIONS, { ...NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
        requestChecksumCalculation: config?.requestChecksumCalculation ?? loadNodeConfig(NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS, loaderConfig),
        requestHandler: RequestHandler.create(config?.requestHandler ?? defaultConfigProvider),
        responseChecksumValidation: config?.responseChecksumValidation ?? loadNodeConfig(NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS, loaderConfig),
        retryMode: config?.retryMode ??
            loadNodeConfig({
                ...NODE_RETRY_MODE_CONFIG_OPTIONS,
                default: async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE,
            }, config),
        sha1: config?.sha1 ?? Hash.bind(null, "sha1"),
        sha256: config?.sha256 ?? Hash.bind(null, "sha256"),
        sigv4aSigningRegionSet: config?.sigv4aSigningRegionSet ?? loadNodeConfig(NODE_SIGV4A_CONFIG_OPTIONS, loaderConfig),
        streamCollector: config?.streamCollector ?? streamCollector,
        streamHasher: config?.streamHasher ?? streamHasher,
        useArnRegion: config?.useArnRegion ?? loadNodeConfig(NODE_USE_ARN_REGION_CONFIG_OPTIONS, loaderConfig),
        useDualstackEndpoint: config?.useDualstackEndpoint ?? loadNodeConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
        useFipsEndpoint: config?.useFipsEndpoint ?? loadNodeConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
        userAgentAppId: config?.userAgentAppId ?? loadNodeConfig(NODE_APP_ID_CONFIG_OPTIONS, loaderConfig),
    };
};
exports.getRuntimeConfig = getRuntimeConfig;
