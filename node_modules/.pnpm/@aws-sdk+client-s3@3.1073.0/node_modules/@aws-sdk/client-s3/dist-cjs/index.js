var __exportStar = (m, e) => { Object.assign(e, m); };
const { getAwsRegionExtensionConfiguration, resolveAwsRegionExtensionConfiguration, resolveUserAgentConfig, resolveHostHeaderConfig, getUserAgentPlugin, getHostHeaderPlugin, getLoggerPlugin, getRecursionDetectionPlugin } = require("@aws-sdk/core/client");
const { resolveFlexibleChecksumsConfig, getFlexibleChecksumsPlugin } = require("@aws-sdk/middleware-flexible-checksums");
const { getThrow200ExceptionsPlugin, resolveS3Config, getValidateBucketNamePlugin, getAddExpectContinuePlugin, getRegionRedirectMiddlewarePlugin, getS3ExpressPlugin, getS3ExpressHttpSigningPlugin, getSsecPlugin, getLocationConstraintPlugin, getS3ExpiresMiddlewarePlugin, getCheckContentLengthHeaderPlugin } = require("@aws-sdk/middleware-sdk-s3/s3");
const { getHttpAuthSchemeEndpointRuleSetPlugin, DefaultIdentityProviderConfig, getHttpSigningPlugin, createPaginator } = require("@smithy/core");
const { Command, getDefaultExtensionConfiguration, resolveDefaultRuntimeConfig, Client, createWaiter, checkExceptions, WaiterState, createAggregatedClient } = require("@smithy/core/client");
exports.$Command = Command;
exports.__Client = Client;
const { resolveRegionConfig } = require("@smithy/core/config");
const { getEndpointPlugin, resolveEndpointConfig } = require("@smithy/core/endpoints");
const { resolveEventStreamSerdeConfig } = require("@smithy/core/event-streams");
const { getHttpHandlerExtensionConfiguration, resolveHttpHandlerRuntimeConfig, getContentLengthPlugin } = require("@smithy/core/protocols");
const { resolveRetryConfig, getRetryPlugin } = require("@smithy/core/retry");
const { getSchemaSerdePlugin } = require("@smithy/core/schema");
const { resolveHttpAuthSchemeConfig, defaultS3HttpAuthSchemeParametersProvider } = require("./auth/httpAuthSchemeProvider");
const { CreateSession$, AbortMultipartUpload$, CompleteMultipartUpload$, CopyObject$, CreateBucket$, CreateBucketMetadataConfiguration$, CreateBucketMetadataTableConfiguration$, CreateMultipartUpload$, DeleteBucketAnalyticsConfiguration$, DeleteBucket$, DeleteBucketCors$, DeleteBucketEncryption$, DeleteBucketIntelligentTieringConfiguration$, DeleteBucketInventoryConfiguration$, DeleteBucketLifecycle$, DeleteBucketMetadataConfiguration$, DeleteBucketMetadataTableConfiguration$, DeleteBucketMetricsConfiguration$, DeleteBucketOwnershipControls$, DeleteBucketPolicy$, DeleteBucketReplication$, DeleteBucketTagging$, DeleteBucketWebsite$, DeleteObjectAnnotation$, DeleteObject$, DeleteObjects$, DeleteObjectTagging$, DeletePublicAccessBlock$, GetBucketAbac$, GetBucketAccelerateConfiguration$, GetBucketAcl$, GetBucketAnalyticsConfiguration$, GetBucketCors$, GetBucketEncryption$, GetBucketIntelligentTieringConfiguration$, GetBucketInventoryConfiguration$, GetBucketLifecycleConfiguration$, GetBucketLocation$, GetBucketLogging$, GetBucketMetadataConfiguration$, GetBucketMetadataTableConfiguration$, GetBucketMetricsConfiguration$, GetBucketNotificationConfiguration$, GetBucketOwnershipControls$, GetBucketPolicy$, GetBucketPolicyStatus$, GetBucketReplication$, GetBucketRequestPayment$, GetBucketTagging$, GetBucketVersioning$, GetBucketWebsite$, GetObjectAcl$, GetObjectAnnotation$, GetObjectAttributes$, GetObject$, GetObjectLegalHold$, GetObjectLockConfiguration$, GetObjectRetention$, GetObjectTagging$, GetObjectTorrent$, GetPublicAccessBlock$, HeadBucket$, HeadObject$, ListBucketAnalyticsConfigurations$, ListBucketIntelligentTieringConfigurations$, ListBucketInventoryConfigurations$, ListBucketMetricsConfigurations$, ListBuckets$, ListDirectoryBuckets$, ListMultipartUploads$, ListObjectAnnotations$, ListObjects$, ListObjectsV2$, ListObjectVersions$, ListParts$, PutBucketAbac$, PutBucketAccelerateConfiguration$, PutBucketAcl$, PutBucketAnalyticsConfiguration$, PutBucketCors$, PutBucketEncryption$, PutBucketIntelligentTieringConfiguration$, PutBucketInventoryConfiguration$, PutBucketLifecycleConfiguration$, PutBucketLogging$, PutBucketMetricsConfiguration$, PutBucketNotificationConfiguration$, PutBucketOwnershipControls$, PutBucketPolicy$, PutBucketReplication$, PutBucketRequestPayment$, PutBucketTagging$, PutBucketVersioning$, PutBucketWebsite$, PutObjectAcl$, PutObjectAnnotation$, PutObject$, PutObjectLegalHold$, PutObjectLockConfiguration$, PutObjectRetention$, PutObjectTagging$, PutPublicAccessBlock$, RenameObject$, RestoreObject$, SelectObjectContent$, UpdateBucketMetadataAnnotationTableConfiguration$, UpdateBucketMetadataInventoryTableConfiguration$, UpdateBucketMetadataJournalTableConfiguration$, UpdateObjectEncryption$, UploadPart$, UploadPartCopy$, WriteGetObjectResponse$ } = require("./schemas/schemas_0");
__exportStar(require("./schemas/schemas_0"), exports);
const { getRuntimeConfig } = require("./runtimeConfig");
__exportStar(require("./models/errors"), exports);
const { S3ServiceException } = require("./models/S3ServiceException");
exports.S3ServiceException = S3ServiceException;

const resolveClientEndpointParameters = (options) => {
    return Object.assign(options, {
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        forcePathStyle: options.forcePathStyle ?? false,
        useAccelerateEndpoint: options.useAccelerateEndpoint ?? false,
        useGlobalEndpoint: options.useGlobalEndpoint ?? false,
        disableMultiregionAccessPoints: options.disableMultiregionAccessPoints ?? false,
        defaultSigningName: "s3",
        clientContextParams: options.clientContextParams ?? {},
    });
};
const commonParams = {
    ForcePathStyle: { type: "clientContextParams", name: "forcePathStyle" },
    UseArnRegion: { type: "clientContextParams", name: "useArnRegion" },
    DisableMultiRegionAccessPoints: { type: "clientContextParams", name: "disableMultiregionAccessPoints" },
    Accelerate: { type: "clientContextParams", name: "useAccelerateEndpoint" },
    DisableS3ExpressSessionAuth: { type: "clientContextParams", name: "disableS3ExpressSessionAuth" },
    UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" },
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
};

class CreateSessionCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    DisableS3ExpressSessionAuth: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "CreateSession", {})
    .n("S3Client", "CreateSessionCommand")
    .sc(CreateSession$)
    .build() {
}

const getHttpAuthExtensionConfiguration = (runtimeConfig) => {
    const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
    let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
    let _credentials = runtimeConfig.credentials;
    return {
        setHttpAuthScheme(httpAuthScheme) {
            const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
            if (index === -1) {
                _httpAuthSchemes.push(httpAuthScheme);
            }
            else {
                _httpAuthSchemes.splice(index, 1, httpAuthScheme);
            }
        },
        httpAuthSchemes() {
            return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
            _httpAuthSchemeProvider = httpAuthSchemeProvider;
        },
        httpAuthSchemeProvider() {
            return _httpAuthSchemeProvider;
        },
        setCredentials(credentials) {
            _credentials = credentials;
        },
        credentials() {
            return _credentials;
        },
    };
};
const resolveHttpAuthRuntimeConfig = (config) => {
    return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials(),
    };
};

const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};

