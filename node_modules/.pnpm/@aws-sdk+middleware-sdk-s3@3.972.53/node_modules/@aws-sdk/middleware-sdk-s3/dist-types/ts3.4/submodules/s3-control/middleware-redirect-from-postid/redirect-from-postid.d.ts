import {
  BuildHandlerOptions,
  BuildMiddleware,
  Pluggable,
  Provider,
} from "@smithy/types";
import { S3ControlResolvedConfig } from "../configurations";
type InputType = {
  OutpostId?: string;
};
export interface RedirectFromPostIdMiddlewareConfig {
  isCustomEndpoint?: boolean;
  useFipsEndpoint: Provider<boolean>;
}
export declare const redirectFromPostIdMiddleware: (
  config: RedirectFromPostIdMiddlewareConfig
) => BuildMiddleware<InputType, any>;
export declare const redirectFromPostIdMiddlewareOptions: BuildHandlerOptions;
export declare const getRedirectFromPostIdPlugin: (
  options: S3ControlResolvedConfig
) => Pluggable<any, any>;
export {};
