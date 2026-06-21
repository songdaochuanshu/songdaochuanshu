import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { UpdateBucketMetadataAnnotationTableConfigurationRequest } from "../models/models_1";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface UpdateBucketMetadataAnnotationTableConfigurationCommandInput
  extends UpdateBucketMetadataAnnotationTableConfigurationRequest {}
export interface UpdateBucketMetadataAnnotationTableConfigurationCommandOutput
  extends __MetadataBearer {}
declare const UpdateBucketMetadataAnnotationTableConfigurationCommand_base: {
  new (
    input: UpdateBucketMetadataAnnotationTableConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateBucketMetadataAnnotationTableConfigurationCommandInput,
    UpdateBucketMetadataAnnotationTableConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateBucketMetadataAnnotationTableConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateBucketMetadataAnnotationTableConfigurationCommandInput,
    UpdateBucketMetadataAnnotationTableConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class UpdateBucketMetadataAnnotationTableConfigurationCommand extends UpdateBucketMetadataAnnotationTableConfigurationCommand_base {
  protected static __types: {
    api: {
      input: UpdateBucketMetadataAnnotationTableConfigurationRequest;
      output: {};
    };
    sdk: {
      input: UpdateBucketMetadataAnnotationTableConfigurationCommandInput;
      output: UpdateBucketMetadataAnnotationTableConfigurationCommandOutput;
    };
  };
}
