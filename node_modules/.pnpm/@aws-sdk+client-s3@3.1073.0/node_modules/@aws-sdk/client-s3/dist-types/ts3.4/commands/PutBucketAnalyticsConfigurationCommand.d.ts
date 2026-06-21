import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketAnalyticsConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketAnalyticsConfigurationCommandInput
  extends PutBucketAnalyticsConfigurationRequest {}
export interface PutBucketAnalyticsConfigurationCommandOutput
  extends __MetadataBearer {}
declare const PutBucketAnalyticsConfigurationCommand_base: {
  new (
    input: PutBucketAnalyticsConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketAnalyticsConfigurationCommandInput,
    PutBucketAnalyticsConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketAnalyticsConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketAnalyticsConfigurationCommandInput,
    PutBucketAnalyticsConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketAnalyticsConfigurationCommand extends PutBucketAnalyticsConfigurationCommand_base {
  protected static __types: {
    api: {
      input: PutBucketAnalyticsConfigurationRequest;
      output: {};
    };
    sdk: {
      input: PutBucketAnalyticsConfigurationCommandInput;
      output: PutBucketAnalyticsConfigurationCommandOutput;
    };
  };
}
