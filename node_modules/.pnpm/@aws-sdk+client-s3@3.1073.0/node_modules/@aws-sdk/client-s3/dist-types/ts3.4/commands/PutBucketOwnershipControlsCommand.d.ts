import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketOwnershipControlsRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketOwnershipControlsCommandInput
  extends PutBucketOwnershipControlsRequest {}
export interface PutBucketOwnershipControlsCommandOutput
  extends __MetadataBearer {}
declare const PutBucketOwnershipControlsCommand_base: {
  new (
    input: PutBucketOwnershipControlsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketOwnershipControlsCommandInput,
    PutBucketOwnershipControlsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketOwnershipControlsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketOwnershipControlsCommandInput,
    PutBucketOwnershipControlsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketOwnershipControlsCommand extends PutBucketOwnershipControlsCommand_base {
  protected static __types: {
    api: {
      input: PutBucketOwnershipControlsRequest;
      output: {};
    };
    sdk: {
      input: PutBucketOwnershipControlsCommandInput;
      output: PutBucketOwnershipControlsCommandOutput;
    };
  };
}
