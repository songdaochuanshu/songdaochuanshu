import {
  Provider,
  RelativeMiddlewareOptions,
  SerializeMiddleware,
} from "@smithy/types";
export interface UpdateArnablesRequestMiddlewareConfig {
  isCustomEndpoint?: boolean;
  useFipsEndpoint: Provider<boolean>;
}
export declare const updateArnablesRequestMiddleware: (
  config: UpdateArnablesRequestMiddlewareConfig
) => SerializeMiddleware<any, any>;
export declare const updateArnablesRequestMiddlewareOptions: RelativeMiddlewareOptions;
