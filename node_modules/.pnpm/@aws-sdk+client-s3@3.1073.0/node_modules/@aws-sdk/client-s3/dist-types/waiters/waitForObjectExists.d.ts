import { type WaiterConfiguration, type WaiterResult } from "@smithy/core/client";
import { type HeadObjectCommandInput, type HeadObjectCommandOutput } from "../commands/HeadObjectCommand";
import type { S3ServiceException } from "../models/S3ServiceException";
import type { S3Client } from "../S3Client";
/**
 *
 *  @deprecated Use waitUntilObjectExists instead. waitForObjectExists does not throw error in non-success cases.
 */
export declare const waitForObjectExists: (params: WaiterConfiguration<S3Client>, input: HeadObjectCommandInput) => Promise<WaiterResult<HeadObjectCommandOutput | S3ServiceException>>;
/**
 *
 *  @param params - Waiter configuration options.
 *  @param input - The input to HeadObjectCommand for polling.
 */
export declare const waitUntilObjectExists: (params: WaiterConfiguration<S3Client>, input: HeadObjectCommandInput) => Promise<WaiterResult<HeadObjectCommandOutput>>;
