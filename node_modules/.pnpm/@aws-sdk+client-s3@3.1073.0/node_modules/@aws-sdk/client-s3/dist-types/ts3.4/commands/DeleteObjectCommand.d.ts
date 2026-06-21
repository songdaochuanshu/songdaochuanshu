import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteObjectOutput, DeleteObjectRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteObjectCommandInput extends DeleteObjectRequest {}
export interface DeleteObjectCommandOutput
  extends DeleteObjectOutput,
    __MetadataBearer {}
declare const DeleteObjectCommand_base: {
  new (
    input: DeleteObjectCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteObjectCommandInput,
    DeleteObjectCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteObjectCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteObjectCommandInput,
    DeleteObjectCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteObjectCommand extends DeleteObjectCommand_base {
  protected static __types: {
    api: {
      input: DeleteObjectRequest;
      output: DeleteObjectOutput;
    };
    sdk: {
      input: DeleteObjectCommandInput;
      output: DeleteObjectCommandOutput;
    };
  };
}
