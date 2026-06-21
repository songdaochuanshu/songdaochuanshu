import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketWebsiteOutput,
  GetBucketWebsiteRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketWebsiteCommandInput extends GetBucketWebsiteRequest {}
export interface GetBucketWebsiteCommandOutput
  extends GetBucketWebsiteOutput,
    __MetadataBearer {}
declare const GetBucketWebsiteCommand_base: {
  new (
    input: GetBucketWebsiteCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketWebsiteCommandInput,
    GetBucketWebsiteCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketWebsiteCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketWebsiteCommandInput,
    GetBucketWebsiteCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketWebsiteCommand extends GetBucketWebsiteCommand_base {
  protected static __types: {
    api: {
      input: GetBucketWebsiteRequest;
      output: GetBucketWebsiteOutput;
    };
    sdk: {
      input: GetBucketWebsiteCommandInput;
      output: GetBucketWebsiteCommandOutput;
    };
  };
}
