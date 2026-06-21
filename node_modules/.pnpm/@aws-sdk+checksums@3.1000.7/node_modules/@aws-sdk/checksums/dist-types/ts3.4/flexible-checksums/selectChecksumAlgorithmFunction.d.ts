import { ChecksumConstructor, HashConstructor } from "@smithy/types";
import { PreviouslyResolved } from "./configuration";
import { ChecksumAlgorithm } from "./constants";
export declare const selectChecksumAlgorithmFunction: (
  checksumAlgorithm: ChecksumAlgorithm | string,
  config: PreviouslyResolved
) => ChecksumConstructor | HashConstructor;
