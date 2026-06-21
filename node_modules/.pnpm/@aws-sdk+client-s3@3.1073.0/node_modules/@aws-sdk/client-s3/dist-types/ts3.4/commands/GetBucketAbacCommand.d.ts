import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { GetBucketAbacOutput, GetBucketAbacRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketAbacCommandInput extends GetBucketAbacRequest {}
export interface GetBucketAbacCommandOutput
  extends GetBucketAbacOutput,
    __MetadataBearer {}
declare const GetBucketAbacCommand_base: {
  new (
    input: GetBucketAbacCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketAbacCommandInput,
    GetBucketAbacCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketAbacCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketAbacCommandInput,
    GetBucketAbacCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketAbacCommand extends GetBucketAbacCommand_base {
  protected static __types: {
    api: {
      input: GetBucketAbacRequest;
      output: GetBucketAbacOutput;
    };
    sdk: {
      input: GetBucketAbacCommandInput;
      output: GetBucketAbacCommandOutput;
    };
  };
}
