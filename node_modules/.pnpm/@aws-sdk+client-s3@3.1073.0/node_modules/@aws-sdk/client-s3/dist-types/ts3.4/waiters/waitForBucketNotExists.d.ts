import { WaiterConfiguration, WaiterResult } from "@smithy/core/client";
import {
  HeadBucketCommandInput,
  HeadBucketCommandOutput,
} from "../commands/HeadBucketCommand";
import { NotFound } from "../models/errors";
import { S3ServiceException } from "../models/S3ServiceException";
import { S3Client } from "../S3Client";
export declare const waitForBucketNotExists: (
  params: WaiterConfiguration<S3Client>,
  input: HeadBucketCommandInput
) => Promise<WaiterResult<HeadBucketCommandOutput | S3ServiceException>>;
export declare const waitUntilBucketNotExists: (
  params: WaiterConfiguration<S3Client>,
  input: HeadBucketCommandInput
) => Promise<WaiterResult<NotFound>>;
