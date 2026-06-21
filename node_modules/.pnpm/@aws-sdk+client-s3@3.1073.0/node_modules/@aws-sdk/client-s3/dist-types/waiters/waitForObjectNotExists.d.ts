import { type WaiterConfiguration, type WaiterResult } from "@smithy/core/client";
import { type HeadObjectCommandInput, type HeadObjectCommandOutput } from "../commands/HeadObjectCommand";
import type { NotFound } from "../models/errors";
import type { S3ServiceException } from "../models/S3ServiceException";
import type { S3Client } from "../S3Client";
/**
 *
 *  @deprecated Use waitUntilObjectNotExists instead. waitForObjectNotExists does not throw error in non-success cases.
 */
export declare const waitForObjectNotExists: (params: WaiterConfiguration<S3Client>, input: HeadObjectCommandInput) => Promise<WaiterResult<HeadObjectCommandOutput | S3ServiceException>>;
/**
 *
 *  @param params - Waiter configuration options.
 *  @param input - The input to HeadObjectCommand for polling.
 */
export declare const waitUntilObjectNotExists: (params: WaiterConfiguration<S3Client>, input: HeadObjectCommandInput) => Promise<WaiterResult<NotFound>>;
