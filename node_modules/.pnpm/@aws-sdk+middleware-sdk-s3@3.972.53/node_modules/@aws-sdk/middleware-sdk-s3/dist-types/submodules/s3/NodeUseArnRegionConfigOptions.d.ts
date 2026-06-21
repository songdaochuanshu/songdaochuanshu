import type { LoadedConfigSelectors } from "@smithy/core/config";
export declare const NODE_USE_ARN_REGION_ENV_NAME = "AWS_S3_USE_ARN_REGION";
export declare const NODE_USE_ARN_REGION_INI_NAME = "s3_use_arn_region";
/**
 * Config to load useArnRegion from environment variables and shared INI files
 *
 * @internal
 */
export declare const NODE_USE_ARN_REGION_CONFIG_OPTIONS: LoadedConfigSelectors<boolean | undefined>;
