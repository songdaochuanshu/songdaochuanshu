import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { CreateBucketMetadataTableConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface CreateBucketMetadataTableConfigurationCommandInput
  extends CreateBucketMetadataTableConfigurationRequest {}
export interface CreateBucketMetadataTableConfigurationCommandOutput
  extends __MetadataBearer {}
declare const CreateBucketMetadataTableConfigurationCommand_base: {
  new (
    input: CreateBucketMetadataTableConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateBucketMetadataTableConfigurationCommandInput,
    CreateBucketMetadataTableConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateBucketMetadataTableConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateBucketMetadataTableConfigurationCommandInput,
    CreateBucketMetadataTableConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class CreateBucketMetadataTableConfigurationCommand extends CreateBucketMetadataTableConfigurationCommand_base {
  protected static __types: {
    api: {
      input: CreateBucketMetadataTableConfigurationRequest;
      output: {};
    };
    sdk: {
      input: CreateBucketMetadataTableConfigurationCommandInput;
      output: CreateBucketMetadataTableConfigurationCommandOutput;
    };
  };
}
