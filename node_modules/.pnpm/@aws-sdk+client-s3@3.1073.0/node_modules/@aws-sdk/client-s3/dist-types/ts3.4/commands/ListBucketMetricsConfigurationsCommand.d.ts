import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  ListBucketMetricsConfigurationsOutput,
  ListBucketMetricsConfigurationsRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface ListBucketMetricsConfigurationsCommandInput
  extends ListBucketMetricsConfigurationsRequest {}
export interface ListBucketMetricsConfigurationsCommandOutput
  extends ListBucketMetricsConfigurationsOutput,
    __MetadataBearer {}
declare const ListBucketMetricsConfigurationsCommand_base: {
  new (
    input: ListBucketMetricsConfigurationsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListBucketMetricsConfigurationsCommandInput,
    ListBucketMetricsConfigurationsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListBucketMetricsConfigurationsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListBucketMetricsConfigurationsCommandInput,
    ListBucketMetricsConfigurationsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListBucketMetricsConfigurationsCommand extends ListBucketMetricsConfigurationsCommand_base {
  protected static __types: {
    api: {
      input: ListBucketMetricsConfigurationsRequest;
      output: ListBucketMetricsConfigurationsOutput;
    };
    sdk: {
      input: ListBucketMetricsConfigurationsCommandInput;
      output: ListBucketMetricsConfigurationsCommandOutput;
    };
  };
}
