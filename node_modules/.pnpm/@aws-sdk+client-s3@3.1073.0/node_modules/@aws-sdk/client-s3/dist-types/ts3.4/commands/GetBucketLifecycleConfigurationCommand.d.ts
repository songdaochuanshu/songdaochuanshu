import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketLifecycleConfigurationOutput,
  GetBucketLifecycleConfigurationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketLifecycleConfigurationCommandInput
  extends GetBucketLifecycleConfigurationRequest {}
export interface GetBucketLifecycleConfigurationCommandOutput
  extends GetBucketLifecycleConfigurationOutput,
    __MetadataBearer {}
declare const GetBucketLifecycleConfigurationCommand_base: {
  new (
    input: GetBucketLifecycleConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketLifecycleConfigurationCommandInput,
    GetBucketLifecycleConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketLifecycleConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketLifecycleConfigurationCommandInput,
    GetBucketLifecycleConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketLifecycleConfigurationCommand extends GetBucketLifecycleConfigurationCommand_base {
  protected static __types: {
    api: {
      input: GetBucketLifecycleConfigurationRequest;
      output: GetBucketLifecycleConfigurationOutput;
    };
    sdk: {
      input: GetBucketLifecycleConfigurationCommandInput;
      output: GetBucketLifecycleConfigurationCommandOutput;
    };
  };
}
