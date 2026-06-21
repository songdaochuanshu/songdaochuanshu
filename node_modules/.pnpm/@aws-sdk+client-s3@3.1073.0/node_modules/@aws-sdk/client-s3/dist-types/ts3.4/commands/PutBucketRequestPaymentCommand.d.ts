import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PutBucketRequestPaymentRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutBucketRequestPaymentCommandInput
  extends PutBucketRequestPaymentRequest {}
export interface PutBucketRequestPaymentCommandOutput
  extends __MetadataBearer {}
declare const PutBucketRequestPaymentCommand_base: {
  new (
    input: PutBucketRequestPaymentCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketRequestPaymentCommandInput,
    PutBucketRequestPaymentCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBucketRequestPaymentCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutBucketRequestPaymentCommandInput,
    PutBucketRequestPaymentCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutBucketRequestPaymentCommand extends PutBucketRequestPaymentCommand_base {
  protected static __types: {
    api: {
      input: PutBucketRequestPaymentRequest;
      output: {};
    };
    sdk: {
      input: PutBucketRequestPaymentCommandInput;
      output: PutBucketRequestPaymentCommandOutput;
    };
  };
}
