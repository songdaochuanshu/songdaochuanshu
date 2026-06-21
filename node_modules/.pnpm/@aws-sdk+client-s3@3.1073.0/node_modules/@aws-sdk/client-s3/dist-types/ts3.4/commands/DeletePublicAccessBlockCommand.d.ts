import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeletePublicAccessBlockRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeletePublicAccessBlockCommandInput
  extends DeletePublicAccessBlockRequest {}
export interface DeletePublicAccessBlockCommandOutput
  extends __MetadataBearer {}
declare const DeletePublicAccessBlockCommand_base: {
  new (
    input: DeletePublicAccessBlockCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeletePublicAccessBlockCommandInput,
    DeletePublicAccessBlockCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeletePublicAccessBlockCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeletePublicAccessBlockCommandInput,
    DeletePublicAccessBlockCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeletePublicAccessBlockCommand extends DeletePublicAccessBlockCommand_base {
  protected static __types: {
    api: {
      input: DeletePublicAccessBlockRequest;
      output: {};
    };
    sdk: {
      input: DeletePublicAccessBlockCommandInput;
      output: DeletePublicAccessBlockCommandOutput;
    };
  };
}
