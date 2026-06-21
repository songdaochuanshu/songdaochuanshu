import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { CreateBucketMetadataConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface CreateBucketMetadataConfigurationCommandInput
  extends CreateBucketMetadataConfigurationRequest {}
export interface CreateBucketMetadataConfigurationCommandOutput
  extends __MetadataBearer {}
declare const CreateBucketMetadataConfigurationCommand_base: {
  new (
    input: CreateBucketMetadataConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateBucketMetadataConfigurationCommandInput,
    CreateBucketMetadataConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateBucketMetadataConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateBucketMetadataConfigurationCommandInput,
    CreateBucketMetadataConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class CreateBucketMetadataConfigurationCommand extends CreateBucketMetadataConfigurationCommand_base {
  protected static __types: {
    api: {
      input: CreateBucketMetadataConfigurationRequest;
      output: {};
    };
    sdk: {
      input: CreateBucketMetadataConfigurationCommandInput;
      output: CreateBucketMetadataConfigurationCommandOutput;
    };
  };
}
