import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteBucketPolicyRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteBucketPolicyCommandInput
  extends DeleteBucketPolicyRequest {}
export interface DeleteBucketPolicyCommandOutput extends __MetadataBearer {}
declare const DeleteBucketPolicyCommand_base: {
  new (
    input: DeleteBucketPolicyCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketPolicyCommandInput,
    DeleteBucketPolicyCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBucketPolicyCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketPolicyCommandInput,
    DeleteBucketPolicyCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBucketPolicyCommand extends DeleteBucketPolicyCommand_base {
  protected static __types: {
    api: {
      input: DeleteBucketPolicyRequest;
      output: {};
    };
    sdk: {
      input: DeleteBucketPolicyCommandInput;
      output: DeleteBucketPolicyCommandOutput;
    };
  };
}
