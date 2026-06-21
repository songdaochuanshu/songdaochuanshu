import { Command as $Command } from "@smithy/core/client";
import {
  MetadataBearer as __MetadataBearer,
  StreamingBlobPayloadInputTypes,
} from "@smithy/types";
import {
  PutObjectAnnotationOutput,
  PutObjectAnnotationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutObjectAnnotationCommandInput
  extends Pick<
    PutObjectAnnotationRequest,
    Exclude<keyof PutObjectAnnotationRequest, "AnnotationPayload">
  > {
  AnnotationPayload: StreamingBlobPayloadInputTypes;
}
export interface PutObjectAnnotationCommandOutput
  extends PutObjectAnnotationOutput,
    __MetadataBearer {}
declare const PutObjectAnnotationCommand_base: {
  new (
    input: PutObjectAnnotationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutObjectAnnotationCommandInput,
    PutObjectAnnotationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutObjectAnnotationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutObjectAnnotationCommandInput,
    PutObjectAnnotationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutObjectAnnotationCommand extends PutObjectAnnotationCommand_base {
  protected static __types: {
    api: {
      input: PutObjectAnnotationRequest;
      output: PutObjectAnnotationOutput;
    };
    sdk: {
      input: PutObjectAnnotationCommandInput;
      output: PutObjectAnnotationCommandOutput;
    };
  };
}
