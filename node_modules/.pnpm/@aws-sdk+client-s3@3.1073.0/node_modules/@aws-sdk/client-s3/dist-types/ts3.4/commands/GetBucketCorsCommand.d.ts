import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { GetBucketCorsOutput, GetBucketCorsRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketCorsCommandInput extends GetBucketCorsRequest {}
export interface GetBucketCorsCommandOutput
  extends GetBucketCorsOutput,
    __MetadataBearer {}
declare const GetBucketCorsCommand_base: {
  new (
    input: GetBucketCorsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketCorsCommandInput,
    GetBucketCorsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketCorsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketCorsCommandInput,
    GetBucketCorsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketCorsCommand extends GetBucketCorsCommand_base {
  protected static __types: {
    api: {
      input: GetBucketCorsRequest;
      output: GetBucketCorsOutput;
    };
    sdk: {
      input: GetBucketCorsCommandInput;
      output: GetBucketCorsCommandOutput;
    };
  };
}
