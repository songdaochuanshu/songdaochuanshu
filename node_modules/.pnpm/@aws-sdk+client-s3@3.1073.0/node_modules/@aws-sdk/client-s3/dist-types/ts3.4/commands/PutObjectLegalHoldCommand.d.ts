import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  PutObjectLegalHoldOutput,
  PutObjectLegalHoldRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutObjectLegalHoldCommandInput
  extends PutObjectLegalHoldRequest {}
export interface PutObjectLegalHoldCommandOutput
  extends PutObjectLegalHoldOutput,
    __MetadataBearer {}
declare const PutObjectLegalHoldCommand_base: {
  new (
    input: PutObjectLegalHoldCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutObjectLegalHoldCommandInput,
    PutObjectLegalHoldCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutObjectLegalHoldCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutObjectLegalHoldCommandInput,
    PutObjectLegalHoldCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutObjectLegalHoldCommand extends PutObjectLegalHoldCommand_base {
  protected static __types: {
    api: {
      input: PutObjectLegalHoldRequest;
      output: PutObjectLegalHoldOutput;
    };
    sdk: {
      input: PutObjectLegalHoldCommandInput;
      output: PutObjectLegalHoldCommandOutput;
    };
  };
}
