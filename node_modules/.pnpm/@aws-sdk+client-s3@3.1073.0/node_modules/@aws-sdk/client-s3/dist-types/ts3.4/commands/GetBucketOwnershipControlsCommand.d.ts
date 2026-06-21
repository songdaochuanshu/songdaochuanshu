import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetBucketOwnershipControlsOutput,
  GetBucketOwnershipControlsRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetBucketOwnershipControlsCommandInput
  extends GetBucketOwnershipControlsRequest {}
export interface GetBucketOwnershipControlsCommandOutput
  extends GetBucketOwnershipControlsOutput,
    __MetadataBearer {}
declare const GetBucketOwnershipControlsCommand_base: {
  new (
    input: GetBucketOwnershipControlsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketOwnershipControlsCommandInput,
    GetBucketOwnershipControlsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetBucketOwnershipControlsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetBucketOwnershipControlsCommandInput,
    GetBucketOwnershipControlsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetBucketOwnershipControlsCommand extends GetBucketOwnershipControlsCommand_base {
  protected static __types: {
    api: {
      input: GetBucketOwnershipControlsRequest;
      output: GetBucketOwnershipControlsOutput;
    };
    sdk: {
      input: GetBucketOwnershipControlsCommandInput;
      output: GetBucketOwnershipControlsCommandOutput;
    };
  };
}
