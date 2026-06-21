import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  ListDirectoryBucketsOutput,
  ListDirectoryBucketsRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface ListDirectoryBucketsCommandInput
  extends ListDirectoryBucketsRequest {}
export interface ListDirectoryBucketsCommandOutput
  extends ListDirectoryBucketsOutput,
    __MetadataBearer {}
declare const ListDirectoryBucketsCommand_base: {
  new (
    input: ListDirectoryBucketsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListDirectoryBucketsCommandInput,
    ListDirectoryBucketsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListDirectoryBucketsCommandInput]
  ): import("@smithy/core/client").CommandImpl<
    ListDirectoryBucketsCommandInput,
    ListDirectoryBucketsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListDirectoryBucketsCommand extends ListDirectoryBucketsCommand_base {
  protected static __types: {
    api: {
      input: ListDirectoryBucketsRequest;
      output: ListDirectoryBucketsOutput;
    };
    sdk: {
      input: ListDirectoryBucketsCommandInput;
      output: ListDirectoryBucketsCommandOutput;
    };
  };
}
