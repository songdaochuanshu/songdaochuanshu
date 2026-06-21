import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteBucketMetadataTableConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteBucketMetadataTableConfigurationCommandInput
  extends DeleteBucketMetadataTableConfigurationRequest {}
export interface DeleteBucketMetadataTableConfigurationCommandOutput
  extends __MetadataBearer {}
declare const DeleteBucketMetadataTableConfigurationCommand_base: {
  new (
    input: DeleteBucketMetadataTableConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketMetadataTableConfigurationCommandInput,
    DeleteBucketMetadataTableConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBucketMetadataTableConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketMetadataTableConfigurationCommandInput,
    DeleteBucketMetadataTableConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBucketMetadataTableConfigurationCommand extends DeleteBucketMetadataTableConfigurationCommand_base {
  protected static __types: {
    api: {
      input: DeleteBucketMetadataTableConfigurationRequest;
      output: {};
    };
    sdk: {
      input: DeleteBucketMetadataTableConfigurationCommandInput;
      output: DeleteBucketMetadataTableConfigurationCommandOutput;
    };
  };
}
