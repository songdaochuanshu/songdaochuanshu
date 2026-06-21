import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteBucketOwnershipControlsRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteBucketOwnershipControlsCommandInput
  extends DeleteBucketOwnershipControlsRequest {}
export interface DeleteBucketOwnershipControlsCommandOutput
  extends __MetadataBearer {}
declare const DeleteBucketOwnershipControlsCommand_base: {
  new (
    input: DeleteBucketOwnershipControlsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketOwnershipControlsCommandInput,
    DeleteBucketOwnershipControlsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBucketOwnershipControlsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketOwnershipControlsCommandInput,
    DeleteBucketOwnershipControlsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBucketOwnershipControlsCommand extends DeleteBucketOwnershipControlsCommand_base {
  protected static __types: {
    api: {
      input: DeleteBucketOwnershipControlsRequest;
      output: {};
    };
    sdk: {
      input: DeleteBucketOwnershipControlsCommandInput;
      output: DeleteBucketOwnershipControlsCommandOutput;
    };
  };
}
