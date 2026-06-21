import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketCorsRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketCorsCommandInput extends PutBucketCorsRequest {}
export interface PutBucketCorsCommandOutput extends __MetadataBearer {}
declare const PutBucketCorsCommand_base: {
  new (
    input: PutBucketCorsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketCorsCommandInput,
    PutBucketCorsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketCorsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketCorsCommandInput,
    PutBucketCorsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketCorsCommand extends PutBucketCorsCommand_base {
  protected static __types: {
    api: {
      input: PutBucketCorsRequest;
      output: {};
    };
    sdk: {
      input: PutBucketCorsCommandInput;
      output: PutBucketCorsCommandOutput;
    };
  };
}
