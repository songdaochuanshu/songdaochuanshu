import type { RelativeMiddlewareOptions, SerializeMiddleware } from "@smithy/types";
import type { PreviouslyResolved } from "./region-redirect-middleware";
/**
 * @internal
 */
export declare const regionRedirectEndpointMiddleware: (config: PreviouslyResolved) => SerializeMiddleware<any, any>;
/**
 * @internal
 */
export declare const regionRedirectEndpointMiddlewareOptions: RelativeMiddlewareOptions;
