import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  ListBucketAnalyticsConfigurationsOutput,
  ListBucketAnalyticsConfigurationsRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface ListBucketAnalyticsConfigurationsCommandInput
  extends ListBucketAnalyticsConfigurationsRequest {}
export interface ListBucketAnalyticsConfigurationsCommandOutput
  extends ListBucketAnalyticsConfigurationsOutput,
    __MetadataBearer {}
declare const ListBucketAnalyticsConfigurationsCommand_base: {
  new (
    input: ListBucketAnalyticsConfigurationsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListBucketAnalyticsConfigurationsCommandInput,
    ListBucketAnalyticsConfigurationsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListBucketAnalyticsConfigurationsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListBucketAnalyticsConfigurationsCommandInput,
    ListBucketAnalyticsConfigurationsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListBucketAnalyticsConfigurationsCommand extends ListBucketAnalyticsConfigurationsCommand_base {
  protected static __types: {
    api: {
      input: ListBucketAnalyticsConfigurationsRequest;
      output: ListBucketAnalyticsConfigurationsOutput;
    };
    sdk: {
      input: ListBucketAnalyticsConfigurationsCommandInput;
      output: ListBucketAnalyticsConfigurationsCommandOutput;
    };
  };
}
