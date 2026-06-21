import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { UpdateBucketMetadataJournalTableConfigurationRequest } from "../models/models_1";
import {
  S3ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../S3Client";
export { __MetadataBearer };
export { $Command };
export interface UpdateBucketMetadataJournalTableConfigurationCommandInput
  extends UpdateBucketMetadataJournalTableConfigurationRequest {}
export interface UpdateBucketMetadataJournalTableConfigurationCommandOutput
  extends __MetadataBearer {}
declare const UpdateBucketMetadataJournalTableConfigurationCommand_base: {
  new (
    input: UpdateBucketMetadataJournalTableConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateBucketMetadataJournalTableConfigurationCommandInput,
    UpdateBucketMetadataJournalTableConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateBucketMetadataJournalTableConfigurationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateBucketMetadataJournalTableConfigurationCommandInput,
    UpdateBucketMetadataJournalTableConfigurationCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class UpdateBucketMetadataJournalTableConfigurationCommand extends UpdateBucketMetadataJournalTableConfigurationCommand_base {
  protected static __types: {
    api: {
      input: UpdateBucketMetadataJournalTableConfigurationRequest;
      output: {};
    };
    sdk: {
      input: UpdateBucketMetadataJournalTableConfigurationCommandInput;
      output: UpdateBucketMetadataJournalTableConfigurationCommandOutput;
    };
  };
}
