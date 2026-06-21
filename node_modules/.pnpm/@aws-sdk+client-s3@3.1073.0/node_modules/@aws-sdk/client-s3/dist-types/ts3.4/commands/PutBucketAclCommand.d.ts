import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketAclRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketAclCommandInput extends PutBucketAclRequest {}
export interface PutBucketAclCommandOutput extends __MetadataBearer {}
declare const PutBucketAclCommand_base: {
  new (
    input: PutBucketAclCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketAclCommandInput,
    PutBucketAclCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketAclCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketAclCommandInput,
    PutBucketAclCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketAclCommand extends PutBucketAclCommand_base {
  protected static __types: {
    api: {
      input: PutBucketAclRequest;
      output: {};
    };
    sdk: {
      input: PutBucketAclCommandInput;
      output: PutBucketAclCommandOutput;
    };
  };
}
