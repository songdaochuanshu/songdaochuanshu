import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { HeadObjectOutput, HeadObjectRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface HeadObjectCommandInput extends HeadObjectRequest {}
export interface HeadObjectCommandOutput
  extends HeadObjectOutput,
    __MetadataBearer {}
declare const HeadObjectCommand_base: {
  new (
    input: HeadObjectCommandInput
  ): import("@smithy/core/client").CommandImpl<
    HeadObjectCommandInput,
    HeadObjectCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: HeadObjectCommandInput
  ): import("@smithy/core/client").CommandImpl<
    HeadObjectCommandInput,
    HeadObjectCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class HeadObjectCommand extends HeadObjectCommand_base {
  protected static __types: {
    api: {
      input: HeadObjectRequest;
      output: HeadObjectOutput;
    };
    sdk: {
      input: HeadObjectCommandInput;
      output: HeadObjectCommandOutput;
    };
  };
}
