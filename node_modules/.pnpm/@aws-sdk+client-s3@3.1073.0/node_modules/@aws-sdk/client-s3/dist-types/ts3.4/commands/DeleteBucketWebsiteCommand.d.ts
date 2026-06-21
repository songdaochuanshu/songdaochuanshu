import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteBucketWebsiteRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteBucketWebsiteCommandInput
  extends DeleteBucketWebsiteRequest {}
export interface DeleteBucketWebsiteCommandOutput extends __MetadataBearer {}
declare const DeleteBucketWebsiteCommand_base: {
  new (
    input: DeleteBucketWebsiteCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketWebsiteCommandInput,
    DeleteBucketWebsiteCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBucketWebsiteCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketWebsiteCommandInput,
    DeleteBucketWebsiteCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBucketWebsiteCommand extends DeleteBucketWebsiteCommand_base {
  protected static __types: {
    api: {
      input: DeleteBucketWebsiteRequest;
      output: {};
    };
    sdk: {
      input: DeleteBucketWebsiteCommandInput;
      output: DeleteBucketWebsiteCommandOutput;
    };
  };
}