class S3Client extends Client {
    config;
    constructor(...[configuration]) {
        const _config_0 = getRuntimeConfig(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = resolveClientEndpointParameters(_config_0);
        const _config_2 = resolveUserAgentConfig(_config_1);
        const _config_3 = resolveFlexibleChecksumsConfig(_config_2);
        const _config_4 = resolveRetryConfig(_config_3);
        const _config_5 = resolveRegionConfig(_config_4);
        const _config_6 = resolveHostHeaderConfig(_config_5);
        const _config_7 = resolveEndpointConfig(_config_6);
        const _config_8 = resolveEventStreamSerdeConfig(_config_7);
        const _config_9 = resolveHttpAuthSchemeConfig(_config_8);
        const _config_10 = resolveS3Config(_config_9, { session: [() => this, CreateSessionCommand] });
        const _config_11 = resolveRuntimeExtensions(_config_10, configuration?.extensions || []);
        this.config = _config_11;
        this.middlewareStack.use(getSchemaSerdePlugin(this.config));
        this.middlewareStack.use(getUserAgentPlugin(this.config));
        this.middlewareStack.use(getRetryPlugin(this.config));
        this.middlewareStack.use(getContentLengthPlugin(this.config));
        this.middlewareStack.use(getHostHeaderPlugin(this.config));
        this.middlewareStack.use(getLoggerPlugin(this.config));
        this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
        this.middlewareStack.use(getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
            httpAuthSchemeParametersProvider: defaultS3HttpAuthSchemeParametersProvider,
            identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig({
                "aws.auth#sigv4": config.credentials,
                "aws.auth#sigv4a": config.credentials,
            }),
        }));
        this.middlewareStack.use(getHttpSigningPlugin(this.config));
        this.middlewareStack.use(getValidateBucketNamePlugin(this.config));
        this.middlewareStack.use(getAddExpectContinuePlugin(this.config));
        this.middlewareStack.use(getRegionRedirectMiddlewarePlugin(this.config));
        this.middlewareStack.use(getS3ExpressPlugin(this.config));
        this.middlewareStack.use(getS3ExpressHttpSigningPlugin(this.config));
    }
    destroy() {
        super.destroy();
    }
}

class AbortMultipartUploadCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "AbortMultipartUpload", {})
    .n("S3Client", "AbortMultipartUploadCommand")
    .sc(AbortMultipartUpload$)
    .build() {
}

class CompleteMultipartUploadCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
        getSsecPlugin(config),
    ];
})
    .s("AmazonS3", "CompleteMultipartUpload", {})
    .n("S3Client", "CompleteMultipartUploadCommand")
    .sc(CompleteMultipartUpload$)
    .build() {
}

class CopyObjectCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    DisableS3ExpressSessionAuth: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
    CopySource: { type: "contextParams", name: "CopySource" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
        getSsecPlugin(config),
    ];
})
    .s("AmazonS3", "CopyObject", {})
    .n("S3Client", "CopyObjectCommand")
    .sc(CopyObject$)
    .build() {
}

class CreateBucketCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    DisableAccessPoints: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
        getLocationConstraintPlugin(config),
    ];
})
    .s("AmazonS3", "CreateBucket", {})
    .n("S3Client", "CreateBucketCommand")
    .sc(CreateBucket$)
    .build() {
}

class CreateBucketMetadataConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "CreateBucketMetadataConfiguration", {})
    .n("S3Client", "CreateBucketMetadataConfigurationCommand")
    .sc(CreateBucketMetadataConfiguration$)
    .build() {
}

class CreateBucketMetadataTableConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "CreateBucketMetadataTableConfiguration", {})
    .n("S3Client", "CreateBucketMetadataTableConfigurationCommand")
    .sc(CreateBucketMetadataTableConfiguration$)
    .build() {
}

class CreateMultipartUploadCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
        getSsecPlugin(config),
    ];
})
    .s("AmazonS3", "CreateMultipartUpload", {})
    .n("S3Client", "CreateMultipartUploadCommand")
    .sc(CreateMultipartUpload$)
    .build() {
}

class DeleteBucketAnalyticsConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketAnalyticsConfiguration", {})
    .n("S3Client", "DeleteBucketAnalyticsConfigurationCommand")
    .sc(DeleteBucketAnalyticsConfiguration$)
    .build() {
}

class DeleteBucketCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucket", {})
    .n("S3Client", "DeleteBucketCommand")
    .sc(DeleteBucket$)
    .build() {
}

class DeleteBucketCorsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketCors", {})
    .n("S3Client", "DeleteBucketCorsCommand")
    .sc(DeleteBucketCors$)
    .build() {
}

class DeleteBucketEncryptionCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketEncryption", {})
    .n("S3Client", "DeleteBucketEncryptionCommand")
    .sc(DeleteBucketEncryption$)
    .build() {
}

class DeleteBucketIntelligentTieringConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketIntelligentTieringConfiguration", {})
    .n("S3Client", "DeleteBucketIntelligentTieringConfigurationCommand")
    .sc(DeleteBucketIntelligentTieringConfiguration$)
    .build() {
}

class DeleteBucketInventoryConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketInventoryConfiguration", {})
    .n("S3Client", "DeleteBucketInventoryConfigurationCommand")
    .sc(DeleteBucketInventoryConfiguration$)
    .build() {
}

class DeleteBucketLifecycleCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketLifecycle", {})
    .n("S3Client", "DeleteBucketLifecycleCommand")
    .sc(DeleteBucketLifecycle$)
    .build() {
}

class DeleteBucketMetadataConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketMetadataConfiguration", {})
    .n("S3Client", "DeleteBucketMetadataConfigurationCommand")
    .sc(DeleteBucketMetadataConfiguration$)
    .build() {
}

class DeleteBucketMetadataTableConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketMetadataTableConfiguration", {})
    .n("S3Client", "DeleteBucketMetadataTableConfigurationCommand")
    .sc(DeleteBucketMetadataTableConfiguration$)
    .build() {
}

class DeleteBucketMetricsConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketMetricsConfiguration", {})
    .n("S3Client", "DeleteBucketMetricsConfigurationCommand")
    .sc(DeleteBucketMetricsConfiguration$)
    .build() {
}

class DeleteBucketOwnershipControlsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketOwnershipControls", {})
    .n("S3Client", "DeleteBucketOwnershipControlsCommand")
    .sc(DeleteBucketOwnershipControls$)
    .build() {
}

class DeleteBucketPolicyCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketPolicy", {})
    .n("S3Client", "DeleteBucketPolicyCommand")
    .sc(DeleteBucketPolicy$)
    .build() {
}

class DeleteBucketReplicationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketReplication", {})
    .n("S3Client", "DeleteBucketReplicationCommand")
    .sc(DeleteBucketReplication$)
    .build() {
}

class DeleteBucketTaggingCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketTagging", {})
    .n("S3Client", "DeleteBucketTaggingCommand")
    .sc(DeleteBucketTagging$)
    .build() {
}

class DeleteBucketWebsiteCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketWebsite", {})
    .n("S3Client", "DeleteBucketWebsiteCommand")
    .sc(DeleteBucketWebsite$)
    .build() {
}

class DeleteObjectAnnotationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "DeleteObjectAnnotation", {})
    .n("S3Client", "DeleteObjectAnnotationCommand")
    .sc(DeleteObjectAnnotation$)
    .build() {
}

class DeleteObjectCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "DeleteObject", {})
    .n("S3Client", "DeleteObjectCommand")
    .sc(DeleteObject$)
    .build() {
}

class DeleteObjectsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "DeleteObjects", {})
    .n("S3Client", "DeleteObjectsCommand")
    .sc(DeleteObjects$)
    .build() {
}

class DeleteObjectTaggingCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "DeleteObjectTagging", {})
    .n("S3Client", "DeleteObjectTaggingCommand")
    .sc(DeleteObjectTagging$)
    .build() {
}

class DeletePublicAccessBlockCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeletePublicAccessBlock", {})
    .n("S3Client", "DeletePublicAccessBlockCommand")
    .sc(DeletePublicAccessBlock$)
    .build() {
}

class GetBucketAbacCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketAbac", {})
    .n("S3Client", "GetBucketAbacCommand")
    .sc(GetBucketAbac$)
    .build() {
}

class GetBucketAccelerateConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketAccelerateConfiguration", {})
    .n("S3Client", "GetBucketAccelerateConfigurationCommand")
    .sc(GetBucketAccelerateConfiguration$)
    .build() {
}

class GetBucketAclCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketAcl", {})
    .n("S3Client", "GetBucketAclCommand")
    .sc(GetBucketAcl$)
    .build() {
}

class GetBucketAnalyticsConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketAnalyticsConfiguration", {})
    .n("S3Client", "GetBucketAnalyticsConfigurationCommand")
    .sc(GetBucketAnalyticsConfiguration$)
    .build() {
}

class GetBucketCorsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketCors", {})
    .n("S3Client", "GetBucketCorsCommand")
    .sc(GetBucketCors$)
    .build() {
}

class GetBucketEncryptionCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketEncryption", {})
    .n("S3Client", "GetBucketEncryptionCommand")
    .sc(GetBucketEncryption$)
    .build() {
}

class GetBucketIntelligentTieringConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketIntelligentTieringConfiguration", {})
    .n("S3Client", "GetBucketIntelligentTieringConfigurationCommand")
    .sc(GetBucketIntelligentTieringConfiguration$)
    .build() {
}

class GetBucketInventoryConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketInventoryConfiguration", {})
    .n("S3Client", "GetBucketInventoryConfigurationCommand")
    .sc(GetBucketInventoryConfiguration$)
    .build() {
}

class GetBucketLifecycleConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketLifecycleConfiguration", {})
    .n("S3Client", "GetBucketLifecycleConfigurationCommand")
    .sc(GetBucketLifecycleConfiguration$)
    .build() {
}

class GetBucketLocationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketLocation", {})
    .n("S3Client", "GetBucketLocationCommand")
    .sc(GetBucketLocation$)
    .build() {
}

class GetBucketLoggingCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketLogging", {})
    .n("S3Client", "GetBucketLoggingCommand")
    .sc(GetBucketLogging$)
    .build() {
}

class GetBucketMetadataConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketMetadataConfiguration", {})
    .n("S3Client", "GetBucketMetadataConfigurationCommand")
    .sc(GetBucketMetadataConfiguration$)
    .build() {
}

class GetBucketMetadataTableConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketMetadataTableConfiguration", {})
    .n("S3Client", "GetBucketMetadataTableConfigurationCommand")
    .sc(GetBucketMetadataTableConfiguration$)
    .build() {
}

class GetBucketMetricsConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketMetricsConfiguration", {})
    .n("S3Client", "GetBucketMetricsConfigurationCommand")
    .sc(GetBucketMetricsConfiguration$)
    .build() {
}

class GetBucketNotificationConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketNotificationConfiguration", {})
    .n("S3Client", "GetBucketNotificationConfigurationCommand")
    .sc(GetBucketNotificationConfiguration$)
    .build() {
}

class GetBucketOwnershipControlsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketOwnershipControls", {})
    .n("S3Client", "GetBucketOwnershipControlsCommand")
    .sc(GetBucketOwnershipControls$)
    .build() {
}

class GetBucketPolicyCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "GetBucketPolicy", {})
    .n("S3Client", "GetBucketPolicyCommand")
    .sc(GetBucketPolicy$)
    .build() {
}

class GetBucketPolicyStatusCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketPolicyStatus", {})
    .n("S3Client", "GetBucketPolicyStatusCommand")
    .sc(GetBucketPolicyStatus$)
    .build() {
}

class GetBucketReplicationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketReplication", {})
    .n("S3Client", "GetBucketReplicationCommand")
    .sc(GetBucketReplication$)
    .build() {
}

class GetBucketRequestPaymentCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketRequestPayment", {})
    .n("S3Client", "GetBucketRequestPaymentCommand")
    .sc(GetBucketRequestPayment$)
    .build() {
}

class GetBucketTaggingCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketTagging", {})
    .n("S3Client", "GetBucketTaggingCommand")
    .sc(GetBucketTagging$)
    .build() {
}

class GetBucketVersioningCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketVersioning", {})
    .n("S3Client", "GetBucketVersioningCommand")
    .sc(GetBucketVersioning$)
    .build() {
}

class GetBucketWebsiteCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetBucketWebsite", {})
    .n("S3Client", "GetBucketWebsiteCommand")
    .sc(GetBucketWebsite$)
    .build() {
}

class GetObjectAclCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetObjectAcl", {})
    .n("S3Client", "GetObjectAclCommand")
    .sc(GetObjectAcl$)
    .build() {
}

class GetObjectAnnotationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestChecksumRequired: false,
            requestValidationModeMember: 'ChecksumMode',
            'responseAlgorithms': ['CRC64NVME', 'CRC32', 'CRC32C', 'SHA256', 'SHA1', 'SHA512', 'MD5', 'XXHASH64', 'XXHASH3', 'XXHASH128'],
        }),
    ];
})
    .s("AmazonS3", "GetObjectAnnotation", {})
    .n("S3Client", "GetObjectAnnotationCommand")
    .sc(GetObjectAnnotation$)
    .build() {
}

class GetObjectAttributesCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
        getSsecPlugin(config),
    ];
})
    .s("AmazonS3", "GetObjectAttributes", {})
    .n("S3Client", "GetObjectAttributesCommand")
    .sc(GetObjectAttributes$)
    .build() {
}

class GetObjectCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestChecksumRequired: false,
            requestValidationModeMember: 'ChecksumMode',
            'responseAlgorithms': ['CRC64NVME', 'CRC32', 'CRC32C', 'SHA256', 'SHA1', 'SHA512', 'MD5', 'XXHASH64', 'XXHASH3', 'XXHASH128'],
        }),
        getSsecPlugin(config),
        getS3ExpiresMiddlewarePlugin(config),
    ];
})
    .s("AmazonS3", "GetObject", {})
    .n("S3Client", "GetObjectCommand")
    .sc(GetObject$)
    .build() {
}

class GetObjectLegalHoldCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetObjectLegalHold", {})
    .n("S3Client", "GetObjectLegalHoldCommand")
    .sc(GetObjectLegalHold$)
    .build() {
}

class GetObjectLockConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetObjectLockConfiguration", {})
    .n("S3Client", "GetObjectLockConfigurationCommand")
    .sc(GetObjectLockConfiguration$)
    .build() {
}

class GetObjectRetentionCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetObjectRetention", {})
    .n("S3Client", "GetObjectRetentionCommand")
    .sc(GetObjectRetention$)
    .build() {
}

class GetObjectTaggingCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetObjectTagging", {})
    .n("S3Client", "GetObjectTaggingCommand")
    .sc(GetObjectTagging$)
    .build() {
}

class GetObjectTorrentCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "GetObjectTorrent", {})
    .n("S3Client", "GetObjectTorrentCommand")
    .sc(GetObjectTorrent$)
    .build() {
}

class GetPublicAccessBlockCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "GetPublicAccessBlock", {})
    .n("S3Client", "GetPublicAccessBlockCommand")
    .sc(GetPublicAccessBlock$)
    .build() {
}

class HeadBucketCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "HeadBucket", {})
    .n("S3Client", "HeadBucketCommand")
    .sc(HeadBucket$)
    .build() {
}

class HeadObjectCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
        getSsecPlugin(config),
        getS3ExpiresMiddlewarePlugin(config),
    ];
})
    .s("AmazonS3", "HeadObject", {})
    .n("S3Client", "HeadObjectCommand")
    .sc(HeadObject$)
    .build() {
}

class ListBucketAnalyticsConfigurationsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListBucketAnalyticsConfigurations", {})
    .n("S3Client", "ListBucketAnalyticsConfigurationsCommand")
    .sc(ListBucketAnalyticsConfigurations$)
    .build() {
}

class ListBucketIntelligentTieringConfigurationsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListBucketIntelligentTieringConfigurations", {})
    .n("S3Client", "ListBucketIntelligentTieringConfigurationsCommand")
    .sc(ListBucketIntelligentTieringConfigurations$)
    .build() {
}

class ListBucketInventoryConfigurationsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListBucketInventoryConfigurations", {})
    .n("S3Client", "ListBucketInventoryConfigurationsCommand")
    .sc(ListBucketInventoryConfigurations$)
    .build() {
}

class ListBucketMetricsConfigurationsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListBucketMetricsConfigurations", {})
    .n("S3Client", "ListBucketMetricsConfigurationsCommand")
    .sc(ListBucketMetricsConfigurations$)
    .build() {
}

class ListBucketsCommand extends Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListBuckets", {})
    .n("S3Client", "ListBucketsCommand")
    .sc(ListBuckets$)
    .build() {
}

class ListDirectoryBucketsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListDirectoryBuckets", {})
    .n("S3Client", "ListDirectoryBucketsCommand")
    .sc(ListDirectoryBuckets$)
    .build() {
}

class ListMultipartUploadsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Prefix: { type: "contextParams", name: "Prefix" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListMultipartUploads", {})
    .n("S3Client", "ListMultipartUploadsCommand")
    .sc(ListMultipartUploads$)
    .build() {
}

class ListObjectAnnotationsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListObjectAnnotations", {})
    .n("S3Client", "ListObjectAnnotationsCommand")
    .sc(ListObjectAnnotations$)
    .build() {
}

class ListObjectsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Prefix: { type: "contextParams", name: "Prefix" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListObjects", {})
    .n("S3Client", "ListObjectsCommand")
    .sc(ListObjects$)
    .build() {
}

class ListObjectsV2Command extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Prefix: { type: "contextParams", name: "Prefix" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListObjectsV2", {})
    .n("S3Client", "ListObjectsV2Command")
    .sc(ListObjectsV2$)
    .build() {
}

class ListObjectVersionsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Prefix: { type: "contextParams", name: "Prefix" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListObjectVersions", {})
    .n("S3Client", "ListObjectVersionsCommand")
    .sc(ListObjectVersions$)
    .build() {
}

class ListPartsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
        getSsecPlugin(config),
    ];
})
    .s("AmazonS3", "ListParts", {})
    .n("S3Client", "ListPartsCommand")
    .sc(ListParts$)
    .build() {
}

class PutBucketAbacCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: false,
        }),
    ];
})
    .s("AmazonS3", "PutBucketAbac", {})
    .n("S3Client", "PutBucketAbacCommand")
    .sc(PutBucketAbac$)
    .build() {
}

class PutBucketAccelerateConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: false,
        }),
    ];
})
    .s("AmazonS3", "PutBucketAccelerateConfiguration", {})
    .n("S3Client", "PutBucketAccelerateConfigurationCommand")
    .sc(PutBucketAccelerateConfiguration$)
    .build() {
}

class PutBucketAclCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketAcl", {})
    .n("S3Client", "PutBucketAclCommand")
    .sc(PutBucketAcl$)
    .build() {
}

class PutBucketAnalyticsConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "PutBucketAnalyticsConfiguration", {})
    .n("S3Client", "PutBucketAnalyticsConfigurationCommand")
    .sc(PutBucketAnalyticsConfiguration$)
    .build() {
}

class PutBucketCorsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketCors", {})
    .n("S3Client", "PutBucketCorsCommand")
    .sc(PutBucketCors$)
    .build() {
}

class PutBucketEncryptionCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketEncryption", {})
    .n("S3Client", "PutBucketEncryptionCommand")
    .sc(PutBucketEncryption$)
    .build() {
}

class PutBucketIntelligentTieringConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "PutBucketIntelligentTieringConfiguration", {})
    .n("S3Client", "PutBucketIntelligentTieringConfigurationCommand")
    .sc(PutBucketIntelligentTieringConfiguration$)
    .build() {
}

class PutBucketInventoryConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "PutBucketInventoryConfiguration", {})
    .n("S3Client", "PutBucketInventoryConfigurationCommand")
    .sc(PutBucketInventoryConfiguration$)
    .build() {
}

class PutBucketLifecycleConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "PutBucketLifecycleConfiguration", {})
    .n("S3Client", "PutBucketLifecycleConfigurationCommand")
    .sc(PutBucketLifecycleConfiguration$)
    .build() {
}

class PutBucketLoggingCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketLogging", {})
    .n("S3Client", "PutBucketLoggingCommand")
    .sc(PutBucketLogging$)
    .build() {
}

class PutBucketMetricsConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "PutBucketMetricsConfiguration", {})
    .n("S3Client", "PutBucketMetricsConfigurationCommand")
    .sc(PutBucketMetricsConfiguration$)
    .build() {
}

class PutBucketNotificationConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "PutBucketNotificationConfiguration", {})
    .n("S3Client", "PutBucketNotificationConfigurationCommand")
    .sc(PutBucketNotificationConfiguration$)
    .build() {
}

class PutBucketOwnershipControlsCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketOwnershipControls", {})
    .n("S3Client", "PutBucketOwnershipControlsCommand")
    .sc(PutBucketOwnershipControls$)
    .build() {
}

class PutBucketPolicyCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketPolicy", {})
    .n("S3Client", "PutBucketPolicyCommand")
    .sc(PutBucketPolicy$)
    .build() {
}

class PutBucketReplicationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketReplication", {})
    .n("S3Client", "PutBucketReplicationCommand")
    .sc(PutBucketReplication$)
    .build() {
}

class PutBucketRequestPaymentCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketRequestPayment", {})
    .n("S3Client", "PutBucketRequestPaymentCommand")
    .sc(PutBucketRequestPayment$)
    .build() {
}

class PutBucketTaggingCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketTagging", {})
    .n("S3Client", "PutBucketTaggingCommand")
    .sc(PutBucketTagging$)
    .build() {
}

class PutBucketVersioningCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketVersioning", {})
    .n("S3Client", "PutBucketVersioningCommand")
    .sc(PutBucketVersioning$)
    .build() {
}

class PutBucketWebsiteCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutBucketWebsite", {})
    .n("S3Client", "PutBucketWebsiteCommand")
    .sc(PutBucketWebsite$)
    .build() {
}

class PutObjectAclCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "PutObjectAcl", {})
    .n("S3Client", "PutObjectAclCommand")
    .sc(PutObjectAcl$)
    .build() {
}

class PutObjectAnnotationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: false,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "PutObjectAnnotation", {})
    .n("S3Client", "PutObjectAnnotationCommand")
    .sc(PutObjectAnnotation$)
    .build() {
}

class PutObjectCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: false,
        }),
        getCheckContentLengthHeaderPlugin(config),
        getThrow200ExceptionsPlugin(config),
        getSsecPlugin(config),
    ];
})
    .s("AmazonS3", "PutObject", {})
    .n("S3Client", "PutObjectCommand")
    .sc(PutObject$)
    .build() {
}

class PutObjectLegalHoldCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "PutObjectLegalHold", {})
    .n("S3Client", "PutObjectLegalHoldCommand")
    .sc(PutObjectLegalHold$)
    .build() {
}

class PutObjectLockConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "PutObjectLockConfiguration", {})
    .n("S3Client", "PutObjectLockConfigurationCommand")
    .sc(PutObjectLockConfiguration$)
    .build() {
}

class PutObjectRetentionCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "PutObjectRetention", {})
    .n("S3Client", "PutObjectRetentionCommand")
    .sc(PutObjectRetention$)
    .build() {
}

class PutObjectTaggingCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "PutObjectTagging", {})
    .n("S3Client", "PutObjectTaggingCommand")
    .sc(PutObjectTagging$)
    .build() {
}

class PutPublicAccessBlockCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "PutPublicAccessBlock", {})
    .n("S3Client", "PutPublicAccessBlockCommand")
    .sc(PutPublicAccessBlock$)
    .build() {
}

class RenameObjectCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "RenameObject", {})
    .n("S3Client", "RenameObjectCommand")
    .sc(RenameObject$)
    .build() {
}

class RestoreObjectCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: false,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "RestoreObject", {})
    .n("S3Client", "RestoreObjectCommand")
    .sc(RestoreObject$)
    .build() {
}

class SelectObjectContentCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getSsecPlugin(config),
    ];
})
    .s("AmazonS3", "SelectObjectContent", {
    eventStream: {
        output: true,
    },
})
    .n("S3Client", "SelectObjectContentCommand")
    .sc(SelectObjectContent$)
    .build() {
}

class UpdateBucketMetadataAnnotationTableConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "UpdateBucketMetadataAnnotationTableConfiguration", {})
    .n("S3Client", "UpdateBucketMetadataAnnotationTableConfigurationCommand")
    .sc(UpdateBucketMetadataAnnotationTableConfiguration$)
    .build() {
}

class UpdateBucketMetadataInventoryTableConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "UpdateBucketMetadataInventoryTableConfiguration", {})
    .n("S3Client", "UpdateBucketMetadataInventoryTableConfigurationCommand")
    .sc(UpdateBucketMetadataInventoryTableConfiguration$)
    .build() {
}

class UpdateBucketMetadataJournalTableConfigurationCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "UpdateBucketMetadataJournalTableConfiguration", {})
    .n("S3Client", "UpdateBucketMetadataJournalTableConfigurationCommand")
    .sc(UpdateBucketMetadataJournalTableConfiguration$)
    .build() {
}

class UpdateObjectEncryptionCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "UpdateObjectEncryption", {})
    .n("S3Client", "UpdateObjectEncryptionCommand")
    .sc(UpdateObjectEncryption$)
    .build() {
}

class UploadPartCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: false,
        }),
        getThrow200ExceptionsPlugin(config),
        getSsecPlugin(config),
    ];
})
    .s("AmazonS3", "UploadPart", {})
    .n("S3Client", "UploadPartCommand")
    .sc(UploadPart$)
    .build() {
}

class UploadPartCopyCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    DisableS3ExpressSessionAuth: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
        getSsecPlugin(config),
    ];
})
    .s("AmazonS3", "UploadPartCopy", {})
    .n("S3Client", "UploadPartCopyCommand")
    .sc(UploadPartCopy$)
    .build() {
}

class WriteGetObjectResponseCommand extends Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseObjectLambdaEndpoint: { type: "staticContextParams", value: true },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "WriteGetObjectResponse", {})
    .n("S3Client", "WriteGetObjectResponseCommand")
    .sc(WriteGetObjectResponse$)
    .build() {
}

const paginateListBuckets = createPaginator(S3Client, ListBucketsCommand, "ContinuationToken", "ContinuationToken", "MaxBuckets");

const paginateListDirectoryBuckets = createPaginator(S3Client, ListDirectoryBucketsCommand, "ContinuationToken", "ContinuationToken", "MaxDirectoryBuckets");

const paginateListObjectAnnotations = createPaginator(S3Client, ListObjectAnnotationsCommand, "ContinuationToken", "NextContinuationToken", "MaxAnnotationResults");

const paginateListObjectsV2 = createPaginator(S3Client, ListObjectsV2Command, "ContinuationToken", "NextContinuationToken", "MaxKeys");

const paginateListParts = createPaginator(S3Client, ListPartsCommand, "PartNumberMarker", "NextPartNumberMarker", "MaxParts");

const checkState$3 = async (client, input) => {
    let reason;
    try {
        let result = await client.send(new HeadBucketCommand(input));
        reason = result;
        return { state: WaiterState.SUCCESS, reason };
    }
    catch (exception) {
        reason = exception;
        if (exception.name === "NotFound") {
            return { state: WaiterState.RETRY, reason };
        }
    }
    return { state: WaiterState.RETRY, reason };
};
const waitForBucketExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    return createWaiter({ ...serviceDefaults, ...params }, input, checkState$3);
};
const waitUntilBucketExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState$3);
    return checkExceptions(result);
};

