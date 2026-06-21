import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { ListPartsOutput, ListPartsRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface ListPartsCommandInput extends ListPartsRequest {}
export interface ListPartsCommandOutput
  extends ListPartsOutput,
    __MetadataBearer {}
declare const ListPartsCommand_base: {
  new (input: ListPartsCommandInput): import("@smithy/core/client").CommandImpl<
    ListPartsCommandInput,
    ListPartsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (input: ListPartsCommandInput): import("@smithy/core/client").CommandImpl<
    ListPartsCommandInput,
    ListPartsCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListPartsCommand extends ListPartsCommand_base {
  protected static __types: {
    api: {
      input: ListPartsRequest;
      output: ListPartsOutput;
    };
    sdk: {
      input: ListPartsCommandInput;
      output: ListPartsCommandOutput;
    };
  };
}
