import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketReplicationRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketReplicationCommandInput
  extends PutBucketReplicationRequest {}
export interface PutBucketReplicationCommandOutput extends __MetadataBearer {}
declare const PutBucketReplicationCommand_base: {
  new (
    input: PutBucketReplicationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketReplicationCommandInput,
    PutBucketReplicationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketReplicationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketReplicationCommandInput,
    PutBucketReplicationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketReplicationCommand extends PutBucketReplicationCommand_base {
  protected static __types: {
    api: {
      input: PutBucketReplicationRequest;
      output: {};
    };
    sdk: {
      input: PutBucketReplicationCommandInput;
      output: PutBucketReplicationCommandOutput;
    };
  };
}
