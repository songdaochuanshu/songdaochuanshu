import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketLoggingOutput,
  GetBucketLoggingRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketLoggingCommandInput extends GetBucketLoggingRequest {}
export interface GetBucketLoggingCommandOutput
  extends GetBucketLoggingOutput,
    __MetadataBearer {}
declare const GetBucketLoggingCommand_base: {
  new (
    input: GetBucketLoggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketLoggingCommandInput,
    GetBucketLoggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketLoggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketLoggingCommandInput,
    GetBucketLoggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketLoggingCommand extends GetBucketLoggingCommand_base {
  protected static __types: {
    api: {
      input: GetBucketLoggingRequest;
      output: GetBucketLoggingOutput;
    };
    sdk: {
      input: GetBucketLoggingCommandInput;
      output: GetBucketLoggingCommandOutput;
    };
  };
}
