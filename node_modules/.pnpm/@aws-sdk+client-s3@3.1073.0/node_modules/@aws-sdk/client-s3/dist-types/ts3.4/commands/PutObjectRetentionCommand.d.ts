import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  PutObjectRetentionOutput,
  PutObjectRetentionRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutObjectRetentionCommandInput
  extends PutObjectRetentionRequest {}
export interface PutObjectRetentionCommandOutput
  extends PutObjectRetentionOutput,
    __MetadataBearer {}
declare const PutObjectRetentionCommand_base: {
  new (
    input: PutObjectRetentionCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutObjectRetentionCommandInput,
    PutObjectRetentionCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutObjectRetentionCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutObjectRetentionCommandInput,
    PutObjectRetentionCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutObjectRetentionCommand extends PutObjectRetentionCommand_base {
  protected static __types: {
    api: {
      input: PutObjectRetentionRequest;
      output: PutObjectRetentionOutput;
    };
    sdk: {
      input: PutObjectRetentionCommandInput;
      output: PutObjectRetentionCommandOutput;
    };
  };
}
