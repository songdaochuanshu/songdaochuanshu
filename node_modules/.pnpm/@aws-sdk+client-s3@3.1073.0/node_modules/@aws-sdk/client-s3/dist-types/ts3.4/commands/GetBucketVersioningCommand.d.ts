import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketVersioningOutput,
  GetBucketVersioningRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketVersioningCommandInput
  extends GetBucketVersioningRequest {}
export interface GetBucketVersioningCommandOutput
  extends GetBucketVersioningOutput,
    __MetadataBearer {}
declare const GetBucketVersioningCommand_base: {
  new (
    input: GetBucketVersioningCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketVersioningCommandInput,
    GetBucketVersioningCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketVersioningCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketVersioningCommandInput,
    GetBucketVersioningCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketVersioningCommand extends GetBucketVersioningCommand_base {
  protected static __types: {
    api: {
      input: GetBucketVersioningRequest;
      output: GetBucketVersioningOutput;
    };
    sdk: {
      input: GetBucketVersioningCommandInput;
      output: GetBucketVersioningCommandOutput;
    };
  };
}
