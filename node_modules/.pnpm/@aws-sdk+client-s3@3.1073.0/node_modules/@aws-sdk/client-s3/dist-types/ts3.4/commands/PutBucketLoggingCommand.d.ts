import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketLoggingRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketLoggingCommandInput extends PutBucketLoggingRequest {}
export interface PutBucketLoggingCommandOutput extends __MetadataBearer {}
declare const PutBucketLoggingCommand_base: {
  new (
    input: PutBucketLoggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketLoggingCommandInput,
    PutBucketLoggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketLoggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketLoggingCommandInput,
    PutBucketLoggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketLoggingCommand extends PutBucketLoggingCommand_base {
  protected static __types: {
    api: {
      input: PutBucketLoggingRequest;
      output: {};
    };
    sdk: {
      input: PutBucketLoggingCommandInput;
      output: PutBucketLoggingCommandOutput;
    };
  };
}
