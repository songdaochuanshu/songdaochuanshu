import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketInventoryConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketInventoryConfigurationCommandInput
  extends PutBucketInventoryConfigurationRequest {}
export interface PutBucketInventoryConfigurationCommandOutput
  extends __MetadataBearer {}
declare const PutBucketInventoryConfigurationCommand_base: {
  new (
    input: PutBucketInventoryConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketInventoryConfigurationCommandInput,
    PutBucketInventoryConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketInventoryConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketInventoryConfigurationCommandInput,
    PutBucketInventoryConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketInventoryConfigurationCommand extends PutBucketInventoryConfigurationCommand_base {
  protected static __types: {
    api: {
      input: PutBucketInventoryConfigurationRequest;
      output: {};
    };
    sdk: {
      input: PutBucketInventoryConfigurationCommandInput;
      output: PutBucketInventoryConfigurationCommandOutput;
    };
  };
}
