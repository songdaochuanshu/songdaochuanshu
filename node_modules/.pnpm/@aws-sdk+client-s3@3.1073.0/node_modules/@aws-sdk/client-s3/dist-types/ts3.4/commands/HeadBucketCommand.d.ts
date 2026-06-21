import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { HeadBucketOutput, HeadBucketRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface HeadBucketCommandInput extends HeadBucketRequest {}
export interface HeadBucketCommandOutput
  extends HeadBucketOutput,
    __MetadataBearer {}
declare const HeadBucketCommand_base: {
  new (
    input: HeadBucketCommandInput
  ): import("@smithy/core/client").CommandImpl<
    HeadBucketCommandInput,
    HeadBucketCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: HeadBucketCommandInput
  ): import("@smithy/core/client").CommandImpl<
    HeadBucketCommandInput,
    HeadBucketCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class HeadBucketCommand extends HeadBucketCommand_base {
  protected static __types: {
    api: {
      input: HeadBucketRequest;
      output: HeadBucketOutput;
    };
    sdk: {
      input: HeadBucketCommandInput;
      output: HeadBucketCommandOutput;
    };
  };
}
