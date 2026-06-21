import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketMetadataConfigurationOutput,
  GetBucketMetadataConfigurationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketMetadataConfigurationCommandInput
  extends GetBucketMetadataConfigurationRequest {}
export interface GetBucketMetadataConfigurationCommandOutput
  extends GetBucketMetadataConfigurationOutput,
    __MetadataBearer {}
declare const GetBucketMetadataConfigurationCommand_base: {
  new (
    input: GetBucketMetadataConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketMetadataConfigurationCommandInput,
    GetBucketMetadataConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketMetadataConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketMetadataConfigurationCommandInput,
    GetBucketMetadataConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketMetadataConfigurationCommand extends GetBucketMetadataConfigurationCommand_base {
  protected static __types: {
    api: {
      input: GetBucketMetadataConfigurationRequest;
      output: GetBucketMetadataConfigurationOutput;
    };
    sdk: {
      input: GetBucketMetadataConfigurationCommandInput;
      output: GetBucketMetadataConfigurationCommandOutput;
    };
  };
}
