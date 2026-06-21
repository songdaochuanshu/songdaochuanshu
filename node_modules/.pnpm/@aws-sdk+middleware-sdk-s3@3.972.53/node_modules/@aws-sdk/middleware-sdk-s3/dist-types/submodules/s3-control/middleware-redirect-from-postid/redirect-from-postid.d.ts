import type { BuildHandlerOptions, BuildMiddleware, Pluggable, Provider } from "@smithy/types";
import type { S3ControlResolvedConfig } from "../configurations";
type InputType = {
    OutpostId?: string;
};
export interface RedirectFromPostIdMiddlewareConfig {
    isCustomEndpoint?: boolean;
    useFipsEndpoint: Provider<boolean>;
}
/**
 * If OutpostId is set, redirect hostname to Outpost one, and change signing service to `s3-outposts`.
 * Applied to S3Control.CreateBucket and S3Control.ListRegionalBuckets
 */
export declare const redirectFromPostIdMiddleware: (config: RedirectFromPostIdMiddlewareConfig) => BuildMiddleware<InputType, any>;
export declare const redirectFromPostIdMiddlewareOptions: BuildHandlerOptions;
export declare const getRedirectFromPostIdPlugin: (options: S3ControlResolvedConfig) => Pluggable<any, any>;
export {};
