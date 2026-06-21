import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  ListObjectAnnotationsOutput,
  ListObjectAnnotationsRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface ListObjectAnnotationsCommandInput
  extends ListObjectAnnotationsRequest {}
export interface ListObjectAnnotationsCommandOutput
  extends ListObjectAnnotationsOutput,
    __MetadataBearer {}
declare const ListObjectAnnotationsCommand_base: {
  new (
    input: ListObjectAnnotationsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListObjectAnnotationsCommandInput,
    ListObjectAnnotationsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListObjectAnnotationsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListObjectAnnotationsCommandInput,
    ListObjectAnnotationsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListObjectAnnotationsCommand extends ListObjectAnnotationsCommand_base {
  protected static __types: {
    api: {
      input: ListObjectAnnotationsRequest;
      output: ListObjectAnnotationsOutput;
    };
    sdk: {
      input: ListObjectAnnotationsCommandInput;
      output: ListObjectAnnotationsCommandOutput;
    };
  };
}
