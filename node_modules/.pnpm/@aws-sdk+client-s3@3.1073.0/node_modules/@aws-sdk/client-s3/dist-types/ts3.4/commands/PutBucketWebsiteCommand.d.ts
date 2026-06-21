import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketWebsiteRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketWebsiteCommandInput extends PutBucketWebsiteRequest {}
export interface PutBucketWebsiteCommandOutput extends __MetadataBearer {}
declare const PutBucketWebsiteCommand_base: {
  new (
    input: PutBucketWebsiteCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketWebsiteCommandInput,
    PutBucketWebsiteCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketWebsiteCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketWebsiteCommandInput,
    PutBucketWebsiteCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketWebsiteCommand extends PutBucketWebsiteCommand_base {
  protected static __types: {
    api: {
      input: PutBucketWebsiteRequest;
      output: {};
    };
    sdk: {
      input: PutBucketWebsiteCommandInput;
      output: PutBucketWebsiteCommandOutput;
    };
  };
}
