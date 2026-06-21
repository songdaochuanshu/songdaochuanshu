import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetObjectTaggingOutput,
  GetObjectTaggingRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetObjectTaggingCommandInput extends GetObjectTaggingRequest {}
export interface GetObjectTaggingCommandOutput
  extends GetObjectTaggingOutput,
    __MetadataBearer {}
declare const GetObjectTaggingCommand_base: {
  new (
    input: GetObjectTaggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetObjectTaggingCommandInput,
    GetObjectTaggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetObjectTaggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetObjectTaggingCommandInput,
    GetObjectTaggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetObjectTaggingCommand extends GetObjectTaggingCommand_base {
  protected static __types: {
    api: {
      input: GetObjectTaggingRequest;
      output: GetObjectTaggingOutput;
    };
    sdk: {
      input: GetObjectTaggingCommandInput;
      output: GetObjectTaggingCommandOutput;
    };
  };
}
