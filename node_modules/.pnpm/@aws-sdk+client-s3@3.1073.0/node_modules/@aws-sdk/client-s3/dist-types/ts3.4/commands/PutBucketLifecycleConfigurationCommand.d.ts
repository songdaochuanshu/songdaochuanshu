import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  PutBucketLifecycleConfigurationOutput,
  PutBucketLifecycleConfigurationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketLifecycleConfigurationCommandInput
  extends PutBucketLifecycleConfigurationRequest {}
export interface PutBucketLifecycleConfigurationCommandOutput
  extends PutBucketLifecycleConfigurationOutput,
    __MetadataBearer {}
declare const PutBucketLifecycleConfigurationCommand_base: {
  new (
    input: PutBucketLifecycleConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketLifecycleConfigurationCommandInput,
    PutBucketLifecycleConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketLifecycleConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketLifecycleConfigurationCommandInput,
    PutBucketLifecycleConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketLifecycleConfigurationCommand extends PutBucketLifecycleConfigurationCommand_base {
  protected static __types: {
    api: {
      input: PutBucketLifecycleConfigurationRequest;
      output: PutBucketLifecycleConfigurationOutput;
    };
    sdk: {
      input: PutBucketLifecycleConfigurationCommandInput;
      output: PutBucketLifecycleConfigurationCommandOutput;
    };
  };
}
