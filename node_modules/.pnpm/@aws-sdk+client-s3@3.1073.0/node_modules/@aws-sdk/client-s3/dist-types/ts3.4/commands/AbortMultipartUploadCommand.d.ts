import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  AbortMultipartUploadOutput,
  AbortMultipartUploadRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface AbortMultipartUploadCommandInput
  extends AbortMultipartUploadRequest {}
export interface AbortMultipartUploadCommandOutput
  extends AbortMultipartUploadOutput,
    __MetadataBearer {}
declare const AbortMultipartUploadCommand_base: {
  new (
    input: AbortMultipartUploadCommandInput
  ): import("@smithy/core/client").CommandImpl<
    AbortMultipartUploadCommandInput,
    AbortMultipartUploadCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: AbortMultipartUploadCommandInput
  ): import("@smithy/core/client").CommandImpl<
    AbortMultipartUploadCommandInput,
    AbortMultipartUploadCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class AbortMultipartUploadCommand extends AbortMultipartUploadCommand_base {
  protected static __types: {
    api: {
      input: AbortMultipartUploadRequest;
      output: AbortMultipartUploadOutput;
    };
    sdk: {
      input: AbortMultipartUploadCommandInput;
      output: AbortMultipartUploadCommandOutput;
    };
  };
}
