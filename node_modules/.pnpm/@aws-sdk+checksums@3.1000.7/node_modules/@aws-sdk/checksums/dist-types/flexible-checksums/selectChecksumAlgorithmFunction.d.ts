import type { ChecksumConstructor, HashConstructor } from "@smithy/types";
import type { PreviouslyResolved } from "./configuration";
import { ChecksumAlgorithm } from "./constants";
/**
 * Returns the function that will compute the checksum for the given {@link ChecksumAlgorithm}.
 */
export declare const selectChecksumAlgorithmFunction: (checksumAlgorithm: ChecksumAlgorithm | string, config: PreviouslyResolved) => ChecksumConstructor | HashConstructor;
