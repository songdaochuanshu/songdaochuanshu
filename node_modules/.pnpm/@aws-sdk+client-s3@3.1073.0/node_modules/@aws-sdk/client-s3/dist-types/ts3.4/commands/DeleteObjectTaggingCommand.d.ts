import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DeleteObjectTaggingOutput,
  DeleteObjectTaggingRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteObjectTaggingCommandInput
  extends DeleteObjectTaggingRequest {}
export interface DeleteObjectTaggingCommandOutput
  extends DeleteObjectTaggingOutput,
    __MetadataBearer {}
declare const DeleteObjectTaggingCommand_base: {
  new (
    input: DeleteObjectTaggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteObjectTaggingCommandInput,
    DeleteObjectTaggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteObjectTaggingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteObjectTaggingCommandInput,
    DeleteObjectTaggingCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteObjectTaggingCommand extends DeleteObjectTaggingCommand_base {
  protected static __types: {
    api: {
      input: DeleteObjectTaggingRequest;
      output: DeleteObjectTaggingOutput;
    };
    sdk: {
      input: DeleteObjectTaggingCommandInput;
      output: DeleteObjectTaggingCommandOutput;
    };
  };
}