const checkState$2 = async (client, input) => {
    let reason;
    try {
        let result = await client.send(new HeadBucketCommand(input));
        reason = result;
    }
    catch (exception) {
        reason = exception;
        if (exception.name === "NotFound") {
            return { state: WaiterState.SUCCESS, reason };
        }
    }
    return { state: WaiterState.RETRY, reason };
};
const waitForBucketNotExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    return createWaiter({ ...serviceDefaults, ...params }, input, checkState$2);
};
const waitUntilBucketNotExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState$2);
    return checkExceptions(result);
};

const checkState$1 = async (client, input) => {
    let reason;
    try {
        let result = await client.send(new HeadObjectCommand(input));
        reason = result;
        return { state: WaiterState.SUCCESS, reason };
    }
    catch (exception) {
        reason = exception;
        if (exception.name === "NotFound") {
            return { state: WaiterState.RETRY, reason };
        }
    }
    return { state: WaiterState.RETRY, reason };
};
const waitForObjectExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    return createWaiter({ ...serviceDefaults, ...params }, input, checkState$1);
};
const waitUntilObjectExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState$1);
    return checkExceptions(result);
};

const checkState = async (client, input) => {
    let reason;
    try {
        let result = await client.send(new HeadObjectCommand(input));
        reason = result;
    }
    catch (exception) {
        reason = exception;
        if (exception.name === "NotFound") {
            return { state: WaiterState.SUCCESS, reason };
        }
    }
    return { state: WaiterState.RETRY, reason };
};
const waitForObjectNotExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
const waitUntilObjectNotExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
    return checkExceptions(result);
};

const commands = {
    AbortMultipartUploadCommand,
    CompleteMultipartUploadCommand,
    CopyObjectCommand,
    CreateBucketCommand,
    CreateBucketMetadataConfigurationCommand,
    CreateBucketMetadataTableConfigurationCommand,
    CreateMultipartUploadCommand,
    CreateSessionCommand,
    DeleteBucketCommand,
    DeleteBucketAnalyticsConfigurationCommand,
    DeleteBucketCorsCommand,
    DeleteBucketEncryptionCommand,
    DeleteBucketIntelligentTieringConfigurationCommand,
    DeleteBucketInventoryConfigurationCommand,
    DeleteBucketLifecycleCommand,
    DeleteBucketMetadataConfigurationCommand,
    DeleteBucketMetadataTableConfigurationCommand,
    DeleteBucketMetricsConfigurationCommand,
    DeleteBucketOwnershipControlsCommand,
    DeleteBucketPolicyCommand,
    DeleteBucketReplicationCommand,
    DeleteBucketTaggingCommand,
    DeleteBucketWebsiteCommand,
    DeleteObjectCommand,
    DeleteObjectAnnotationCommand,
    DeleteObjectsCommand,
    DeleteObjectTaggingCommand,
    DeletePublicAccessBlockCommand,
    GetBucketAbacCommand,
    GetBucketAccelerateConfigurationCommand,
    GetBucketAclCommand,
    GetBucketAnalyticsConfigurationCommand,
    GetBucketCorsCommand,
    GetBucketEncryptionCommand,
    GetBucketIntelligentTieringConfigurationCommand,
    GetBucketInventoryConfigurationCommand,
    GetBucketLifecycleConfigurationCommand,
    GetBucketLocationCommand,
    GetBucketLoggingCommand,
    GetBucketMetadataConfigurationCommand,
    GetBucketMetadataTableConfigurationCommand,
    GetBucketMetricsConfigurationCommand,
    GetBucketNotificationConfigurationCommand,
    GetBucketOwnershipControlsCommand,
    GetBucketPolicyCommand,
    GetBucketPolicyStatusCommand,
    GetBucketReplicationCommand,
    GetBucketRequestPaymentCommand,
    GetBucketTaggingCommand,
    GetBucketVersioningCommand,
    GetBucketWebsiteCommand,
    GetObjectCommand,
    GetObjectAclCommand,
    GetObjectAnnotationCommand,
    GetObjectAttributesCommand,
    GetObjectLegalHoldCommand,
    GetObjectLockConfigurationCommand,
    GetObjectRetentionCommand,
    GetObjectTaggingCommand,
    GetObjectTorrentCommand,
    GetPublicAccessBlockCommand,
    HeadBucketCommand,
    HeadObjectCommand,
    ListBucketAnalyticsConfigurationsCommand,
    ListBucketIntelligentTieringConfigurationsCommand,
    ListBucketInventoryConfigurationsCommand,
    ListBucketMetricsConfigurationsCommand,
    ListBucketsCommand,
    ListDirectoryBucketsCommand,
    ListMultipartUploadsCommand,
    ListObjectAnnotationsCommand,
    ListObjectsCommand,
    ListObjectsV2Command,
    ListObjectVersionsCommand,
    ListPartsCommand,
    PutBucketAbacCommand,
    PutBucketAccelerateConfigurationCommand,
    PutBucketAclCommand,
    PutBucketAnalyticsConfigurationCommand,
    PutBucketCorsCommand,
    PutBucketEncryptionCommand,
    PutBucketIntelligentTieringConfigurationCommand,
    PutBucketInventoryConfigurationCommand,
    PutBucketLifecycleConfigurationCommand,
    PutBucketLoggingCommand,
    PutBucketMetricsConfigurationCommand,
    PutBucketNotificationConfigurationCommand,
    PutBucketOwnershipControlsCommand,
    PutBucketPolicyCommand,
    PutBucketReplicationCommand,
    PutBucketRequestPaymentCommand,
    PutBucketTaggingCommand,
    PutBucketVersioningCommand,
    PutBucketWebsiteCommand,
    PutObjectCommand,
    PutObjectAclCommand,
    PutObjectAnnotationCommand,
    PutObjectLegalHoldCommand,
    PutObjectLockConfigurationCommand,
    PutObjectRetentionCommand,
    PutObjectTaggingCommand,
    PutPublicAccessBlockCommand,
    RenameObjectCommand,
    RestoreObjectCommand,
    SelectObjectContentCommand,
    UpdateBucketMetadataAnnotationTableConfigurationCommand,
    UpdateBucketMetadataInventoryTableConfigurationCommand,
    UpdateBucketMetadataJournalTableConfigurationCommand,
    UpdateObjectEncryptionCommand,
    UploadPartCommand,
    UploadPartCopyCommand,
    WriteGetObjectResponseCommand,
};
const paginators = {
    paginateListBuckets,
    paginateListDirectoryBuckets,
    paginateListObjectAnnotations,
    paginateListObjectsV2,
    paginateListParts,
};
const waiters = {
    waitUntilBucketExists,
    waitUntilBucketNotExists,
    waitUntilObjectExists,
    waitUntilObjectNotExists,
};
class S3 extends S3Client {
}
createAggregatedClient(commands, S3, { paginators, waiters });

const BucketAbacStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const RequestCharged = {
    requester: "requester",
};
const RequestPayer = {
    requester: "requester",
};
const BucketAccelerateStatus = {
    Enabled: "Enabled",
    Suspended: "Suspended",
};
const Type = {
    AmazonCustomerByEmail: "AmazonCustomerByEmail",
    CanonicalUser: "CanonicalUser",
    Group: "Group",
};
const Permission = {
    FULL_CONTROL: "FULL_CONTROL",
    READ: "READ",
    READ_ACP: "READ_ACP",
    WRITE: "WRITE",
    WRITE_ACP: "WRITE_ACP",
};
const OwnerOverride = {
    Destination: "Destination",
};
const ChecksumType = {
    COMPOSITE: "COMPOSITE",
    FULL_OBJECT: "FULL_OBJECT",
};
const ServerSideEncryption = {
    AES256: "AES256",
    aws_fsx: "aws:fsx",
    aws_kms: "aws:kms",
    aws_kms_dsse: "aws:kms:dsse",
};
const ObjectCannedACL = {
    authenticated_read: "authenticated-read",
    aws_exec_read: "aws-exec-read",
    bucket_owner_full_control: "bucket-owner-full-control",
    bucket_owner_read: "bucket-owner-read",
    private: "private",
    public_read: "public-read",
    public_read_write: "public-read-write",
};
const AnnotationDirective = {
    COPY: "COPY",
    EXCLUDE: "EXCLUDE",
};
const ChecksumAlgorithm = {
    CRC32: "CRC32",
    CRC32C: "CRC32C",
    CRC64NVME: "CRC64NVME",
    MD5: "MD5",
    SHA1: "SHA1",
    SHA256: "SHA256",
    SHA512: "SHA512",
    XXHASH128: "XXHASH128",
    XXHASH3: "XXHASH3",
    XXHASH64: "XXHASH64",
};
const MetadataDirective = {
    COPY: "COPY",
    REPLACE: "REPLACE",
};
const ObjectLockLegalHoldStatus = {
    OFF: "OFF",
    ON: "ON",
};
const ObjectLockMode = {
    COMPLIANCE: "COMPLIANCE",
    GOVERNANCE: "GOVERNANCE",
};
const StorageClass = {
    DEEP_ARCHIVE: "DEEP_ARCHIVE",
    EXPRESS_ONEZONE: "EXPRESS_ONEZONE",
    FSX_ONTAP: "FSX_ONTAP",
    FSX_OPENZFS: "FSX_OPENZFS",
    GLACIER: "GLACIER",
    GLACIER_IR: "GLACIER_IR",
    INTELLIGENT_TIERING: "INTELLIGENT_TIERING",
    ONEZONE_IA: "ONEZONE_IA",
    OUTPOSTS: "OUTPOSTS",
    REDUCED_REDUNDANCY: "REDUCED_REDUNDANCY",
    SNOW: "SNOW",
    STANDARD: "STANDARD",
    STANDARD_IA: "STANDARD_IA",
};
const TaggingDirective = {
    COPY: "COPY",
    REPLACE: "REPLACE",
};
const BucketCannedACL = {
    authenticated_read: "authenticated-read",
    private: "private",
    public_read: "public-read",
    public_read_write: "public-read-write",
};
const BucketNamespace = {
    ACCOUNT_REGIONAL: "account-regional",
    GLOBAL: "global",
};
const DataRedundancy = {
    SingleAvailabilityZone: "SingleAvailabilityZone",
    SingleLocalZone: "SingleLocalZone",
};
const BucketType = {
    Directory: "Directory",
};
const LocationType = {
    AvailabilityZone: "AvailabilityZone",
    LocalZone: "LocalZone",
};
const BucketLocationConstraint = {
    EU: "EU",
    af_south_1: "af-south-1",
    ap_east_1: "ap-east-1",
    ap_east_2: "ap-east-2",
    ap_northeast_1: "ap-northeast-1",
    ap_northeast_2: "ap-northeast-2",
    ap_northeast_3: "ap-northeast-3",
    ap_south_1: "ap-south-1",
    ap_south_2: "ap-south-2",
    ap_southeast_1: "ap-southeast-1",
    ap_southeast_2: "ap-southeast-2",
    ap_southeast_3: "ap-southeast-3",
    ap_southeast_4: "ap-southeast-4",
    ap_southeast_5: "ap-southeast-5",
    ap_southeast_6: "ap-southeast-6",
    ap_southeast_7: "ap-southeast-7",
    ca_central_1: "ca-central-1",
    ca_west_1: "ca-west-1",
    cn_north_1: "cn-north-1",
    cn_northwest_1: "cn-northwest-1",
    eu_central_1: "eu-central-1",
    eu_central_2: "eu-central-2",
    eu_north_1: "eu-north-1",
    eu_south_1: "eu-south-1",
    eu_south_2: "eu-south-2",
    eu_west_1: "eu-west-1",
    eu_west_2: "eu-west-2",
    eu_west_3: "eu-west-3",
    il_central_1: "il-central-1",
    me_central_1: "me-central-1",
    me_south_1: "me-south-1",
    mx_central_1: "mx-central-1",
    sa_east_1: "sa-east-1",
    us_east_2: "us-east-2",
    us_gov_east_1: "us-gov-east-1",
    us_gov_west_1: "us-gov-west-1",
    us_west_1: "us-west-1",
    us_west_2: "us-west-2",
};
const ObjectOwnership = {
    BucketOwnerEnforced: "BucketOwnerEnforced",
    BucketOwnerPreferred: "BucketOwnerPreferred",
    ObjectWriter: "ObjectWriter",
};
const AnnotationConfigurationState = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
};
const TableSseAlgorithm = {
    AES256: "AES256",
    aws_kms: "aws:kms",
};
const InventoryConfigurationState = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
};
const ExpirationState = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
};
const SessionMode = {
    ReadOnly: "ReadOnly",
    ReadWrite: "ReadWrite",
};
const AnalyticsS3ExportFileFormat = {
    CSV: "CSV",
};
const StorageClassAnalysisSchemaVersion = {
    V_1: "V_1",
};
const EncryptionType = {
    NONE: "NONE",
    SSE_C: "SSE-C",
};
const IntelligentTieringStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const IntelligentTieringAccessTier = {
    ARCHIVE_ACCESS: "ARCHIVE_ACCESS",
    DEEP_ARCHIVE_ACCESS: "DEEP_ARCHIVE_ACCESS",
};
const InventoryFormat = {
    CSV: "CSV",
    ORC: "ORC",
    Parquet: "Parquet",
};
const InventoryIncludedObjectVersions = {
    All: "All",
    Current: "Current",
};
const InventoryOptionalField = {
    BucketKeyStatus: "BucketKeyStatus",
    ChecksumAlgorithm: "ChecksumAlgorithm",
    ETag: "ETag",
    EncryptionStatus: "EncryptionStatus",
    IntelligentTieringAccessTier: "IntelligentTieringAccessTier",
    IsMultipartUploaded: "IsMultipartUploaded",
    LastModifiedDate: "LastModifiedDate",
    LifecycleExpirationDate: "LifecycleExpirationDate",
    ObjectAccessControlList: "ObjectAccessControlList",
    ObjectLockLegalHoldStatus: "ObjectLockLegalHoldStatus",
    ObjectLockMode: "ObjectLockMode",
    ObjectLockRetainUntilDate: "ObjectLockRetainUntilDate",
    ObjectOwner: "ObjectOwner",
    ReplicationStatus: "ReplicationStatus",
    Size: "Size",
    StorageClass: "StorageClass",
};
const InventoryFrequency = {
    Daily: "Daily",
    Weekly: "Weekly",
};
const TransitionStorageClass = {
    DEEP_ARCHIVE: "DEEP_ARCHIVE",
    GLACIER: "GLACIER",
    GLACIER_IR: "GLACIER_IR",
    INTELLIGENT_TIERING: "INTELLIGENT_TIERING",
    ONEZONE_IA: "ONEZONE_IA",
    STANDARD_IA: "STANDARD_IA",
};
const ExpirationStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const TransitionDefaultMinimumObjectSize = {
    all_storage_classes_128K: "all_storage_classes_128K",
    varies_by_storage_class: "varies_by_storage_class",
};
const BucketLogsPermission = {
    FULL_CONTROL: "FULL_CONTROL",
    READ: "READ",
    WRITE: "WRITE",
};
const PartitionDateSource = {
    DeliveryTime: "DeliveryTime",
    EventTime: "EventTime",
};
const S3TablesBucketType = {
    aws: "aws",
    customer: "customer",
};
const Event = {
    s3_IntelligentTiering: "s3:IntelligentTiering",
    s3_LifecycleExpiration_: "s3:LifecycleExpiration:*",
    s3_LifecycleExpiration_Delete: "s3:LifecycleExpiration:Delete",
    s3_LifecycleExpiration_DeleteMarkerCreated: "s3:LifecycleExpiration:DeleteMarkerCreated",
    s3_LifecycleTransition: "s3:LifecycleTransition",
    s3_ObjectAcl_Put: "s3:ObjectAcl:Put",
    s3_ObjectAnnotation_: "s3:ObjectAnnotation:*",
    s3_ObjectAnnotation_Delete: "s3:ObjectAnnotation:Delete",
    s3_ObjectAnnotation_Put: "s3:ObjectAnnotation:Put",
    s3_ObjectCreated_: "s3:ObjectCreated:*",
    s3_ObjectCreated_CompleteMultipartUpload: "s3:ObjectCreated:CompleteMultipartUpload",
    s3_ObjectCreated_Copy: "s3:ObjectCreated:Copy",
    s3_ObjectCreated_Post: "s3:ObjectCreated:Post",
    s3_ObjectCreated_Put: "s3:ObjectCreated:Put",
    s3_ObjectRemoved_: "s3:ObjectRemoved:*",
    s3_ObjectRemoved_Delete: "s3:ObjectRemoved:Delete",
    s3_ObjectRemoved_DeleteMarkerCreated: "s3:ObjectRemoved:DeleteMarkerCreated",
    s3_ObjectRestore_: "s3:ObjectRestore:*",
    s3_ObjectRestore_Completed: "s3:ObjectRestore:Completed",
    s3_ObjectRestore_Delete: "s3:ObjectRestore:Delete",
    s3_ObjectRestore_Post: "s3:ObjectRestore:Post",
    s3_ObjectTagging_: "s3:ObjectTagging:*",
    s3_ObjectTagging_Delete: "s3:ObjectTagging:Delete",
    s3_ObjectTagging_Put: "s3:ObjectTagging:Put",
    s3_ReducedRedundancyLostObject: "s3:ReducedRedundancyLostObject",
    s3_Replication_: "s3:Replication:*",
    s3_Replication_OperationFailedReplication: "s3:Replication:OperationFailedReplication",
    s3_Replication_OperationMissedThreshold: "s3:Replication:OperationMissedThreshold",
    s3_Replication_OperationNotTracked: "s3:Replication:OperationNotTracked",
    s3_Replication_OperationReplicatedAfterThreshold: "s3:Replication:OperationReplicatedAfterThreshold",
};
const FilterRuleName = {
    prefix: "prefix",
    suffix: "suffix",
};
const DeleteMarkerReplicationStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const MetricsStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const ReplicationTimeStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const ExistingObjectReplicationStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const ReplicaModificationsStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const SseKmsEncryptedObjectsStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const ReplicationRuleStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const Payer = {
    BucketOwner: "BucketOwner",
    Requester: "Requester",
};
const MFADeleteStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const BucketVersioningStatus = {
    Enabled: "Enabled",
    Suspended: "Suspended",
};
const Protocol = {
    http: "http",
    https: "https",
};
const ReplicationStatus = {
    COMPLETE: "COMPLETE",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
    PENDING: "PENDING",
    REPLICA: "REPLICA",
};
const ChecksumMode = {
    ENABLED: "ENABLED",
};
const ObjectAttributes = {
    CHECKSUM: "Checksum",
    ETAG: "ETag",
    OBJECT_PARTS: "ObjectParts",
    OBJECT_SIZE: "ObjectSize",
    STORAGE_CLASS: "StorageClass",
};
const ObjectLockEnabled = {
    Enabled: "Enabled",
};
const ObjectLockRetentionMode = {
    COMPLIANCE: "COMPLIANCE",
    GOVERNANCE: "GOVERNANCE",
};
const ArchiveStatus = {
    ARCHIVE_ACCESS: "ARCHIVE_ACCESS",
    DEEP_ARCHIVE_ACCESS: "DEEP_ARCHIVE_ACCESS",
};
const EncodingType = {
    url: "url",
};
const ObjectStorageClass = {
    DEEP_ARCHIVE: "DEEP_ARCHIVE",
    EXPRESS_ONEZONE: "EXPRESS_ONEZONE",
    FSX_ONTAP: "FSX_ONTAP",
    FSX_OPENZFS: "FSX_OPENZFS",
    GLACIER: "GLACIER",
    GLACIER_IR: "GLACIER_IR",
    INTELLIGENT_TIERING: "INTELLIGENT_TIERING",
    ONEZONE_IA: "ONEZONE_IA",
    OUTPOSTS: "OUTPOSTS",
    REDUCED_REDUNDANCY: "REDUCED_REDUNDANCY",
    SNOW: "SNOW",
    STANDARD: "STANDARD",
    STANDARD_IA: "STANDARD_IA",
};
const OptionalObjectAttributes = {
    RESTORE_STATUS: "RestoreStatus",
};
const ObjectVersionStorageClass = {
    STANDARD: "STANDARD",
};
const MFADelete = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
const Tier = {
    Bulk: "Bulk",
    Expedited: "Expedited",
    Standard: "Standard",
};
const ExpressionType = {
    SQL: "SQL",
};
const CompressionType = {
    BZIP2: "BZIP2",
    GZIP: "GZIP",
    NONE: "NONE",
};
const FileHeaderInfo = {
    IGNORE: "IGNORE",
    NONE: "NONE",
    USE: "USE",
};
const JSONType = {
    DOCUMENT: "DOCUMENT",
    LINES: "LINES",
};
const QuoteFields = {
    ALWAYS: "ALWAYS",
    ASNEEDED: "ASNEEDED",
};
const RestoreRequestType = {
    SELECT: "SELECT",
};

