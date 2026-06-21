import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { RenameObjectOutput, RenameObjectRequest } from "../models/models_1";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface RenameObjectCommandInput extends RenameObjectRequest {}
export interface RenameObjectCommandOutput
  extends RenameObjectOutput,
    __MetadataBearer {}
declare const RenameObjectCommand_base: {
  new (
    input: RenameObjectCommandInput
  ): import("@smithy/core/client").CommandImpl<
    RenameObjectCommandInput,
    RenameObjectCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: RenameObjectCommandInput
  ): import("@smithy/core/client").CommandImpl<
    RenameObjectCommandInput,
    RenameObjectCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class RenameObjectCommand extends RenameObjectCommand_base {
  protected static __types: {
    api: {
      input: RenameObjectRequest;
      output: {};
    };
    sdk: {
      input: RenameObjectCommandInput;
      output: RenameObjectCommandOutput;
    };
  };
}
