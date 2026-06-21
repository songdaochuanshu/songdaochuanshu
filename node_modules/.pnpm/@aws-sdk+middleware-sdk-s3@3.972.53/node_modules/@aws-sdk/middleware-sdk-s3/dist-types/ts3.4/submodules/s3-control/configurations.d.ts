import { Provider, RegionInfoProvider } from "@smithy/types";
export { NODE_USE_ARN_REGION_CONFIG_OPTIONS } from "@aws-sdk/middleware-sdk-s3/s3";
export interface S3ControlInputConfig {
  useArnRegion?: boolean | undefined | Provider<boolean | undefined>;
}
interface PreviouslyResolved {
  isCustomEndpoint?: boolean;
  region: Provider<string>;
  regionInfoProvider?: RegionInfoProvider;
  useFipsEndpoint: Provider<boolean>;
  useDualstackEndpoint: Provider<boolean>;
}
export interface S3ControlResolvedConfig {
  isCustomEndpoint?: boolean;
  useFipsEndpoint: Provider<boolean>;
  useDualstackEndpoint: Provider<boolean>;
  useArnRegion: Provider<boolean | undefined>;
  region: Provider<string>;
  regionInfoProvider?: RegionInfoProvider;
}
export declare function resolveS3ControlConfig<T>(
  input: T & PreviouslyResolved & S3ControlInputConfig
): T & S3ControlResolvedConfig;
