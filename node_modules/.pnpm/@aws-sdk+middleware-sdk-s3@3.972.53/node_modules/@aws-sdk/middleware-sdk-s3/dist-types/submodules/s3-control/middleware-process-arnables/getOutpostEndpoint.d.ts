export interface GetOutpostEndpointOptions {
    isCustomEndpoint?: boolean;
    regionOverride?: string;
    useFipsEndpoint: boolean;
}
export declare const getOutpostEndpoint: (hostname: string, { isCustomEndpoint, regionOverride, useFipsEndpoint }: GetOutpostEndpointOptions) => string;
