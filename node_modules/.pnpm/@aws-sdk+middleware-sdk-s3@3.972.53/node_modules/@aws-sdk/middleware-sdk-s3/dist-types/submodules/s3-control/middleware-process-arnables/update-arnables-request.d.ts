import type { Provider, RelativeMiddlewareOptions, SerializeMiddleware } from "@smithy/types";
/**
 * @internal
 */
export interface UpdateArnablesRequestMiddlewareConfig {
    isCustomEndpoint?: boolean;
    useFipsEndpoint: Provider<boolean>;
}
/**
 * After outpost request is constructed, redirect request to outpost endpoint and set `x-amz-account-id` and
 * `x-amz-outpost-id` headers.
 *
 * @internal
 */
export declare const updateArnablesRequestMiddleware: (config: UpdateArnablesRequestMiddlewareConfig) => SerializeMiddleware<any, any>;
/**
 * @internal
 */
export declare const updateArnablesRequestMiddlewareOptions: RelativeMiddlewareOptions;
