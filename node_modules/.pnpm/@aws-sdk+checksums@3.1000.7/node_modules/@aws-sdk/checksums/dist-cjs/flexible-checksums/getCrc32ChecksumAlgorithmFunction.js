const { AwsCrc32 } = require("@aws-crypto/crc32");
const { numToUint8 } = require("@aws-crypto/util");
const zlib = require("node:zlib");
class NodeCrc32 {
    checksum = 0;
    update(data) {
        this.checksum = zlib.crc32(data, this.checksum);
    }
    async digest() {
        return numToUint8(this.checksum);
    }
    reset() {
        this.checksum = 0;
    }
}
exports.getCrc32ChecksumAlgorithmFunction = () => {
    if (typeof zlib.crc32 === "undefined") {
        return AwsCrc32;
    }
    return NodeCrc32;
};
