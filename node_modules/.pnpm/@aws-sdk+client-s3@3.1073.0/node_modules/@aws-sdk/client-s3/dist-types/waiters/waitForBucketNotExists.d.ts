import { type WaiterConfiguration, type WaiterResult } from "@smithy/core/client";
import { type HeadBucketCommandInput, type HeadBucketCommandOutput } from "../commands/HeadBucketCommand";
import type { NotFound } from "../models/errors";
import type { S3ServiceException } from "../models/S3ServiceException";
import type { S3Client } from "../S3Client";
/**
 *
 *  @deprecated Use waitUntilBucketNotExists instead. waitForBucketNotExists does not throw error in non-success cases.
 */
export declare const waitForBucketNotExists: (params: WaiterConfiguration<S3Client>, input: HeadBucketCommandInput) => Promise<WaiterResult<HeadBucketCommandOutput | S3ServiceException>>;
/**
 *
 *  @param params - Waiter configuration options.
 *  @param input - The input to HeadBucketCommand for polling.
 */
export declare const waitUntilBucketNotExists: (params: WaiterConfiguration<S3Client>, input: HeadBucketCommandInput) => Promise<WaiterResult<NotFound>>;
