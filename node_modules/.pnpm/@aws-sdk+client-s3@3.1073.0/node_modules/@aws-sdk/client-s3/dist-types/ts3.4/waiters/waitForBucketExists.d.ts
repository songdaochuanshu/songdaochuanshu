import { WaiterConfiguration, WaiterResult } from "@smithy/core/client";
import {
  HeadBucketCommandInput,
  HeadBucketCommandOutput,
} from "../commands/HeadBucketCommand";
import { S3ServiceException } from "../models/S3ServiceException";
import { S3Client } from "../S3Client";
export declare const waitForBucketExists: (
  params: WaiterConfiguration<S3Client>,
  input: HeadBucketCommandInput
) => Promise<WaiterResult<HeadBucketCommandOutput | S3ServiceException>>;
export declare const waitUntilBucketExists: (
  params: WaiterConfiguration<S3Client>,
  input: HeadBucketCommandInput
) => Promise<WaiterResult<HeadBucketCommandOutput>>;
