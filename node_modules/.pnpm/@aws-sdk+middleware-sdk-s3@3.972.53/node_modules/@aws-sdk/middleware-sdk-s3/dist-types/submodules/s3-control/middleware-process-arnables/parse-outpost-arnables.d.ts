import type { RelativeMiddlewareOptions, SerializeMiddleware } from "@smithy/types";
import type { S3ControlResolvedConfig } from "../configurations";
/**
 * @internal
 */
type ArnableInput = {
    Name?: string;
    Bucket?: string;
    AccountId?: string;
};
/**
 * Validate input `Name` or `Bucket` parameter is acceptable ARN format. If so, modify the input ARN to inferred
 * resource identifier, notify later middleware to redirect request to Outpost endpoint, signing service and signing
 * region.
 * @internal
 */
export declare const parseOutpostArnablesMiddleaware: (options: S3ControlResolvedConfig) => SerializeMiddleware<ArnableInput, any>;
/**
 * This middleware must go after endpoint resolution and before serialization.
 * The transform applied to the input.Bucket or input.Name ARN must not have occurred
 * by the time endpoint resolution happens, but must have completed by the time serialization
 * happens.
 *
 * @internal
 */
export declare const parseOutpostArnablesMiddleawareOptions: RelativeMiddlewareOptions;
export {};
