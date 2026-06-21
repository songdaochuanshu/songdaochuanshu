import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { CreateSessionOutput, CreateSessionRequest } from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface CreateSessionCommandInput extends CreateSessionRequest {}
export interface CreateSessionCommandOutput
  extends CreateSessionOutput,
    __MetadataBearer {}
declare const CreateSessionCommand_base: {
  new (
    input: CreateSessionCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateSessionCommandInput,
    CreateSessionCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateSessionCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateSessionCommandInput,
    CreateSessionCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class CreateSessionCommand extends CreateSessionCommand_base {
  protected static __types: {
    api: {
      input: CreateSessionRequest;
      output: CreateSessionOutput;
    };
    sdk: {
      input: CreateSessionCommandInput;
      output: CreateSessionCommandOutput;
    };
  };
}
