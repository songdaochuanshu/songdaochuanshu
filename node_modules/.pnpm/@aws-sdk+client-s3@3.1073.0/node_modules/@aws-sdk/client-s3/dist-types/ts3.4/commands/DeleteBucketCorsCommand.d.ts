import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteBucketCorsRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface DeleteBucketCorsCommandInput extends DeleteBucketCorsRequest {}
export interface DeleteBucketCorsCommandOutput extends __MetadataBearer {}
declare const DeleteBucketCorsCommand_base: {
  new (
    input: DeleteBucketCorsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketCorsCommandInput,
    DeleteBucketCorsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBucketCorsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBucketCorsCommandInput,
    DeleteBucketCorsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBucketCorsCommand extends DeleteBucketCorsCommand_base {
  protected static __types: {
    api: {
      input: DeleteBucketCorsRequest;
      output: {};
    };
    sdk: {
      input: DeleteBucketCorsCommandInput;
      output: DeleteBucketCorsCommandOutput;
    };
  };
}
