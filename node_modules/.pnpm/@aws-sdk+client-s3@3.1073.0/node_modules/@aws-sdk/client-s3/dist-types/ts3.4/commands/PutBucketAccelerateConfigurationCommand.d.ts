import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketAccelerateConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketAccelerateConfigurationCommandInput
  extends PutBucketAccelerateConfigurationRequest {}
export interface PutBucketAccelerateConfigurationCommandOutput
  extends __MetadataBearer {}
declare const PutBucketAccelerateConfigurationCommand_base: {
  new (
    input: PutBucketAccelerateConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketAccelerateConfigurationCommandInput,
    PutBucketAccelerateConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketAccelerateConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketAccelerateConfigurationCommandInput,
    PutBucketAccelerateConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketAccelerateConfigurationCommand extends PutBucketAccelerateConfigurationCommand_base {
  protected static __types: {
    api: {
      input: PutBucketAccelerateConfigurationRequest;
      output: {};
    };
    sdk: {
      input: PutBucketAccelerateConfigurationCommandInput;
      output: PutBucketAccelerateConfigurationCommandOutput;
    };
  };
}
