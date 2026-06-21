import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketInventoryConfigurationOutput,
  GetBucketInventoryConfigurationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketInventoryConfigurationCommandInput
  extends GetBucketInventoryConfigurationRequest {}
export interface GetBucketInventoryConfigurationCommandOutput
  extends GetBucketInventoryConfigurationOutput,
    __MetadataBearer {}
declare const GetBucketInventoryConfigurationCommand_base: {
  new (
    input: GetBucketInventoryConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketInventoryConfigurationCommandInput,
    GetBucketInventoryConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketInventoryConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketInventoryConfigurationCommandInput,
    GetBucketInventoryConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketInventoryConfigurationCommand extends GetBucketInventoryConfigurationCommand_base {
  protected static __types: {
    api: {
      input: GetBucketInventoryConfigurationRequest;
      output: GetBucketInventoryConfigurationOutput;
    };
    sdk: {
      input: GetBucketInventoryConfigurationCommandInput;
      output: GetBucketInventoryConfigurationCommandOutput;
    };
  };
}
