import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketMetadataTableConfigurationOutput,
  GetBucketMetadataTableConfigurationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketMetadataTableConfigurationCommandInput
  extends GetBucketMetadataTableConfigurationRequest {}
export interface GetBucketMetadataTableConfigurationCommandOutput
  extends GetBucketMetadataTableConfigurationOutput,
    __MetadataBearer {}
declare const GetBucketMetadataTableConfigurationCommand_base: {
  new (
    input: GetBucketMetadataTableConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketMetadataTableConfigurationCommandInput,
    GetBucketMetadataTableConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketMetadataTableConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketMetadataTableConfigurationCommandInput,
    GetBucketMetadataTableConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketMetadataTableConfigurationCommand extends GetBucketMetadataTableConfigurationCommand_base {
  protected static __types: {
    api: {
      input: GetBucketMetadataTableConfigurationRequest;
      output: GetBucketMetadataTableConfigurationOutput;
    };
    sdk: {
      input: GetBucketMetadataTableConfigurationCommandInput;
      output: GetBucketMetadataTableConfigurationCommandOutput;
    };
  };
}
