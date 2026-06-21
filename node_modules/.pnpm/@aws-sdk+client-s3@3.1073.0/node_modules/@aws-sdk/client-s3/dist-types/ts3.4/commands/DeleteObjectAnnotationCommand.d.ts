import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DeleteObjectAnnotationOutput,
  DeleteObjectAnnotationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteObjectAnnotationCommandInput
  extends DeleteObjectAnnotationRequest {}
export interface DeleteObjectAnnotationCommandOutput
  extends DeleteObjectAnnotationOutput,
    __MetadataBearer {}
declare const DeleteObjectAnnotationCommand_base: {
  new (
    input: DeleteObjectAnnotationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteObjectAnnotationCommandInput,
    DeleteObjectAnnotationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteObjectAnnotationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteObjectAnnotationCommandInput,
    DeleteObjectAnnotationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteObjectAnnotationCommand extends DeleteObjectAnnotationCommand_base {
  protected static __types: {
    api: {
      input: DeleteObjectAnnotationRequest;
      output: DeleteObjectAnnotationOutput;
    };
    sdk: {
      input: DeleteObjectAnnotationCommandInput;
      output: DeleteObjectAnnotationCommandOutput;
    };
  };
}
