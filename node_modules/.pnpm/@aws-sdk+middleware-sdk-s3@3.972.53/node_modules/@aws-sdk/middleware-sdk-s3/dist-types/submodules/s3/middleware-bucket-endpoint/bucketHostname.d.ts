import type { ArnHostnameParams, BucketHostnameParams } from "./bucketHostnameUtils";
/**
 * @deprecated unused as of EndpointsV2.
 * @internal
 */
export interface BucketHostname {
    hostname: string;
    bucketEndpoint: boolean;
    signingRegion?: string;
    signingService?: string;
}
/**
 * @deprecated unused as of EndpointsV2.
 * @internal
 */
export declare const bucketHostname: (options: BucketHostnameParams | ArnHostnameParams) => BucketHostname;
