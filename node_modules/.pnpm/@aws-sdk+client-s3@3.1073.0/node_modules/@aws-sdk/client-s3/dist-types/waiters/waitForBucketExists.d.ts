import { type WaiterConfiguration, type WaiterResult } from "@smithy/core/client";
import { type HeadBucketCommandInput, type HeadBucketCommandOutput } from "../commands/HeadBucketCommand";
import type { S3ServiceException } from "../models/S3ServiceException";
import type { S3Client } from "../S3Client";
/**
 *
 *  @deprecated Use waitUntilBucketExists instead. waitForBucketExists does not throw error in non-success cases.
 */
export declare const waitForBucketExists: (params: WaiterConfiguration<S3Client>, input: HeadBucketCommandInput) => Promise<WaiterResult<HeadBucketCommandOutput | S3ServiceException>>;
/**
 *
 *  @param params - Waiter configuration options.
 *  @param input - The input to HeadBucketCommand for polling.
 */
export declare const waitUntilBucketExists: (params: WaiterConfiguration<S3Client>, input: HeadBucketCommandInput) => Promise<WaiterResult<HeadBucketCommandOutput>>;
