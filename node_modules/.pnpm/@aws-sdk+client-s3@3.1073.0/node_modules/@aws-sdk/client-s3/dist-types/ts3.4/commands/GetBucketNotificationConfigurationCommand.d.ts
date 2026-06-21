import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketNotificationConfigurationRequest,
  NotificationConfiguration,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketNotificationConfigurationCommandInput
  extends GetBucketNotificationConfigurationRequest {}
export interface GetBucketNotificationConfigurationCommandOutput
  extends NotificationConfiguration,
    __MetadataBearer {}
declare const GetBucketNotificationConfigurationCommand_base: {
  new (
    input: GetBucketNotificationConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketNotificationConfigurationCommandInput,
    GetBucketNotificationConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketNotificationConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketNotificationConfigurationCommandInput,
    GetBucketNotificationConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketNotificationConfigurationCommand extends GetBucketNotificationConfigurationCommand_base {
  protected static __types: {
    api: {
      input: GetBucketNotificationConfigurationRequest;
      output: NotificationConfiguration;
    };
    sdk: {
      input: GetBucketNotificationConfigurationCommandInput;
      output: GetBucketNotificationConfigurationCommandOutput;
    };
  };
}
