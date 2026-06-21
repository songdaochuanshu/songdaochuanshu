import type { Pluggable } from "@smithy/types";
import type { PreviouslyResolved } from "./configuration";
import type { FlexibleChecksumsInputMiddlewareConfig } from "./flexibleChecksumsInputMiddleware";
import type { FlexibleChecksumsRequestMiddlewareConfig } from "./flexibleChecksumsMiddleware";
import type { FlexibleChecksumsResponseMiddlewareConfig } from "./flexibleChecksumsResponseMiddleware";
/**
 * @internal
 */
export interface FlexibleChecksumsMiddlewareConfig extends FlexibleChecksumsRequestMiddlewareConfig, FlexibleChecksumsInputMiddlewareConfig, FlexibleChecksumsResponseMiddlewareConfig {
}
/**
 * @internal
 */
export declare const getFlexibleChecksumsPlugin: (config: PreviouslyResolved, middlewareConfig: FlexibleChecksumsMiddlewareConfig) => Pluggable<any, any>;
