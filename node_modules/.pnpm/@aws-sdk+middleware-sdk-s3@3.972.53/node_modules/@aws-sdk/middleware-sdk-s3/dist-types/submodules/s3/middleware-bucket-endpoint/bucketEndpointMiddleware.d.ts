import type { BuildMiddleware, Pluggable, RelativeMiddlewareOptions } from "@smithy/types";
import type { BucketEndpointResolvedConfig } from "./configurations";
/**
 * @deprecated unused as of EndpointsV2.
 * @internal
 */
export declare const bucketEndpointMiddleware: (options: BucketEndpointResolvedConfig) => BuildMiddleware<any, any>;
/**
 * @deprecated unused as of EndpointsV2.
 * @internal
 */
export declare const bucketEndpointMiddlewareOptions: RelativeMiddlewareOptions;
/**
 * @deprecated unused as of EndpointsV2.
 * @internal
 */
export declare const getBucketEndpointPlugin: (options: BucketEndpointResolvedConfig) => Pluggable<any, any>;
