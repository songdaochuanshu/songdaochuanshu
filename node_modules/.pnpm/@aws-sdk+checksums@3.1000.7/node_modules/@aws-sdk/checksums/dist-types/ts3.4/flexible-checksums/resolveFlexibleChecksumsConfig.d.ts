import { ChecksumConstructor, Provider } from "@smithy/types";
import {
  RequestChecksumCalculation,
  ResponseChecksumValidation,
} from "./constants";
export interface FlexibleChecksumsInputConfig {
  requestChecksumCalculation?:
    | RequestChecksumCalculation
    | Provider<RequestChecksumCalculation>;
  responseChecksumValidation?:
    | ResponseChecksumValidation
    | Provider<ResponseChecksumValidation>;
  requestStreamBufferSize?: number | false;
  checksumAlgorithms?: {
    CRC32?: ChecksumConstructor;
    CRC32C?: ChecksumConstructor;
    CRC64NVME?: ChecksumConstructor;
    SHA1?: ChecksumConstructor;
    SHA256?: ChecksumConstructor;
  } & {
    [algorithmId: string]: ChecksumConstructor;
  };
}
export interface FlexibleChecksumsResolvedConfig {
  requestChecksumCalculation: Provider<RequestChecksumCalculation>;
  responseChecksumValidation: Provider<ResponseChecksumValidation>;
  requestStreamBufferSize: number;
  checksumAlgorithms?: FlexibleChecksumsInputConfig["checksumAlgorithms"];
}
export declare const resolveFlexibleChecksumsConfig: <T>(
  input: T & FlexibleChecksumsInputConfig
) => T & FlexibleChecksumsResolvedConfig;
