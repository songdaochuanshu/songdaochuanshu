import type { Pluggable, RelativeMiddlewareOptions, SerializeMiddleware } from "@smithy/types";
/**
 * @internal
 * @deprecated - the middleware is no longer necessary since hostPrefix was
 * removed by S3Control codegen customization's model preprocessing.
 */
export declare const hostPrefixDeduplicationMiddleware: () => SerializeMiddleware<any, any>;
/**
 * @internal
 * @deprecated
 */
export declare const hostPrefixDeduplicationMiddlewareOptions: RelativeMiddlewareOptions;
/**
 * @internal
 * @deprecated
 */
export declare const getHostPrefixDeduplicationPlugin: <T>(config: T) => Pluggable<any, any>;
