import {
  ChecksumConstructor as __ChecksumConstructor,
  HashConstructor as __HashConstructor,
} from "@aws-sdk/types";
import { NodeHttpHandler as RequestHandler } from "@smithy/node-http-handler";
import { S3ClientConfig } from "./S3Client";
export declare const getRuntimeConfig: (config: S3ClientConfig) => {
  runtime: string;
  defaultsMode: import("@aws-sdk/types").Provider<
    import("@smithy/core/client").ResolvedDefaultsMode
  >;
  authSchemePreference: string[] | import("@aws-sdk/types").Provider<string[]>;
  bodyLengthChecker: import("@aws-sdk/types").BodyLengthCalculator;
  credentialDefaultProvider:
    | ((input: any) => import("@aws-sdk/types").AwsCredentialIdentityProvider)
    | ((
        init?: import("@aws-sdk/credential-provider-node").DefaultProviderInit
      ) => import("@aws-sdk/credential-provider-node/dist-types/runtime/memoize-chain").MemoizedRuntimeConfigAwsCredentialIdentityProvider);
  defaultUserAgentProvider: (
    config?: import("@aws-sdk/core/client").PreviouslyResolved
  ) => Promise<import("@aws-sdk/types").UserAgent>;
  disableS3ExpressSessionAuth:
    | boolean
    | import("@aws-sdk/types").Provider<boolean | undefined>;
  eventStreamSerdeProvider: import("@aws-sdk/types").EventStreamSerdeProvider;
  maxAttempts: number | import("@aws-sdk/types").Provider<number>;
  md5: __HashConstructor;
  region: string | import("@aws-sdk/types").Provider<string>;
  requestChecksumCalculation:
    | import("@aws-sdk/middleware-flexible-checksums").RequestChecksumCalculation
    | import("@aws-sdk/types").Provider<
        import("@aws-sdk/middleware-flexible-checksums").RequestChecksumCalculation
      >;
  requestHandler:
    | RequestHandler
    | import("@smithy/core/protocols").HttpHandler<any>;
  responseChecksumValidation:
    | import("@aws-sdk/middleware-flexible-checksums").ResponseChecksumValidation
    | import("@aws-sdk/types").Provider<
        import("@aws-sdk/middleware-flexible-checksums").ResponseChecksumValidation
      >;
  retryMode: string | import("@aws-sdk/types").Provider<string>;
  sha1: __HashConstructor;
  sha256: __HashConstructor;
  sigv4aSigningRegionSet:
    | string[]
    | import("@aws-sdk/types").Provider<string[] | undefined>;
  streamCollector: import("@aws-sdk/types").StreamCollector;
  streamHasher:
    | import("@aws-sdk/types").StreamHasher<import("stream").Readable>
    | import("@aws-sdk/types").StreamHasher<Blob>;
  useArnRegion:
    | boolean
    | import("@aws-sdk/types").Provider<boolean | undefined>;
  useDualstackEndpoint: boolean | import("@aws-sdk/types").Provider<boolean>;
  useFipsEndpoint: boolean | import("@aws-sdk/types").Provider<boolean>;
  userAgentAppId:
    | string
    | import("@aws-sdk/types").Provider<string | undefined>;
  cacheMiddleware?: boolean | undefined;
  protocol:
    | import("@smithy/types").ClientProtocol<any, any>
    | import("@smithy/types").ClientProtocolCtor<any, any>
    | typeof import("@aws-sdk/middleware-sdk-s3/s3").S3RestXmlProtocol;
  protocolSettings: {
    defaultNamespace?: string;
    [setting: string]: unknown;
  };
  apiVersion: string;
  urlParser: import("@aws-sdk/types").UrlParser;
  base64Decoder: import("@aws-sdk/types").Decoder;
  base64Encoder: (_input: Uint8Array | string) => string;
  utf8Decoder: import("@aws-sdk/types").Decoder;
  utf8Encoder: (input: Uint8Array | string) => string;
  disableHostPrefix: boolean;
  serviceId: string;
  profile?: string;
  getAwsChunkedEncodingStream:
    | import("@aws-sdk/types").GetAwsChunkedEncodingStream<any>
    | typeof import("@smithy/core/serde").getAwsChunkedEncodingStream;
  logger: import("@aws-sdk/types").Logger;
  extensions: import("./runtimeExtensions").RuntimeExtension[];
  signingEscapePath: boolean;
  sdkStreamMixin: import("@aws-sdk/types").SdkStreamMixinInjector;
  customUserAgent?: string | import("@aws-sdk/types").UserAgent;
  requestStreamBufferSize?: number | false;
  checksumAlgorithms?: {
    CRC32?: __ChecksumConstructor;
    CRC32C?: __ChecksumConstructor;
    CRC64NVME?: __ChecksumConstructor;
    SHA1?: __ChecksumConstructor;
    SHA256?: __ChecksumConstructor;
  } & {
    [algorithmId: string]: __ChecksumConstructor;
  };
  retryStrategy?:
    | import("@aws-sdk/types").RetryStrategy
    | import("@aws-sdk/types").RetryStrategyV2;
  endpoint?:
    | ((
        | string
        | import("@aws-sdk/types").Endpoint
        | import("@aws-sdk/types").Provider<import("@aws-sdk/types").Endpoint>
        | import("@aws-sdk/types").EndpointV2
        | import("@aws-sdk/types").Provider<import("@aws-sdk/types").EndpointV2>
      ) &
        (
          | string
          | import("@aws-sdk/types").Provider<string>
          | import("@aws-sdk/types").Endpoint
          | import("@aws-sdk/types").Provider<import("@aws-sdk/types").Endpoint>
          | import("@aws-sdk/types").EndpointV2
          | import("@aws-sdk/types").Provider<
              import("@aws-sdk/types").EndpointV2
            >
        ))
    | undefined;
  endpointProvider: (
    endpointParams: import("./endpoint/EndpointParameters").EndpointParameters,
    context?: {
      logger?: import("@aws-sdk/types").Logger;
    }
  ) => import("@aws-sdk/types").EndpointV2;
  tls?: boolean;
  serviceConfiguredEndpoint?: never;
  httpAuthSchemes: import("@smithy/types").HttpAuthScheme[];
  httpAuthSchemeProvider: import("./auth/httpAuthSchemeProvider").S3HttpAuthSchemeProvider;
  credentials?:
    | import("@aws-sdk/types").AwsCredentialIdentity
    | import("@aws-sdk/types").AwsCredentialIdentityProvider;
  signer?:
    | import("@aws-sdk/types").RequestSigner
    | ((
        authScheme?: import("@aws-sdk/types").AuthScheme
      ) => Promise<import("@aws-sdk/types").RequestSigner>);
  systemClockOffset?: number;
  signingRegion?: string;
  signerConstructor:
    | typeof import("@aws-sdk/signature-v4-multi-region").SignatureV4MultiRegion
    | (new (
        options: import("@smithy/signature-v4").SignatureV4Init &
          import("@smithy/signature-v4").SignatureV4CryptoInit
      ) => import("@aws-sdk/types").RequestSigner);
  forcePathStyle?:
    | (boolean &
        (boolean | import("@aws-sdk/types").Provider<boolean | undefined>))
    | undefined;
  useAccelerateEndpoint?:
    | (boolean &
        (boolean | import("@aws-sdk/types").Provider<boolean | undefined>))
    | undefined;
  disableMultiregionAccessPoints?:
    | (boolean &
        (boolean | import("@aws-sdk/types").Provider<boolean | undefined>))
    | undefined;
  followRegionRedirects?: boolean;
  s3ExpressIdentityProvider?: import("@aws-sdk/middleware-sdk-s3/s3").S3ExpressIdentityProvider;
  bucketEndpoint?: boolean;
  expectContinueHeader?: boolean | number;
  clientContextParams?: {
    disableS3ExpressSessionAuth?:
      | boolean
      | undefined
      | import("@aws-sdk/types").Provider<boolean | undefined>;
  };
  useGlobalEndpoint?:
    | boolean
    | undefined
    | import("@aws-sdk/types").Provider<boolean | undefined>;
};
