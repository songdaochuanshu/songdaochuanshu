export { NODE_USE_ARN_REGION_CONFIG_OPTIONS } from "@aws-sdk/middleware-sdk-s3/s3";
export function resolveS3ControlConfig(input) {
    const { useArnRegion } = input;
    return Object.assign(input, {
        useArnRegion: typeof useArnRegion === "function" ? useArnRegion : () => Promise.resolve(useArnRegion),
    });
}
