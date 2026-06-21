import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteBucketEncryptionRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteBucketEncryptionCommandInput
  extends DeleteBucketEncryptionRequest {}
export interface DeleteBucketEncryptionCommandOutput extends __MetadataBearer {}
declare const DeleteBucketEncryptionCommand_base: {
  new (
    input: DeleteBucketEncryptionCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketEncryptionCommandInput,
    DeleteBucketEncryptionCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBucketEncryptionCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketEncryptionCommandInput,
    DeleteBucketEncryptionCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBucketEncryptionCommand extends DeleteBucketEncryptionCommand_base {
  protected static __types: {
    api: {
      input: DeleteBucketEncryptionRequest;
      output: {};
    };
    sdk: {
      input: DeleteBucketEncryptionCommandInput;
      output: DeleteBucketEncryptionCommandOutput;
    };
  };
}
