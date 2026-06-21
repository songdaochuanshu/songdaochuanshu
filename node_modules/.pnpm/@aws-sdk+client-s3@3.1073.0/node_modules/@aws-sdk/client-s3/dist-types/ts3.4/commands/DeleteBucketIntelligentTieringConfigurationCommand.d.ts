import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteBucketIntelligentTieringConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteBucketIntelligentTieringConfigurationCommandInput
  extends DeleteBucketIntelligentTieringConfigurationRequest {}
export interface DeleteBucketIntelligentTieringConfigurationCommandOutput
  extends __MetadataBearer {}
declare const DeleteBucketIntelligentTieringConfigurationCommand_base: {
  new (
    input: DeleteBucketIntelligentTieringConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketIntelligentTieringConfigurationCommandInput,
    DeleteBucketIntelligentTieringConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBucketIntelligentTieringConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketIntelligentTieringConfigurationCommandInput,
    DeleteBucketIntelligentTieringConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBucketIntelligentTieringConfigurationCommand extends DeleteBucketIntelligentTieringConfigurationCommand_base {
  protected static __types: {
    api: {
      input: DeleteBucketIntelligentTieringConfigurationRequest;
      output: {};
    };
    sdk: {
      input: DeleteBucketIntelligentTieringConfigurationCommandInput;
      output: DeleteBucketIntelligentTieringConfigurationCommandOutput;
    };
  };
}
