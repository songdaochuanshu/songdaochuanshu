import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  ListBucketInventoryConfigurationsOutput,
  ListBucketInventoryConfigurationsRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface ListBucketInventoryConfigurationsCommandInput
  extends ListBucketInventoryConfigurationsRequest {}
export interface ListBucketInventoryConfigurationsCommandOutput
  extends ListBucketInventoryConfigurationsOutput,
    __MetadataBearer {}
declare const ListBucketInventoryConfigurationsCommand_base: {
  new (
    input: ListBucketInventoryConfigurationsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListBucketInventoryConfigurationsCommandInput,
    ListBucketInventoryConfigurationsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListBucketInventoryConfigurationsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListBucketInventoryConfigurationsCommandInput,
    ListBucketInventoryConfigurationsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListBucketInventoryConfigurationsCommand extends ListBucketInventoryConfigurationsCommand_base {
  protected static __types: {
    api: {
      input: ListBucketInventoryConfigurationsRequest;
      output: ListBucketInventoryConfigurationsOutput;
    };
    sdk: {
      input: ListBucketInventoryConfigurationsCommandInput;
      output: ListBucketInventoryConfigurationsCommandOutput;
    };
  };
}
