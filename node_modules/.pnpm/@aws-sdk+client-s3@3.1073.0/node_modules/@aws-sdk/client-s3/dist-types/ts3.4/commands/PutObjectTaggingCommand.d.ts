import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  PutObjectTaggingOutput,
  PutObjectTaggingRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutObjectTaggingCommandInput extends PutObjectTaggingRequest {}
export interface PutObjectTaggingCommandOutput
  extends PutObjectTaggingOutput,
    __MetadataBearer {}
declare const PutObjectTaggingCommand_base: {
  new (
    input: PutObjectTaggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutObjectTaggingCommandInput,
    PutObjectTaggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutObjectTaggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutObjectTaggingCommandInput,
    PutObjectTaggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutObjectTaggingCommand extends PutObjectTaggingCommand_base {
  protected static __types: {
    api: {
      input: PutObjectTaggingRequest;
      output: PutObjectTaggingOutput;
    };
    sdk: {
      input: PutObjectTaggingCommandInput;
      output: PutObjectTaggingCommandOutput;
    };
  };
}
