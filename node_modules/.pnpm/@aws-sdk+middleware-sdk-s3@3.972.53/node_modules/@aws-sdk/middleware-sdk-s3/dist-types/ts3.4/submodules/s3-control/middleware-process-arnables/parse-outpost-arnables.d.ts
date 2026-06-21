import { RelativeMiddlewareOptions, SerializeMiddleware } from "@smithy/types";
import { S3ControlResolvedConfig } from "../configurations";
type ArnableInput = {
  Name?: string;
  Bucket?: string;
  AccountId?: string;
};
export declare const parseOutpostArnablesMiddleaware: (
  options: S3ControlResolvedConfig
) => SerializeMiddleware<ArnableInput, any>;
export declare const parseOutpostArnablesMiddleawareOptions: RelativeMiddlewareOptions;
export {};
