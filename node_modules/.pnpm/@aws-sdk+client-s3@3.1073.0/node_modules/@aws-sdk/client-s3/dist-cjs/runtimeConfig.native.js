const { Sha256 } = require("@aws-crypto/sha256-js");
const { getRuntimeConfig: getBrowserRuntimeConfig } = require("./runtimeConfig.browser");
const getRuntimeConfig = (config) => {
    const browserDefaults = getBrowserRuntimeConfig(config);
    return {
        ...browserDefaults,
        ...config,
        runtime: "react-native",
        sha256: config?.sha256 ?? Sha256,
    };
};
exports.getRuntimeConfig = getRuntimeConfig;
