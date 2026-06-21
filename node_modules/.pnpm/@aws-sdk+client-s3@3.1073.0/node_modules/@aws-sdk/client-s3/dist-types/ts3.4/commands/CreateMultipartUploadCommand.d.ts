import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CreateMultipartUploadOutput,
  CreateMultipartUploadRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface CreateMultipartUploadCommandInput
  extends CreateMultipartUploadRequest {}
export interface CreateMultipartUploadCommandOutput
  extends CreateMultipartUploadOutput,
    __MetadataBearer {}
declare const CreateMultipartUploadCommand_base: {
  new (
    input: CreateMultipartUploadCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateMultipartUploadCommandInput,
    CreateMultipartUploadCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateMultipartUploadCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateMultipartUploadCommandInput,
    CreateMultipartUploadCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class CreateMultipartUploadCommand extends CreateMultipartUploadCommand_base {
  protected static __types: {
    api: {
      input: CreateMultipartUploadRequest;
      output: CreateMultipartUploadOutput;
    };
    sdk: {
      input: CreateMultipartUploadCommandInput;
      output: CreateMultipartUploadCommandOutput;
    };
  };
}
