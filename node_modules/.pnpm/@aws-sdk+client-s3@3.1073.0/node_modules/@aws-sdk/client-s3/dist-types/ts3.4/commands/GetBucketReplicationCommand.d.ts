import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketReplicationOutput,
  GetBucketReplicationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketReplicationCommandInput
  extends GetBucketReplicationRequest {}
export interface GetBucketReplicationCommandOutput
  extends GetBucketReplicationOutput,
    __MetadataBearer {}
declare const GetBucketReplicationCommand_base: {
  new (
    input: GetBucketReplicationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketReplicationCommandInput,
    GetBucketReplicationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketReplicationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketReplicationCommandInput,
    GetBucketReplicationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketReplicationCommand extends GetBucketReplicationCommand_base {
  protected static __types: {
    api: {
      input: GetBucketReplicationRequest;
      output: GetBucketReplicationOutput;
    };
    sdk: {
      input: GetBucketReplicationCommandInput;
      output: GetBucketReplicationCommandOutput;
    };
  };
}
