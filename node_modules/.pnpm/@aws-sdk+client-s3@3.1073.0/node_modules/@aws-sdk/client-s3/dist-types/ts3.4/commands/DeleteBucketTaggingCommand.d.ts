import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteBucketTaggingRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteBucketTaggingCommandInput
  extends DeleteBucketTaggingRequest {}
export interface DeleteBucketTaggingCommandOutput extends __MetadataBearer {}
declare const DeleteBucketTaggingCommand_base: {
  new (
    input: DeleteBucketTaggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketTaggingCommandInput,
    DeleteBucketTaggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBucketTaggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketTaggingCommandInput,
    DeleteBucketTaggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBucketTaggingCommand extends DeleteBucketTaggingCommand_base {
  protected static __types: {
    api: {
      input: DeleteBucketTaggingRequest;
      output: {};
    };
    sdk: {
      input: DeleteBucketTaggingCommandInput;
      output: DeleteBucketTaggingCommandOutput;
    };
  };
}
