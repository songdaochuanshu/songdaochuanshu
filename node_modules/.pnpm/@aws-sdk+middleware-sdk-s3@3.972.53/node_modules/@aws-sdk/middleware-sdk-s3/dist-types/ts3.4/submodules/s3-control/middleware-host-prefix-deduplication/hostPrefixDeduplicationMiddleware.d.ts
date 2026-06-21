import {
  Pluggable,
  RelativeMiddlewareOptions,
  SerializeMiddleware,
} from "@smithy/types";
export declare const hostPrefixDeduplicationMiddleware: () => SerializeMiddleware<
  any,
  any
>;
export declare const hostPrefixDeduplicationMiddlewareOptions: RelativeMiddlewareOptions;
export declare const getHostPrefixDeduplicationPlugin: <T>(
  config: T
) => Pluggable<any, any>;
