import { toUint8Array } from "@smithy/core/serde";
export const stringHasher = (checksumAlgorithmFn, body) => {
    const hash = new checksumAlgorithmFn();
    hash.update(toUint8Array(body || ""));
    return hash.digest();
};
