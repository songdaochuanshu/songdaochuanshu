import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteBucketAnalyticsConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteBucketAnalyticsConfigurationCommandInput
  extends DeleteBucketAnalyticsConfigurationRequest {}
export interface DeleteBucketAnalyticsConfigurationCommandOutput
  extends __MetadataBearer {}
declare const DeleteBucketAnalyticsConfigurationCommand_base: {
  new (
    input: DeleteBucketAnalyticsConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketAnalyticsConfigurationCommandInput,
    DeleteBucketAnalyticsConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBucketAnalyticsConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketAnalyticsConfigurationCommandInput,
    DeleteBucketAnalyticsConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBucketAnalyticsConfigurationCommand extends DeleteBucketAnalyticsConfigurationCommand_base {
  protected static __types: {
    api: {
      input: DeleteBucketAnalyticsConfigurationRequest;
      output: {};
    };
    sdk: {
      input: DeleteBucketAnalyticsConfigurationCommandInput;
      output: DeleteBucketAnalyticsConfigurationCommandOutput;
    };
  };
}
