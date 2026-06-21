import type { InitializeHandlerOptions, InitializeMiddleware, Pluggable } from "@smithy/types";
import type { S3ResolvedConfig } from "../middleware-s3-configuration/s3Configuration";
/**
 * @internal
 */
export declare function validateBucketNameMiddleware({ bucketEndpoint }: S3ResolvedConfig): InitializeMiddleware<any, any>;
/**
 * @internal
 */
export declare const validateBucketNameMiddlewareOptions: InitializeHandlerOptions;
/**
 * @internal
 */
export declare const getValidateBucketNamePlugin: (options: S3ResolvedConfig) => Pluggable<any, any>;
