import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketIntelligentTieringConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketIntelligentTieringConfigurationCommandInput
  extends PutBucketIntelligentTieringConfigurationRequest {}
export interface PutBucketIntelligentTieringConfigurationCommandOutput
  extends __MetadataBearer {}
declare const PutBucketIntelligentTieringConfigurationCommand_base: {
  new (
    input: PutBucketIntelligentTieringConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketIntelligentTieringConfigurationCommandInput,
    PutBucketIntelligentTieringConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketIntelligentTieringConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketIntelligentTieringConfigurationCommandInput,
    PutBucketIntelligentTieringConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketIntelligentTieringConfigurationCommand extends PutBucketIntelligentTieringConfigurationCommand_base {
  protected static __types: {
    api: {
      input: PutBucketIntelligentTieringConfigurationRequest;
      output: {};
    };
    sdk: {
      input: PutBucketIntelligentTieringConfigurationCommandInput;
      output: PutBucketIntelligentTieringConfigurationCommandOutput;
    };
  };
}
