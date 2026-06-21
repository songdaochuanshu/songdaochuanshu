import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteBucketLifecycleRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteBucketLifecycleCommandInput
  extends DeleteBucketLifecycleRequest {}
export interface DeleteBucketLifecycleCommandOutput extends __MetadataBearer {}
declare const DeleteBucketLifecycleCommand_base: {
  new (
    input: DeleteBucketLifecycleCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketLifecycleCommandInput,
    DeleteBucketLifecycleCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBucketLifecycleCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketLifecycleCommandInput,
    DeleteBucketLifecycleCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBucketLifecycleCommand extends DeleteBucketLifecycleCommand_base {
  protected static __types: {
    api: {
      input: DeleteBucketLifecycleRequest;
      output: {};
    };
    sdk: {
      input: DeleteBucketLifecycleCommandInput;
      output: DeleteBucketLifecycleCommandOutput;
    };
  };
}
