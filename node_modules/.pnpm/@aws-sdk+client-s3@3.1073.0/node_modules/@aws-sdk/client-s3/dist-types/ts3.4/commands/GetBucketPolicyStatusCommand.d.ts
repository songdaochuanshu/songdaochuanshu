import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketPolicyStatusOutput,
  GetBucketPolicyStatusRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketPolicyStatusCommandInput
  extends GetBucketPolicyStatusRequest {}
export interface GetBucketPolicyStatusCommandOutput
  extends GetBucketPolicyStatusOutput,
    __MetadataBearer {}
declare const GetBucketPolicyStatusCommand_base: {
  new (
    input: GetBucketPolicyStatusCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketPolicyStatusCommandInput,
    GetBucketPolicyStatusCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketPolicyStatusCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketPolicyStatusCommandInput,
    GetBucketPolicyStatusCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketPolicyStatusCommand extends GetBucketPolicyStatusCommand_base {
  protected static __types: {
    api: {
      input: GetBucketPolicyStatusRequest;
      output: GetBucketPolicyStatusOutput;
    };
    sdk: {
      input: GetBucketPolicyStatusCommandInput;
      output: GetBucketPolicyStatusCommandOutput;
    };
  };
}
