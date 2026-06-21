import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetPublicAccessBlockOutput,
  GetPublicAccessBlockRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetPublicAccessBlockCommandInput
  extends GetPublicAccessBlockRequest {}
export interface GetPublicAccessBlockCommandOutput
  extends GetPublicAccessBlockOutput,
    __MetadataBearer {}
declare const GetPublicAccessBlockCommand_base: {
  new (
    input: GetPublicAccessBlockCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetPublicAccessBlockCommandInput,
    GetPublicAccessBlockCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetPublicAccessBlockCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetPublicAccessBlockCommandInput,
    GetPublicAccessBlockCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetPublicAccessBlockCommand extends GetPublicAccessBlockCommand_base {
  protected static __types: {
    api: {
      input: GetPublicAccessBlockRequest;
      output: GetPublicAccessBlockOutput;
    };
    sdk: {
      input: GetPublicAccessBlockCommandInput;
      output: GetPublicAccessBlockCommandOutput;
    };
  };
}
