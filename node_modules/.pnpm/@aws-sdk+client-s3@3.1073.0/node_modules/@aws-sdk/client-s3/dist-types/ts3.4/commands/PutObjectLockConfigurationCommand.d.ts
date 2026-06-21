import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  PutObjectLockConfigurationOutput,
  PutObjectLockConfigurationRequest,
} from "../models/models_0";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface PutObjectLockConfigurationCommandInput
  extends PutObjectLockConfigurationRequest {}
export interface PutObjectLockConfigurationCommandOutput
  extends PutObjectLockConfigurationOutput,
    __MetadataBearer {}
declare const PutObjectLockConfigurationCommand_base: {
  new (
    input: PutObjectLockConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutObjectLockConfigurationCommandInput,
    PutObjectLockConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutObjectLockConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutObjectLockConfigurationCommandInput,
    PutObjectLockConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutObjectLockConfigurationCommand extends PutObjectLockConfigurationCommand_base {
  protected static __types: {
    api: {
      input: PutObjectLockConfigurationRequest;
      output: PutObjectLockConfigurationOutput;
    };
    sdk: {
      input: PutObjectLockConfigurationCommandInput;
      output: PutObjectLockConfigurationCommandOutput;
    };
  };
}
