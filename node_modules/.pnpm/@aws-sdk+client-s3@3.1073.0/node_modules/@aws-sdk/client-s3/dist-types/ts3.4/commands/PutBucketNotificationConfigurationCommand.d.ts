import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketNotificationConfigurationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketNotificationConfigurationCommandInput
  extends PutBucketNotificationConfigurationRequest {}
export interface PutBucketNotificationConfigurationCommandOutput
  extends __MetadataBearer {}
declare const PutBucketNotificationConfigurationCommand_base: {
  new (
    input: PutBucketNotificationConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketNotificationConfigurationCommandInput,
    PutBucketNotificationConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketNotificationConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketNotificationConfigurationCommandInput,
    PutBucketNotificationConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketNotificationConfigurationCommand extends PutBucketNotificationConfigurationCommand_base {
  protected static __types: {
    api: {
      input: PutBucketNotificationConfigurationRequest;
      output: {};
    };
    sdk: {
      input: PutBucketNotificationConfigurationCommandInput;
      output: PutBucketNotificationConfigurationCommandOutput;
    };
  };
}
