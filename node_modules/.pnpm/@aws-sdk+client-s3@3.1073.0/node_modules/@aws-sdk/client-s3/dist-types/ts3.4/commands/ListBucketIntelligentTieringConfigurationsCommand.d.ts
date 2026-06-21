import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  ListBucketIntelligentTieringConfigurationsOutput,
  ListBucketIntelligentTieringConfigurationsRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface ListBucketIntelligentTieringConfigurationsCommandInput
  extends ListBucketIntelligentTieringConfigurationsRequest {}
export interface ListBucketIntelligentTieringConfigurationsCommandOutput
  extends ListBucketIntelligentTieringConfigurationsOutput,
    __MetadataBearer {}
declare const ListBucketIntelligentTieringConfigurationsCommand_base: {
  new (
    input: ListBucketIntelligentTieringConfigurationsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListBucketIntelligentTieringConfigurationsCommandInput,
    ListBucketIntelligentTieringConfigurationsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListBucketIntelligentTieringConfigurationsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListBucketIntelligentTieringConfigurationsCommandInput,
    ListBucketIntelligentTieringConfigurationsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListBucketIntelligentTieringConfigurationsCommand extends ListBucketIntelligentTieringConfigurationsCommand_base {
  protected static __types: {
    api: {
      input: ListBucketIntelligentTieringConfigurationsRequest;
      output: ListBucketIntelligentTieringConfigurationsOutput;
    };
    sdk: {
      input: ListBucketIntelligentTieringConfigurationsCommandInput;
      output: ListBucketIntelligentTieringConfigurationsCommandOutput;
    };
  };
}
