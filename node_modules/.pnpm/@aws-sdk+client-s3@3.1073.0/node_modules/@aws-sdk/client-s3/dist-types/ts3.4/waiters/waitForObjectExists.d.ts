import { WaiterConfiguration, WaiterResult } from "@smithy/core/client";
import {
  HeadObjectCommandInput,
  HeadObjectCommandOutput,
} from "../commands/HeadObjectCommand";
import { S3ServiceException } from "../models/S3ServiceException";
import { S3Client } from "../S3Client";
export declare const waitForObjectExists: (
  params: WaiterConfiguration<S3Client>,
  input: HeadObjectCommandInput
) => Promise<WaiterResult<HeadObjectCommandOutput | S3ServiceException>>;
export declare const waitUntilObjectExists: (
  params: WaiterConfiguration<S3Client>,
  input: HeadObjectCommandInput
) => Promise<WaiterResult<HeadObjectCommandOutput>>;
