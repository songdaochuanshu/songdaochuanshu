import type { Endpoint, EndpointParameters as __EndpointParameters, EndpointV2, Provider } from "@smithy/types";
/**
 * @public
 */
export interface ClientInputEndpointParameters {
    clientContextParams?: {
        disableS3ExpressSessionAuth?: boolean | undefined | Provider<boolean | undefined>;
    };
    region?: string | undefined | Provider<string | undefined>;
    useFipsEndpoint?: boolean | undefined | Provider<boolean | undefined>;
    useDualstackEndpoint?: boolean | undefined | Provider<boolean | undefined>;
    endpoint?: string | Provider<string> | Endpoint | Provider<Endpoint> | EndpointV2 | Provider<EndpointV2>;
    forcePathStyle?: boolean | undefined | Provider<boolean | undefined>;
    useAccelerateEndpoint?: boolean | undefined | Provider<boolean | undefined>;
    useGlobalEndpoint?: boolean | undefined | Provider<boolean | undefined>;
    disableMultiregionAccessPoints?: boolean | undefined | Provider<boolean | undefined>;
    useArnRegion?: boolean | undefined | Provider<boolean | undefined>;
    disableS3ExpressSessionAuth?: boolean | undefined | Provider<boolean | undefined>;
}
/**
 * @public
 */
export type ClientResolvedEndpointParameters = Omit<ClientInputEndpointParameters, "endpoint"> & {
    defaultSigningName: string;
};
/**
 * @internal
 */
export declare const resolveClientEndpointParameters: <T>(options: T & ClientInputEndpointParameters) => T & ClientResolvedEndpointParameters;
/**
 * @internal
 */
export declare const commonParams: {
    readonly ForcePathStyle: {
        readonly type: "clientContextParams";
        readonly name: "forcePathStyle";
    };
    readonly UseArnRegion: {
        readonly type: "clientContextParams";
        readonly name: "useArnRegion";
    };
    readonly DisableMultiRegionAccessPoints: {
        readonly type: "clientContextParams";
        readonly name: "disableMultiregionAccessPoints";
    };
    readonly Accelerate: {
        readonly type: "clientContextParams";
        readonly name: "useAccelerateEndpoint";
    };
    readonly DisableS3ExpressSessionAuth: {
        readonly type: "clientContextParams";
        readonly name: "disableS3ExpressSessionAuth";
    };
    readonly UseGlobalEndpoint: {
        readonly type: "builtInParams";
        readonly name: "useGlobalEndpoint";
    };
    readonly UseFIPS: {
        readonly type: "builtInParams";
        readonly name: "useFipsEndpoint";
    };
    readonly Endpoint: {
        readonly type: "builtInParams";
        readonly name: "endpoint";
    };
    readonly Region: {
        readonly type: "builtInParams";
        readonly name: "region";
    };
    readonly UseDualStack: {
        readonly type: "builtInParams";
        readonly name: "useDualstackEndpoint";
    };
};
/**
 * @internal
 */
export interface EndpointParameters extends __EndpointParameters {
    Bucket?: string | undefined;
    Region?: string | undefined;
    UseFIPS?: boolean | undefined;
    UseDualStack?: boolean | undefined;
    Endpoint?: string | undefined;
    ForcePathStyle?: boolean | undefined;
    Accelerate?: boolean | undefined;
    UseGlobalEndpoint?: boolean | undefined;
    UseObjectLambdaEndpoint?: boolean | undefined;
    Key?: string | undefined;
    Prefix?: string | undefined;
    CopySource?: string | undefined;
    DisableAccessPoints?: boolean | undefined;
    DisableMultiRegionAccessPoints?: boolean | undefined;
    UseArnRegion?: boolean | undefined;
    UseS3ExpressControlEndpoint?: boolean | undefined;
    DisableS3ExpressSessionAuth?: boolean | undefined;
}
