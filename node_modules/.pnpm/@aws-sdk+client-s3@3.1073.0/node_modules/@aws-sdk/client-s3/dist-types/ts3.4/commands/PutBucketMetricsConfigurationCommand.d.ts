import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketMetricsConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketMetricsConfigurationCommandInput
  extends PutBucketMetricsConfigurationRequest {}
export interface PutBucketMetricsConfigurationCommandOutput
  extends __MetadataBearer {}
declare const PutBucketMetricsConfigurationCommand_base: {
  new (
    input: PutBucketMetricsConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketMetricsConfigurationCommandInput,
    PutBucketMetricsConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketMetricsConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketMetricsConfigurationCommandInput,
    PutBucketMetricsConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketMetricsConfigurationCommand extends PutBucketMetricsConfigurationCommand_base {
  protected static __types: {
    api: {
      input: PutBucketMetricsConfigurationRequest;
      output: {};
    };
    sdk: {
      input: PutBucketMetricsConfigurationCommandInput;
      output: PutBucketMetricsConfigurationCommandOutput;
    };
  };
}
