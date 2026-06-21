import { Command as $Command } from "@smithy/core/client";
import {
  MetadataBearer as __MetadataBearer,
  StreamingBlobPayloadOutputTypes,
} from "@smithy/types";
import {
  GetObjectTorrentOutput,
  GetObjectTorrentRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetObjectTorrentCommandInput extends GetObjectTorrentRequest {}
export interface GetObjectTorrentCommandOutput
  extends Pick<
      GetObjectTorrentOutput,
      Exclude<keyof GetObjectTorrentOutput, "Body">
    >,
    __MetadataBearer {
  Body?: StreamingBlobPayloadOutputTypes;
}
declare const GetObjectTorrentCommand_base: {
  new (
    input: GetObjectTorrentCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetObjectTorrentCommandInput,
    GetObjectTorrentCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetObjectTorrentCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetObjectTorrentCommandInput,
    GetObjectTorrentCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetObjectTorrentCommand extends GetObjectTorrentCommand_base {
  protected static __types: {
    api: {
      input: GetObjectTorrentRequest;
      output: GetObjectTorrentOutput;
    };
    sdk: {
      input: GetObjectTorrentCommandInput;
      output: GetObjectTorrentCommandOutput;
    };
  };
}
