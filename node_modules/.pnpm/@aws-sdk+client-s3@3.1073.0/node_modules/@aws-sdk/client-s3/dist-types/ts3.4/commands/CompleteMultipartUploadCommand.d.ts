import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CompleteMultipartUploadOutput,
  CompleteMultipartUploadRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface CompleteMultipartUploadCommandInput
  extends CompleteMultipartUploadRequest {}
export interface CompleteMultipartUploadCommandOutput
  extends CompleteMultipartUploadOutput,
    __MetadataBearer {}
declare const CompleteMultipartUploadCommand_base: {
  new (
    input: CompleteMultipartUploadCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CompleteMultipartUploadCommandInput,
    CompleteMultipartUploadCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CompleteMultipartUploadCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CompleteMultipartUploadCommandInput,
    CompleteMultipartUploadCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class CompleteMultipartUploadCommand extends CompleteMultipartUploadCommand_base {
  protected static __types: {
    api: {
      input: CompleteMultipartUploadRequest;
      output: CompleteMultipartUploadOutput;
    };
    sdk: {
      input: CompleteMultipartUploadCommandInput;
      output: CompleteMultipartUploadCommandOutput;
    };
  };
}
