import { Command as $Command } from "@smithy/core/client";
import {
  MetadataBearer as __MetadataBearer,
  StreamingBlobPayloadOutputTypes,
} from "@smithy/types";
import {
  GetObjectAnnotationOutput,
  GetObjectAnnotationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface GetObjectAnnotationCommandInput
  extends GetObjectAnnotationRequest {}
export interface GetObjectAnnotationCommandOutput
  extends Pick<
      GetObjectAnnotationOutput,
      Exclude<keyof GetObjectAnnotationOutput, "AnnotationPayload">
    >,
    __MetadataBearer {
  AnnotationPayload?: StreamingBlobPayloadOutputTypes;
}
declare const GetObjectAnnotationCommand_base: {
  new (
    input: GetObjectAnnotationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetObjectAnnotationCommandInput,
    GetObjectAnnotationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetObjectAnnotationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetObjectAnnotationCommandInput,
    GetObjectAnnotationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetObjectAnnotationCommand extends GetObjectAnnotationCommand_base {
  protected static __types: {
    api: {
      input: GetObjectAnnotationRequest;
      output: GetObjectAnnotationOutput;
    };
    sdk: {
      input: GetObjectAnnotationCommandInput;
      output: GetObjectAnnotationCommandOutput;
    };
  };
}
