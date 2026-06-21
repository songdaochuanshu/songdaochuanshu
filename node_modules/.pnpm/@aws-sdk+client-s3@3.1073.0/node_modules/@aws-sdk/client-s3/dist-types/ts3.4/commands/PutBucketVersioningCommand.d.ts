import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketVersioningRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketVersioningCommandInput
  extends PutBucketVersioningRequest {}
export interface PutBucketVersioningCommandOutput extends __MetadataBearer {}
declare const PutBucketVersioningCommand_base: {
  new (
    input: PutBucketVersioningCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketVersioningCommandInput,
    PutBucketVersioningCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketVersioningCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketVersioningCommandInput,
    PutBucketVersioningCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketVersioningCommand extends PutBucketVersioningCommand_base {
  protected static __types: {
    api: {
      input: PutBucketVersioningRequest;
      output: {};
    };
    sdk: {
      input: PutBucketVersioningCommandInput;
      output: PutBucketVersioningCommandOutput;
    };
  };
}
