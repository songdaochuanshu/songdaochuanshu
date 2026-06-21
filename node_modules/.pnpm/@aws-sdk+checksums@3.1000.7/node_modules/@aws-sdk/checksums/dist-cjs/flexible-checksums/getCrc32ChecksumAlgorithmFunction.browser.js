const { AwsCrc32 } = require("@aws-crypto/crc32");
exports.getCrc32ChecksumAlgorithmFunction = () => AwsCrc32;
