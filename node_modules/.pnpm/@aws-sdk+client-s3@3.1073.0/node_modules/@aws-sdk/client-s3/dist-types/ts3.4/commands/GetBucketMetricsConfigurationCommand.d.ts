import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketMetricsConfigurationOutput,
  GetBucketMetricsConfigurationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketMetricsConfigurationCommandInput
  extends GetBucketMetricsConfigurationRequest {}
export interface GetBucketMetricsConfigurationCommandOutput
  extends GetBucketMetricsConfigurationOutput,
    __MetadataBearer {}
declare const GetBucketMetricsConfigurationCommand_base: {
  new (
    input: GetBucketMetricsConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketMetricsConfigurationCommandInput,
    GetBucketMetricsConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketMetricsConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketMetricsConfigurationCommandInput,
    GetBucketMetricsConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketMetricsConfigurationCommand extends GetBucketMetricsConfigurationCommand_base {
  protected static __types: {
    api: {
      input: GetBucketMetricsConfigurationRequest;
      output: GetBucketMetricsConfigurationOutput;
    };
    sdk: {
      input: GetBucketMetricsConfigurationCommandInput;
      output: GetBucketMetricsConfigurationCommandOutput;
    };
  };
}