exports.AbortMultipartUploadCommand = AbortMultipartUploadCommand;
exports.AnalyticsS3ExportFileFormat = AnalyticsS3ExportFileFormat;
exports.AnnotationConfigurationState = AnnotationConfigurationState;
exports.AnnotationDirective = AnnotationDirective;
exports.ArchiveStatus = ArchiveStatus;
exports.BucketAbacStatus = BucketAbacStatus;
exports.BucketAccelerateStatus = BucketAccelerateStatus;
exports.BucketCannedACL = BucketCannedACL;
exports.BucketLocationConstraint = BucketLocationConstraint;
exports.BucketLogsPermission = BucketLogsPermission;
exports.BucketNamespace = BucketNamespace;
exports.BucketType = BucketType;
exports.BucketVersioningStatus = BucketVersioningStatus;
exports.ChecksumAlgorithm = ChecksumAlgorithm;
exports.ChecksumMode = ChecksumMode;
exports.ChecksumType = ChecksumType;
exports.CompleteMultipartUploadCommand = CompleteMultipartUploadCommand;
exports.CompressionType = CompressionType;
exports.CopyObjectCommand = CopyObjectCommand;
exports.CreateBucketCommand = CreateBucketCommand;
exports.CreateBucketMetadataConfigurationCommand = CreateBucketMetadataConfigurationCommand;
exports.CreateBucketMetadataTableConfigurationCommand = CreateBucketMetadataTableConfigurationCommand;
exports.CreateMultipartUploadCommand = CreateMultipartUploadCommand;
exports.CreateSessionCommand = CreateSessionCommand;
exports.DataRedundancy = DataRedundancy;
exports.DeleteBucketAnalyticsConfigurationCommand = DeleteBucketAnalyticsConfigurationCommand;
exports.DeleteBucketCommand = DeleteBucketCommand;
exports.DeleteBucketCorsCommand = DeleteBucketCorsCommand;
exports.DeleteBucketEncryptionCommand = DeleteBucketEncryptionCommand;
exports.DeleteBucketIntelligentTieringConfigurationCommand = DeleteBucketIntelligentTieringConfigurationCommand;
exports.DeleteBucketInventoryConfigurationCommand = DeleteBucketInventoryConfigurationCommand;
exports.DeleteBucketLifecycleCommand = DeleteBucketLifecycleCommand;
exports.DeleteBucketMetadataConfigurationCommand = DeleteBucketMetadataConfigurationCommand;
exports.DeleteBucketMetadataTableConfigurationCommand = DeleteBucketMetadataTableConfigurationCommand;
exports.DeleteBucketMetricsConfigurationCommand = DeleteBucketMetricsConfigurationCommand;
exports.DeleteBucketOwnershipControlsCommand = DeleteBucketOwnershipControlsCommand;
exports.DeleteBucketPolicyCommand = DeleteBucketPolicyCommand;
exports.DeleteBucketReplicationCommand = DeleteBucketReplicationCommand;
exports.DeleteBucketTaggingCommand = DeleteBucketTaggingCommand;
exports.DeleteBucketWebsiteCommand = DeleteBucketWebsiteCommand;
exports.DeleteMarkerReplicationStatus = DeleteMarkerReplicationStatus;
exports.DeleteObjectAnnotationCommand = DeleteObjectAnnotationCommand;
exports.DeleteObjectCommand = DeleteObjectCommand;
exports.DeleteObjectTaggingCommand = DeleteObjectTaggingCommand;
exports.DeleteObjectsCommand = DeleteObjectsCommand;
exports.DeletePublicAccessBlockCommand = DeletePublicAccessBlockCommand;
exports.EncodingType = EncodingType;
exports.EncryptionType = EncryptionType;
exports.Event = Event;
exports.ExistingObjectReplicationStatus = ExistingObjectReplicationStatus;
exports.ExpirationState = ExpirationState;
exports.ExpirationStatus = ExpirationStatus;
exports.ExpressionType = ExpressionType;
exports.FileHeaderInfo = FileHeaderInfo;
exports.FilterRuleName = FilterRuleName;
exports.GetBucketAbacCommand = GetBucketAbacCommand;
exports.GetBucketAccelerateConfigurationCommand = GetBucketAccelerateConfigurationCommand;
exports.GetBucketAclCommand = GetBucketAclCommand;
exports.GetBucketAnalyticsConfigurationCommand = GetBucketAnalyticsConfigurationCommand;
exports.GetBucketCorsCommand = GetBucketCorsCommand;
exports.GetBucketEncryptionCommand = GetBucketEncryptionCommand;
exports.GetBucketIntelligentTieringConfigurationCommand = GetBucketIntelligentTieringConfigurationCommand;
exports.GetBucketInventoryConfigurationCommand = GetBucketInventoryConfigurationCommand;
exports.GetBucketLifecycleConfigurationCommand = GetBucketLifecycleConfigurationCommand;
exports.GetBucketLocationCommand = GetBucketLocationCommand;
exports.GetBucketLoggingCommand = GetBucketLoggingCommand;
exports.GetBucketMetadataConfigurationCommand = GetBucketMetadataConfigurationCommand;
exports.GetBucketMetadataTableConfigurationCommand = GetBucketMetadataTableConfigurationCommand;
exports.GetBucketMetricsConfigurationCommand = GetBucketMetricsConfigurationCommand;
exports.GetBucketNotificationConfigurationCommand = GetBucketNotificationConfigurationCommand;
exports.GetBucketOwnershipControlsCommand = GetBucketOwnershipControlsCommand;
exports.GetBucketPolicyCommand = GetBucketPolicyCommand;
exports.GetBucketPolicyStatusCommand = GetBucketPolicyStatusCommand;
exports.GetBucketReplicationCommand = GetBucketReplicationCommand;
exports.GetBucketRequestPaymentCommand = GetBucketRequestPaymentCommand;
exports.GetBucketTaggingCommand = GetBucketTaggingCommand;
exports.GetBucketVersioningCommand = GetBucketVersioningCommand;
exports.GetBucketWebsiteCommand = GetBucketWebsiteCommand;
exports.GetObjectAclCommand = GetObjectAclCommand;
exports.GetObjectAnnotationCommand = GetObjectAnnotationCommand;
exports.GetObjectAttributesCommand = GetObjectAttributesCommand;
exports.GetObjectCommand = GetObjectCommand;
exports.GetObjectLegalHoldCommand = GetObjectLegalHoldCommand;
exports.GetObjectLockConfigurationCommand = GetObjectLockConfigurationCommand;
exports.GetObjectRetentionCommand = GetObjectRetentionCommand;
exports.GetObjectTaggingCommand = GetObjectTaggingCommand;
exports.GetObjectTorrentCommand = GetObjectTorrentCommand;
exports.GetPublicAccessBlockCommand = GetPublicAccessBlockCommand;
exports.HeadBucketCommand = HeadBucketCommand;
exports.HeadObjectCommand = HeadObjectCommand;
exports.IntelligentTieringAccessTier = IntelligentTieringAccessTier;
exports.IntelligentTieringStatus = IntelligentTieringStatus;
exports.InventoryConfigurationState = InventoryConfigurationState;
exports.InventoryFormat = InventoryFormat;
exports.InventoryFrequency = InventoryFrequency;
exports.InventoryIncludedObjectVersions = InventoryIncludedObjectVersions;
exports.InventoryOptionalField = InventoryOptionalField;
exports.JSONType = JSONType;
exports.ListBucketAnalyticsConfigurationsCommand = ListBucketAnalyticsConfigurationsCommand;
exports.ListBucketIntelligentTieringConfigurationsCommand = ListBucketIntelligentTieringConfigurationsCommand;
exports.ListBucketInventoryConfigurationsCommand = ListBucketInventoryConfigurationsCommand;
exports.ListBucketMetricsConfigurationsCommand = ListBucketMetricsConfigurationsCommand;
exports.ListBucketsCommand = ListBucketsCommand;
exports.ListDirectoryBucketsCommand = ListDirectoryBucketsCommand;
exports.ListMultipartUploadsCommand = ListMultipartUploadsCommand;
exports.ListObjectAnnotationsCommand = ListObjectAnnotationsCommand;
exports.ListObjectVersionsCommand = ListObjectVersionsCommand;
exports.ListObjectsCommand = ListObjectsCommand;
exports.ListObjectsV2Command = ListObjectsV2Command;
exports.ListPartsCommand = ListPartsCommand;
exports.LocationType = LocationType;
exports.MFADelete = MFADelete;
exports.MFADeleteStatus = MFADeleteStatus;
exports.MetadataDirective = MetadataDirective;
exports.MetricsStatus = MetricsStatus;
exports.ObjectAttributes = ObjectAttributes;
exports.ObjectCannedACL = ObjectCannedACL;
exports.ObjectLockEnabled = ObjectLockEnabled;
exports.ObjectLockLegalHoldStatus = ObjectLockLegalHoldStatus;
exports.ObjectLockMode = ObjectLockMode;
exports.ObjectLockRetentionMode = ObjectLockRetentionMode;
exports.ObjectOwnership = ObjectOwnership;
exports.ObjectStorageClass = ObjectStorageClass;
exports.ObjectVersionStorageClass = ObjectVersionStorageClass;
exports.OptionalObjectAttributes = OptionalObjectAttributes;
exports.OwnerOverride = OwnerOverride;
exports.PartitionDateSource = PartitionDateSource;
exports.Payer = Payer;
exports.Permission = Permission;
exports.Protocol = Protocol;
exports.PutBucketAbacCommand = PutBucketAbacCommand;
exports.PutBucketAccelerateConfigurationCommand = PutBucketAccelerateConfigurationCommand;
exports.PutBucketAclCommand = PutBucketAclCommand;
exports.PutBucketAnalyticsConfigurationCommand = PutBucketAnalyticsConfigurationCommand;
exports.PutBucketCorsCommand = PutBucketCorsCommand;
exports.PutBucketEncryptionCommand = PutBucketEncryptionCommand;
exports.PutBucketIntelligentTieringConfigurationCommand = PutBucketIntelligentTieringConfigurationCommand;
exports.PutBucketInventoryConfigurationCommand = PutBucketInventoryConfigurationCommand;
exports.PutBucketLifecycleConfigurationCommand = PutBucketLifecycleConfigurationCommand;
exports.PutBucketLoggingCommand = PutBucketLoggingCommand;
exports.PutBucketMetricsConfigurationCommand = PutBucketMetricsConfigurationCommand;
exports.PutBucketNotificationConfigurationCommand = PutBucketNotificationConfigurationCommand;
exports.PutBucketOwnershipControlsCommand = PutBucketOwnershipControlsCommand;
exports.PutBucketPolicyCommand = PutBucketPolicyCommand;
exports.PutBucketReplicationCommand = PutBucketReplicationCommand;
exports.PutBucketRequestPaymentCommand = PutBucketRequestPaymentCommand;
exports.PutBucketTaggingCommand = PutBucketTaggingCommand;
exports.PutBucketVersioningCommand = PutBucketVersioningCommand;
exports.PutBucketWebsiteCommand = PutBucketWebsiteCommand;
exports.PutObjectAclCommand = PutObjectAclCommand;
exports.PutObjectAnnotationCommand = PutObjectAnnotationCommand;
exports.PutObjectCommand = PutObjectCommand;
exports.PutObjectLegalHoldCommand = PutObjectLegalHoldCommand;
exports.PutObjectLockConfigurationCommand = PutObjectLockConfigurationCommand;
exports.PutObjectRetentionCommand = PutObjectRetentionCommand;
exports.PutObjectTaggingCommand = PutObjectTaggingCommand;
exports.PutPublicAccessBlockCommand = PutPublicAccessBlockCommand;
exports.QuoteFields = QuoteFields;
exports.RenameObjectCommand = RenameObjectCommand;
exports.ReplicaModificationsStatus = ReplicaModificationsStatus;
exports.ReplicationRuleStatus = ReplicationRuleStatus;
exports.ReplicationStatus = ReplicationStatus;
exports.ReplicationTimeStatus = ReplicationTimeStatus;
exports.RequestCharged = RequestCharged;
exports.RequestPayer = RequestPayer;
exports.RestoreObjectCommand = RestoreObjectCommand;
exports.RestoreRequestType = RestoreRequestType;
exports.S3 = S3;
exports.S3Client = S3Client;
exports.S3TablesBucketType = S3TablesBucketType;
exports.SelectObjectContentCommand = SelectObjectContentCommand;
exports.ServerSideEncryption = ServerSideEncryption;
exports.SessionMode = SessionMode;
exports.SseKmsEncryptedObjectsStatus = SseKmsEncryptedObjectsStatus;
exports.StorageClass = StorageClass;
exports.StorageClassAnalysisSchemaVersion = StorageClassAnalysisSchemaVersion;
exports.TableSseAlgorithm = TableSseAlgorithm;
exports.TaggingDirective = TaggingDirective;
exports.Tier = Tier;
exports.TransitionDefaultMinimumObjectSize = TransitionDefaultMinimumObjectSize;
exports.TransitionStorageClass = TransitionStorageClass;
exports.Type = Type;
exports.UpdateBucketMetadataAnnotationTableConfigurationCommand = UpdateBucketMetadataAnnotationTableConfigurationCommand;
exports.UpdateBucketMetadataInventoryTableConfigurationCommand = UpdateBucketMetadataInventoryTableConfigurationCommand;
exports.UpdateBucketMetadataJournalTableConfigurationCommand = UpdateBucketMetadataJournalTableConfigurationCommand;
exports.UpdateObjectEncryptionCommand = UpdateObjectEncryptionCommand;
exports.UploadPartCommand = UploadPartCommand;
exports.UploadPartCopyCommand = UploadPartCopyCommand;
exports.WriteGetObjectResponseCommand = WriteGetObjectResponseCommand;
exports.paginateListBuckets = paginateListBuckets;
exports.paginateListDirectoryBuckets = paginateListDirectoryBuckets;
exports.paginateListObjectAnnotations = paginateListObjectAnnotations;
exports.paginateListObjectsV2 = paginateListObjectsV2;
exports.paginateListParts = paginateListParts;
exports.waitForBucketExists = waitForBucketExists;
exports.waitForBucketNotExists = waitForBucketNotExists;
exports.waitForObjectExists = waitForObjectExists;
exports.waitForObjectNotExists = waitForObjectNotExists;
exports.waitUntilBucketExists = waitUntilBucketExists;
exports.waitUntilBucketNotExists = waitUntilBucketNotExists;
exports.waitUntilObjectExists = waitUntilObjectExists;
exports.waitUntilObjectNotExists = waitUntilObjectNotExists;
