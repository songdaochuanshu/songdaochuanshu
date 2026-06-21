import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { ListObjectsOutput, ListObjectsRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface ListObjectsCommandInput extends ListObjectsRequest {}
export interface ListObjectsCommandOutput
  extends ListObjectsOutput,
    __MetadataBearer {}
declare const ListObjectsCommand_base: {
  new (
    input: ListObjectsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListObjectsCommandInput,
    ListObjectsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListObjectsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListObjectsCommandInput,
    ListObjectsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListObjectsCommand extends ListObjectsCommand_base {
  protected static __types: {
    api: {
      input: ListObjectsRequest;
      output: ListObjectsOutput;
    };
    sdk: {
      input: ListObjectsCommandInput;
      output: ListObjectsCommandOutput;
    };
  };
}
