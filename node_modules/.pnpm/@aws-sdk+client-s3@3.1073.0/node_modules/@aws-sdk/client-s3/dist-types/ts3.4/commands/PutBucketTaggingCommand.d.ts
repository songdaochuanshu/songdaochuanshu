import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketTaggingRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketTaggingCommandInput extends PutBucketTaggingRequest {}
export interface PutBucketTaggingCommandOutput extends __MetadataBearer {}
declare const PutBucketTaggingCommand_base: {
  new (
    input: PutBucketTaggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketTaggingCommandInput,
    PutBucketTaggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketTaggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketTaggingCommandInput,
    PutBucketTaggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketTaggingCommand extends PutBucketTaggingCommand_base {
  protected static __types: {
    api: {
      input: PutBucketTaggingRequest;
      output: {};
    };
    sdk: {
      input: PutBucketTaggingCommandInput;
      output: PutBucketTaggingCommandOutput;
    };
  };
}
