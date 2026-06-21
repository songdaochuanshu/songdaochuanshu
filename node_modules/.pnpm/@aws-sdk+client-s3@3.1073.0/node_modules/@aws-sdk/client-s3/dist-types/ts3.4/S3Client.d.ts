import {
  HostHeaderInputConfig,
  HostHeaderResolvedConfig,
  UserAgentInputConfig,
  UserAgentResolvedConfig,
} from "@aws-sdk/core/client";
import {
  FlexibleChecksumsInputConfig,
  FlexibleChecksumsResolvedConfig,
} from "@aws-sdk/middleware-flexible-checksums";
import { S3InputConfig, S3ResolvedConfig } from "@aws-sdk/middleware-sdk-s3/s3";
import { GetAwsChunkedEncodingStream } from "@aws-sdk/types";
import {
  DefaultsMode as __DefaultsMode,
  SmithyConfiguration as __SmithyConfiguration,
  SmithyResolvedConfiguration as __SmithyResolvedConfiguration,
  Client as __Client,
} from "@smithy/core/client";
import { RegionInputConfig, RegionResolvedConfig } from "@smithy/core/config";
import {
  EndpointInputConfig,
  EndpointResolvedConfig,
} from "@smithy/core/endpoints";
import {
  EventStreamSerdeInputConfig,
  EventStreamSerdeResolvedConfig,
} from "@smithy/core/event-streams";
import { HttpHandlerUserInput as __HttpHandlerUserInput } from "@smithy/core/protocols";
import { RetryInputConfig, RetryResolvedConfig } from "@smithy/core/retry";
import {
  AwsCredentialIdentityProvider,
  BodyLengthCalculator as __BodyLengthCalculator,
  CheckOptionalClientConfig as __CheckOptionalClientConfig,
  ChecksumConstructor as __ChecksumConstructor,
  Decoder as __Decoder,
  Encoder as __Encoder,
  EventStreamSerdeProvider as __EventStreamSerdeProvider,
  HashConstructor as __HashConstructor,
  HttpHandlerOptions as __HttpHandlerOptions,
  Logger as __Logger,
  Provider as __Provider,
  SdkStreamMixinInjector as __SdkStreamMixinInjector,
  StreamCollector as __StreamCollector,
  StreamHasher as __StreamHasher,
  UrlParser as __UrlParser,
  UserAgent as __UserAgent,
} from "@smithy/types";
import { Readable as Readable } from "node:stream";
import {
  HttpAuthSchemeInputConfig,
  HttpAuthSchemeResolvedConfig,
} from "./auth/httpAuthSchemeProvider";
import {
  AbortMultipartUploadCommandInput,
  AbortMultipartUploadCommandOutput,
} from "./commands/AbortMultipartUploadCommand";
import {
  CompleteMultipartUploadCommandInput,
  CompleteMultipartUploadCommandOutput,
} from "./commands/CompleteMultipartUploadCommand";
import {
  CopyObjectCommandInput,
  CopyObjectCommandOutput,
} from "./commands/CopyObjectCommand";
import {
  CreateBucketCommandInput,
  CreateBucketCommandOutput,
} from "./commands/CreateBucketCommand";
import {
  CreateBucketMetadataConfigurationCommandInput,
  CreateBucketMetadataConfigurationCommandOutput,
} from "./commands/CreateBucketMetadataConfigurationCommand";
import {
  CreateBucketMetadataTableConfigurationCommandInput,
  CreateBucketMetadataTableConfigurationCommandOutput,
} from "./commands/CreateBucketMetadataTableConfigurationCommand";
import {
  CreateMultipartUploadCommandInput,
  CreateMultipartUploadCommandOutput,
} from "./commands/CreateMultipartUploadCommand";
import {
  CreateSessionCommandInput,
  CreateSessionCommandOutput,
} from "./commands/CreateSessionCommand";
import {
  DeleteBucketAnalyticsConfigurationCommandInput,
  DeleteBucketAnalyticsConfigurationCommandOutput,
} from "./commands/DeleteBucketAnalyticsConfigurationCommand";
import {
  DeleteBucketCommandInput,
  DeleteBucketCommandOutput,
} from "./commands/DeleteBucketCommand";
import {
  DeleteBucketCorsCommandInput,
  DeleteBucketCorsCommandOutput,
} from "./commands/DeleteBucketCorsCommand";
import {
  DeleteBucketEncryptionCommandInput,
  DeleteBucketEncryptionCommandOutput,
} from "./commands/DeleteBucketEncryptionCommand";
import {
  DeleteBucketIntelligentTieringConfigurationCommandInput,
  DeleteBucketIntelligentTieringConfigurationCommandOutput,
} from "./commands/DeleteBucketIntelligentTieringConfigurationCommand";
import {
  DeleteBucketInventoryConfigurationCommandInput,
  DeleteBucketInventoryConfigurationCommandOutput,
} from "./commands/DeleteBucketInventoryConfigurationCommand";
import {
  DeleteBucketLifecycleCommandInput,
  DeleteBucketLifecycleCommandOutput,
} from "./commands/DeleteBucketLifecycleCommand";
import {
  DeleteBucketMetadataConfigurationCommandInput,
  DeleteBucketMetadataConfigurationCommandOutput,
} from "./commands/DeleteBucketMetadataConfigurationCommand";
import {
  DeleteBucketMetadataTableConfigurationCommandInput,
  DeleteBucketMetadataTableConfigurationCommandOutput,
} from "./commands/DeleteBucketMetadataTableConfigurationCommand";
import {
  DeleteBucketMetricsConfigurationCommandInput,
  DeleteBucketMetricsConfigurationCommandOutput,
} from "./commands/DeleteBucketMetricsConfigurationCommand";
import {
  DeleteBucketOwnershipControlsCommandInput,
  DeleteBucketOwnershipControlsCommandOutput,
} from "./commands/DeleteBucketOwnershipControlsCommand";
import {
  DeleteBucketPolicyCommandInput,
  DeleteBucketPolicyCommandOutput,
} from "./commands/DeleteBucketPolicyCommand";
import {
  DeleteBucketReplicationCommandInput,
  DeleteBucketReplicationCommandOutput,
} from "./commands/DeleteBucketReplicationCommand";
import {
  DeleteBucketTaggingCommandInput,
  DeleteBucketTaggingCommandOutput,
} from "./commands/DeleteBucketTaggingCommand";
import {
  DeleteBucketWebsiteCommandInput,
  DeleteBucketWebsiteCommandOutput,
} from "./commands/DeleteBucketWebsiteCommand";
import {
  DeleteObjectAnnotationCommandInput,
  DeleteObjectAnnotationCommandOutput,
} from "./commands/DeleteObjectAnnotationCommand";
import {
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
} from "./commands/DeleteObjectCommand";
import {
  DeleteObjectsCommandInput,
  DeleteObjectsCommandOutput,
} from "./commands/DeleteObjectsCommand";
import {
  DeleteObjectTaggingCommandInput,
  DeleteObjectTaggingCommandOutput,
} from "./commands/DeleteObjectTaggingCommand";
import {
  DeletePublicAccessBlockCommandInput,
  DeletePublicAccessBlockCommandOutput,
} from "./commands/DeletePublicAccessBlockCommand";
import {
  GetBucketAbacCommandInput,
  GetBucketAbacCommandOutput,
} from "./commands/GetBucketAbacCommand";
import {
  GetBucketAccelerateConfigurationCommandInput,
  GetBucketAccelerateConfigurationCommandOutput,
} from "./commands/GetBucketAccelerateConfigurationCommand";
import {
  GetBucketAclCommandInput,
  GetBucketAclCommandOutput,
} from "./commands/GetBucketAclCommand";
import {
  GetBucketAnalyticsConfigurationCommandInput,
  GetBucketAnalyticsConfigurationCommandOutput,
} from "./commands/GetBucketAnalyticsConfigurationCommand";
import {
  GetBucketCorsCommandInput,
  GetBucketCorsCommandOutput,
} from "./commands/GetBucketCorsCommand";
import {
  GetBucketEncryptionCommandInput,
  GetBucketEncryptionCommandOutput,
} from "./commands/GetBucketEncryptionCommand";
import {
  GetBucketIntelligentTieringConfigurationCommandInput,
  GetBucketIntelligentTieringConfigurationCommandOutput,
} from "./commands/GetBucketIntelligentTieringConfigurationCommand";
import {
  GetBucketInventoryConfigurationCommandInput,
  GetBucketInventoryConfigurationCommandOutput,
} from "./commands/GetBucketInventoryConfigurationCommand";
import {
  GetBucketLifecycleConfigurationCommandInput,
  GetBucketLifecycleConfigurationCommandOutput,
} from "./commands/GetBucketLifecycleConfigurationCommand";
import {
  GetBucketLocationCommandInput,
  GetBucketLocationCommandOutput,
} from "./commands/GetBucketLocationCommand";
import {
  GetBucketLoggingCommandInput,
  GetBucketLoggingCommandOutput,
} from "./commands/GetBucketLoggingCommand";
import {
  GetBucketMetadataConfigurationCommandInput,
  GetBucketMetadataConfigurationCommandOutput,
} from "./commands/GetBucketMetadataConfigurationCommand";
import {
  GetBucketMetadataTableConfigurationCommandInput,
  GetBucketMetadataTableConfigurationCommandOutput,
} from "./commands/GetBucketMetadataTableConfigurationCommand";
import {
  GetBucketMetricsConfigurationCommandInput,
  GetBucketMetricsConfigurationCommandOutput,
} from "./commands/GetBucketMetricsConfigurationCommand";
import {
  GetBucketNotificationConfigurationCommandInput,
  GetBucketNotificationConfigurationCommandOutput,
} from "./commands/GetBucketNotificationConfigurationCommand";
import {
  GetBucketOwnershipControlsCommandInput,
  GetBucketOwnershipControlsCommandOutput,
} from "./commands/GetBucketOwnershipControlsCommand";
import {
  GetBucketPolicyCommandInput,
  GetBucketPolicyCommandOutput,
} from "./commands/GetBucketPolicyCommand";
import {
  GetBucketPolicyStatusCommandInput,
  GetBucketPolicyStatusCommandOutput,
} from "./commands/GetBucketPolicyStatusCommand";
import {
  GetBucketReplicationCommandInput,
  GetBucketReplicationCommandOutput,
} from "./commands/GetBucketReplicationCommand";
import {
  GetBucketRequestPaymentCommandInput,
  GetBucketRequestPaymentCommandOutput,
} from "./commands/GetBucketRequestPaymentCommand";
import {
  GetBucketTaggingCommandInput,
  GetBucketTaggingCommandOutput,
} from "./commands/GetBucketTaggingCommand";
import {
  GetBucketVersioningCommandInput,
  GetBucketVersioningCommandOutput,
} from "./commands/GetBucketVersioningCommand";
import {
  GetBucketWebsiteCommandInput,
  GetBucketWebsiteCommandOutput,
} from "./commands/GetBucketWebsiteCommand";
import {
  GetObjectAclCommandInput,
  GetObjectAclCommandOutput,
} from "./commands/GetObjectAclCommand";
import {
  GetObjectAnnotationCommandInput,
  GetObjectAnnotationCommandOutput,
} from "./commands/GetObjectAnnotationCommand";
import {
  GetObjectAttributesCommandInput,
  GetObjectAttributesCommandOutput,
} from "./commands/GetObjectAttributesCommand";
import {
  GetObjectCommandInput,
  GetObjectCommandOutput,
} from "./commands/GetObjectCommand";
import {
  GetObjectLegalHoldCommandInput,
  GetObjectLegalHoldCommandOutput,
} from "./commands/GetObjectLegalHoldCommand";
import {
  GetObjectLockConfigurationCommandInput,
  GetObjectLockConfigurationCommandOutput,
} from "./commands/GetObjectLockConfigurationCommand";
import {
  GetObjectRetentionCommandInput,
  GetObjectRetentionCommandOutput,
} from "./commands/GetObjectRetentionCommand";
import {
  GetObjectTaggingCommandInput,
  GetObjectTaggingCommandOutput,
} from "./commands/GetObjectTaggingCommand";
import {
  GetObjectTorrentCommandInput,
  GetObjectTorrentCommandOutput,
} from "./commands/GetObjectTorrentCommand";
import {
  GetPublicAccessBlockCommandInput,
  GetPublicAccessBlockCommandOutput,
} from "./commands/GetPublicAccessBlockCommand";
import {
  HeadBucketCommandInput,
  HeadBucketCommandOutput,
} from "./commands/HeadBucketCommand";
import {
  HeadObjectCommandInput,
  HeadObjectCommandOutput,
} from "./commands/HeadObjectCommand";
import {
  ListBucketAnalyticsConfigurationsCommandInput,
  ListBucketAnalyticsConfigurationsCommandOutput,
} from "./commands/ListBucketAnalyticsConfigurationsCommand";
import {
  ListBucketIntelligentTieringConfigurationsCommandInput,
  ListBucketIntelligentTieringConfigurationsCommandOutput,
} from "./commands/ListBucketIntelligentTieringConfigurationsCommand";
import {
  ListBucketInventoryConfigurationsCommandInput,
  ListBucketInventoryConfigurationsCommandOutput,
} from "./commands/ListBucketInventoryConfigurationsCommand";
import {
  ListBucketMetricsConfigurationsCommandInput,
  ListBucketMetricsConfigurationsCommandOutput,
} from "./commands/ListBucketMetricsConfigurationsCommand";
import {
  ListBucketsCommandInput,
  ListBucketsCommandOutput,
} from "./commands/ListBucketsCommand";
import {
  ListDirectoryBucketsCommandInput,
  ListDirectoryBucketsCommandOutput,
} from "./commands/ListDirectoryBucketsCommand";
import {
  ListMultipartUploadsCommandInput,
  ListMultipartUploadsCommandOutput,
} from "./commands/ListMultipartUploadsCommand";
import {
  ListObjectAnnotationsCommandInput,
  ListObjectAnnotationsCommandOutput,
} from "./commands/ListObjectAnnotationsCommand";
import {
  ListObjectsCommandInput,
  ListObjectsCommandOutput,
} from "./commands/ListObjectsCommand";
import {
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
} from "./commands/ListObjectsV2Command";
import {
  ListObjectVersionsCommandInput,
  ListObjectVersionsCommandOutput,
} from "./commands/ListObjectVersionsCommand";
import {
  ListPartsCommandInput,
  ListPartsCommandOutput,
} from "./commands/ListPartsCommand";
import {
  PutBucketAbacCommandInput,
  PutBucketAbacCommandOutput,
} from "./commands/PutBucketAbacCommand";
import {
  PutBucketAccelerateConfigurationCommandInput,
  PutBucketAccelerateConfigurationCommandOutput,
} from "./commands/PutBucketAccelerateConfigurationCommand";
import {
  PutBucketAclCommandInput,
  PutBucketAclCommandOutput,
} from "./commands/PutBucketAclCommand";
import {
  PutBucketAnalyticsConfigurationCommandInput,
  PutBucketAnalyticsConfigurationCommandOutput,
} from "./commands/PutBucketAnalyticsConfigurationCommand";
import {
  PutBucketCorsCommandInput,
  PutBucketCorsCommandOutput,
} from "./commands/PutBucketCorsCommand";
import {
  PutBucketEncryptionCommandInput,
  PutBucketEncryptionCommandOutput,
} from "./commands/PutBucketEncryptionCommand";
import {
  PutBucketIntelligentTieringConfigurationCommandInput,
  PutBucketIntelligentTieringConfigurationCommandOutput,
} from "./commands/PutBucketIntelligentTieringConfigurationCommand";
import {
  PutBucketInventoryConfigurationCommandInput,
  PutBucketInventoryConfigurationCommandOutput,
} from "./commands/PutBucketInventoryConfigurationCommand";
import {
  PutBucketLifecycleConfigurationCommandInput,
  PutBucketLifecycleConfigurationCommandOutput,
} from "./commands/PutBucketLifecycleConfigurationCommand";
import {
  PutBucketLoggingCommandInput,
  PutBucketLoggingCommandOutput,
} from "./commands/PutBucketLoggingCommand";
import {
  PutBucketMetricsConfigurationCommandInput,
  PutBucketMetricsConfigurationCommandOutput,
} from "./commands/PutBucketMetricsConfigurationCommand";
import {
  PutBucketNotificationConfigurationCommandInput,
  PutBucketNotificationConfigurationCommandOutput,
} from "./commands/PutBucketNotificationConfigurationCommand";
import {
  PutBucketOwnershipControlsCommandInput,
  PutBucketOwnershipControlsCommandOutput,
} from "./commands/PutBucketOwnershipControlsCommand";
import {
  PutBucketPolicyCommandInput,
  PutBucketPolicyCommandOutput,
} from "./commands/PutBucketPolicyCommand";
import {
  PutBucketReplicationCommandInput,
  PutBucketReplicationCommandOutput,
} from "./commands/PutBucketReplicationCommand";
import {
  PutBucketRequestPaymentCommandInput,
  PutBucketRequestPaymentCommandOutput,
} from "./commands/PutBucketRequestPaymentCommand";
import {
  PutBucketTaggingCommandInput,
  PutBucketTaggingCommandOutput,
} from "./commands/PutBucketTaggingCommand";
import {
  PutBucketVersioningCommandInput,
  PutBucketVersioningCommandOutput,
} from "./commands/PutBucketVersioningCommand";
import {
  PutBucketWebsiteCommandInput,
  PutBucketWebsiteCommandOutput,
} from "./commands/PutBucketWebsiteCommand";
import {
  PutObjectAclCommandInput,
  PutObjectAclCommandOutput,
} from "./commands/PutObjectAclCommand";
import {
  PutObjectAnnotationCommandInput,
  PutObjectAnnotationCommandOutput,
} from "./commands/PutObjectAnnotationCommand";
import {
  PutObjectCommandInput,
  PutObjectCommandOutput,
} from "./commands/PutObjectCommand";
import {
  PutObjectLegalHoldCommandInput,
  PutObjectLegalHoldCommandOutput,
} from "./commands/PutObjectLegalHoldCommand";
import {
  PutObjectLockConfigurationCommandInput,
  PutObjectLockConfigurationCommandOutput,
} from "./commands/PutObjectLockConfigurationCommand";
import {
  PutObjectRetentionCommandInput,
  PutObjectRetentionCommandOutput,
} from "./commands/PutObjectRetentionCommand";
import {
  PutObjectTaggingCommandInput,
  PutObjectTaggingCommandOutput,
} from "./commands/PutObjectTaggingCommand";
import {
  PutPublicAccessBlockCommandInput,
  PutPublicAccessBlockCommandOutput,
} from "./commands/PutPublicAccessBlockCommand";
import {
  RenameObjectCommandInput,
  RenameObjectCommandOutput,
} from "./commands/RenameObjectCommand";
import {
  RestoreObjectCommandInput,
  RestoreObjectCommandOutput,
} from "./commands/RestoreObjectCommand";
import {
  SelectObjectContentCommandInput,
  SelectObjectContentCommandOutput,
} from "./commands/SelectObjectContentCommand";
import {
  UpdateBucketMetadataAnnotationTableConfigurationCommandInput,
  UpdateBucketMetadataAnnotationTableConfigurationCommandOutput,
} from "./commands/UpdateBucketMetadataAnnotationTableConfigurationCommand";
import {
  UpdateBucketMetadataInventoryTableConfigurationCommandInput,
  UpdateBucketMetadataInventoryTableConfigurationCommandOutput,
} from "./commands/UpdateBucketMetadataInventoryTableConfigurationCommand";
import {
  UpdateBucketMetadataJournalTableConfigurationCommandInput,
  UpdateBucketMetadataJournalTableConfigurationCommandOutput,
} from "./commands/UpdateBucketMetadataJournalTableConfigurationCommand";
import {
  UpdateObjectEncryptionCommandInput,
  UpdateObjectEncryptionCommandOutput,
} from "./commands/UpdateObjectEncryptionCommand";
import {
  UploadPartCommandInput,
  UploadPartCommandOutput,
} from "./commands/UploadPartCommand";
import {
  UploadPartCopyCommandInput,
  UploadPartCopyCommandOutput,
} from "./commands/UploadPartCopyCommand";
import {
  WriteGetObjectResponseCommandInput,
  WriteGetObjectResponseCommandOutput,
} from "./commands/WriteGetObjectResponseCommand";
import {
  ClientInputEndpointParameters,
  ClientResolvedEndpointParameters,
  EndpointParameters,
} from "./endpoint/EndpointParameters";
import { RuntimeExtension, RuntimeExtensionsConfig } from "./runtimeExtensions";
export { __Client };
export type ServiceInputTypes =
  | AbortMultipartUploadCommandInput
  | CompleteMultipartUploadCommandInput
  | CopyObjectCommandInput
  | CreateBucketCommandInput
  | CreateBucketMetadataConfigurationCommandInput
  | CreateBucketMetadataTableConfigurationCommandInput
  | CreateMultipartUploadCommandInput
  | CreateSessionCommandInput
  | DeleteBucketAnalyticsConfigurationCommandInput
  | DeleteBucketCommandInput
  | DeleteBucketCorsCommandInput
  | DeleteBucketEncryptionCommandInput
  | DeleteBucketIntelligentTieringConfigurationCommandInput
  | DeleteBucketInventoryConfigurationCommandInput
  | DeleteBucketLifecycleCommandInput
  | DeleteBucketMetadataConfigurationCommandInput
  | DeleteBucketMetadataTableConfigurationCommandInput
  | DeleteBucketMetricsConfigurationCommandInput
  | DeleteBucketOwnershipControlsCommandInput
  | DeleteBucketPolicyCommandInput
  | DeleteBucketReplicationCommandInput
  | DeleteBucketTaggingCommandInput
  | DeleteBucketWebsiteCommandInput
  | DeleteObjectAnnotationCommandInput
  | DeleteObjectCommandInput
  | DeleteObjectTaggingCommandInput
  | DeleteObjectsCommandInput
  | DeletePublicAccessBlockCommandInput
  | GetBucketAbacCommandInput
  | GetBucketAccelerateConfigurationCommandInput
  | GetBucketAclCommandInput
  | GetBucketAnalyticsConfigurationCommandInput
  | GetBucketCorsCommandInput
  | GetBucketEncryptionCommandInput
  | GetBucketIntelligentTieringConfigurationCommandInput
  | GetBucketInventoryConfigurationCommandInput
  | GetBucketLifecycleConfigurationCommandInput
  | GetBucketLocationCommandInput
  | GetBucketLoggingCommandInput
  | GetBucketMetadataConfigurationCommandInput
  | GetBucketMetadataTableConfigurationCommandInput
  | GetBucketMetricsConfigurationCommandInput
  | GetBucketNotificationConfigurationCommandInput
  | GetBucketOwnershipControlsCommandInput
  | GetBucketPolicyCommandInput
  | GetBucketPolicyStatusCommandInput
  | GetBucketReplicationCommandInput
  | GetBucketRequestPaymentCommandInput
  | GetBucketTaggingCommandInput
  | GetBucketVersioningCommandInput
  | GetBucketWebsiteCommandInput
  | GetObjectAclCommandInput
  | GetObjectAnnotationCommandInput
  | GetObjectAttributesCommandInput
  | GetObjectCommandInput
  | GetObjectLegalHoldCommandInput
  | GetObjectLockConfigurationCommandInput
  | GetObjectRetentionCommandInput
  | GetObjectTaggingCommandInput
  | GetObjectTorrentCommandInput
  | GetPublicAccessBlockCommandInput
  | HeadBucketCommandInput
  | HeadObjectCommandInput
  | ListBucketAnalyticsConfigurationsCommandInput
  | ListBucketIntelligentTieringConfigurationsCommandInput
  | ListBucketInventoryConfigurationsCommandInput
  | ListBucketMetricsConfigurationsCommandInput
  | ListBucketsCommandInput
  | ListDirectoryBucketsCommandInput
  | ListMultipartUploadsCommandInput
  | ListObjectAnnotationsCommandInput
  | ListObjectVersionsCommandInput
  | ListObjectsCommandInput
  | ListObjectsV2CommandInput
  | ListPartsCommandInput
  | PutBucketAbacCommandInput
  | PutBucketAccelerateConfigurationCommandInput
  | PutBucketAclCommandInput
  | PutBucketAnalyticsConfigurationCommandInput
  | PutBucketCorsCommandInput
  | PutBucketEncryptionCommandInput
  | PutBucketIntelligentTieringConfigurationCommandInput
  | PutBucketInventoryConfigurationCommandInput
  | PutBucketLifecycleConfigurationCommandInput
  | PutBucketLoggingCommandInput
  | PutBucketMetricsConfigurationCommandInput
  | PutBucketNotificationConfigurationCommandInput
  | PutBucketOwnershipControlsCommandInput
  | PutBucketPolicyCommandInput
  | PutBucketReplicationCommandInput
  | PutBucketRequestPaymentCommandInput
  | PutBucketTaggingCommandInput
  | PutBucketVersioningCommandInput
  | PutBucketWebsiteCommandInput
  | PutObjectAclCommandInput
  | PutObjectAnnotationCommandInput
  | PutObjectCommandInput
  | PutObjectLegalHoldCommandInput
  | PutObjectLockConfigurationCommandInput
  | PutObjectRetentionCommandInput
  | PutObjectTaggingCommandInput
  | PutPublicAccessBlockCommandInput
  | RenameObjectCommandInput
  | RestoreObjectCommandInput
  | SelectObjectContentCommandInput
  | UpdateBucketMetadataAnnotationTableConfigurationCommandInput
  | UpdateBucketMetadataInventoryTableConfigurationCommandInput
  | UpdateBucketMetadataJournalTableConfigurationCommandInput
  | UpdateObjectEncryptionCommandInput
  | UploadPartCommandInput
  | UploadPartCopyCommandInput
  | WriteGetObjectResponseCommandInput;
export type ServiceOutputTypes =
  | AbortMultipartUploadCommandOutput
  | CompleteMultipartUploadCommandOutput
  | CopyObjectCommandOutput
  | CreateBucketCommandOutput
  | CreateBucketMetadataConfigurationCommandOutput
  | CreateBucketMetadataTableConfigurationCommandOutput
  | CreateMultipartUploadCommandOutput
  | CreateSessionCommandOutput
  | DeleteBucketAnalyticsConfigurationCommandOutput
  | DeleteBucketCommandOutput
  | DeleteBucketCorsCommandOutput
  | DeleteBucketEncryptionCommandOutput
  | DeleteBucketIntelligentTieringConfigurationCommandOutput
  | DeleteBucketInventoryConfigurationCommandOutput
  | DeleteBucketLifecycleCommandOutput
  | DeleteBucketMetadataConfigurationCommandOutput
  | DeleteBucketMetadataTableConfigurationCommandOutput
  | DeleteBucketMetricsConfigurationCommandOutput
  | DeleteBucketOwnershipControlsCommandOutput
  | DeleteBucketPolicyCommandOutput
  | DeleteBucketReplicationCommandOutput
  | DeleteBucketTaggingCommandOutput
  | DeleteBucketWebsiteCommandOutput
  | DeleteObjectAnnotationCommandOutput
  | DeleteObjectCommandOutput
  | DeleteObjectTaggingCommandOutput
  | DeleteObjectsCommandOutput
  | DeletePublicAccessBlockCommandOutput
  | GetBucketAbacCommandOutput
  | GetBucketAccelerateConfigurationCommandOutput
  | GetBucketAclCommandOutput
  | GetBucketAnalyticsConfigurationCommandOutput
  | GetBucketCorsCommandOutput
  | GetBucketEncryptionCommandOutput
  | GetBucketIntelligentTieringConfigurationCommandOutput
  | GetBucketInventoryConfigurationCommandOutput
  | GetBucketLifecycleConfigurationCommandOutput
  | GetBucketLocationCommandOutput
  | GetBucketLoggingCommandOutput
  | GetBucketMetadataConfigurationCommandOutput
  | GetBucketMetadataTableConfigurationCommandOutput
  | GetBucketMetricsConfigurationCommandOutput
  | GetBucketNotificationConfigurationCommandOutput
  | GetBucketOwnershipControlsCommandOutput
  | GetBucketPolicyCommandOutput
  | GetBucketPolicyStatusCommandOutput
  | GetBucketReplicationCommandOutput
  | GetBucketRequestPaymentCommandOutput
  | GetBucketTaggingCommandOutput
  | GetBucketVersioningCommandOutput
  | GetBucketWebsiteCommandOutput
  | GetObjectAclCommandOutput
  | GetObjectAnnotationCommandOutput
  | GetObjectAttributesCommandOutput
  | GetObjectCommandOutput
  | GetObjectLegalHoldCommandOutput
  | GetObjectLockConfigurationCommandOutput
  | GetObjectRetentionCommandOutput
  | GetObjectTaggingCommandOutput
  | GetObjectTorrentCommandOutput
  | GetPublicAccessBlockCommandOutput
  | HeadBucketCommandOutput
  | HeadObjectCommandOutput
  | ListBucketAnalyticsConfigurationsCommandOutput
  | ListBucketIntelligentTieringConfigurationsCommandOutput
  | ListBucketInventoryConfigurationsCommandOutput
  | ListBucketMetricsConfigurationsCommandOutput
  | ListBucketsCommandOutput
  | ListDirectoryBucketsCommandOutput
  | ListMultipartUploadsCommandOutput
  | ListObjectAnnotationsCommandOutput
  | ListObjectVersionsCommandOutput
  | ListObjectsCommandOutput
  | ListObjectsV2CommandOutput
  | ListPartsCommandOutput
  | PutBucketAbacCommandOutput
  | PutBucketAccelerateConfigurationCommandOutput
  | PutBucketAclCommandOutput
  | PutBucketAnalyticsConfigurationCommandOutput
  | PutBucketCorsCommandOutput
  | PutBucketEncryptionCommandOutput
  | PutBucketIntelligentTieringConfigurationCommandOutput
  | PutBucketInventoryConfigurationCommandOutput
  | PutBucketLifecycleConfigurationCommandOutput
  | PutBucketLoggingCommandOutput
  | PutBucketMetricsConfigurationCommandOutput
  | PutBucketNotificationConfigurationCommandOutput
  | PutBucketOwnershipControlsCommandOutput
  | PutBucketPolicyCommandOutput
  | PutBucketReplicationCommandOutput
  | PutBucketRequestPaymentCommandOutput
  | PutBucketTaggingCommandOutput
  | PutBucketVersioningCommandOutput
  | PutBucketWebsiteCommandOutput
  | PutObjectAclCommandOutput
  | PutObjectAnnotationCommandOutput
  | PutObjectCommandOutput
  | PutObjectLegalHoldCommandOutput
  | PutObjectLockConfigurationCommandOutput
  | PutObjectRetentionCommandOutput
  | PutObjectTaggingCommandOutput
  | PutPublicAccessBlockCommandOutput
  | RenameObjectCommandOutput
  | RestoreObjectCommandOutput
  | SelectObjectContentCommandOutput
  | UpdateBucketMetadataAnnotationTableConfigurationCommandOutput
  | UpdateBucketMetadataInventoryTableConfigurationCommandOutput
  | UpdateBucketMetadataJournalTableConfigurationCommandOutput
  | UpdateObjectEncryptionCommandOutput
  | UploadPartCommandOutput
  | UploadPartCopyCommandOutput
  | WriteGetObjectResponseCommandOutput;
export interface ClientDefaults
  extends Partial<__SmithyConfiguration<__HttpHandlerOptions>> {
  requestHandler?: __HttpHandlerUserInput;
  sha256?: __ChecksumConstructor | __HashConstructor;
  urlParser?: __UrlParser;
  bodyLengthChecker?: __BodyLengthCalculator;
  streamCollector?: __StreamCollector;
  base64Decoder?: __Decoder;
  base64Encoder?: __Encoder;
  utf8Decoder?: __Decoder;
  utf8Encoder?: __Encoder;
  runtime?: string;
  disableHostPrefix?: boolean;
  serviceId?: string;
  useDualstackEndpoint?: boolean | __Provider<boolean>;
  useFipsEndpoint?: boolean | __Provider<boolean>;
  region?: string | __Provider<string>;
  profile?: string;
  defaultUserAgentProvider?: __Provider<__UserAgent>;
  streamHasher?: __StreamHasher<Readable> | __StreamHasher<Blob>;
  md5?: __ChecksumConstructor | __HashConstructor;
  sha1?: __ChecksumConstructor | __HashConstructor;
  getAwsChunkedEncodingStream?: GetAwsChunkedEncodingStream;
  credentialDefaultProvider?: (input: any) => AwsCredentialIdentityProvider;
  maxAttempts?: number | __Provider<number>;
  retryMode?: string | __Provider<string>;
  logger?: __Logger;
  extensions?: RuntimeExtension[];
  eventStreamSerdeProvider?: __EventStreamSerdeProvider;
  defaultsMode?: __DefaultsMode | __Provider<__DefaultsMode>;
  signingEscapePath?: boolean;
  useArnRegion?: boolean | undefined | __Provider<boolean | undefined>;
  sdkStreamMixin?: __SdkStreamMixinInjector;
}
export type S3ClientConfigType = Partial<
  __SmithyConfiguration<__HttpHandlerOptions>
> &
  ClientDefaults &
  UserAgentInputConfig &
  FlexibleChecksumsInputConfig &
  RetryInputConfig &
  RegionInputConfig &
  HostHeaderInputConfig &
  EndpointInputConfig<EndpointParameters> &
  EventStreamSerdeInputConfig &
  HttpAuthSchemeInputConfig &
  S3InputConfig &
  ClientInputEndpointParameters;
export interface S3ClientConfig extends S3ClientConfigType {}
export type S3ClientResolvedConfigType =
  __SmithyResolvedConfiguration<__HttpHandlerOptions> &
    Required<ClientDefaults> &
    RuntimeExtensionsConfig &
    UserAgentResolvedConfig &
    FlexibleChecksumsResolvedConfig &
    RetryResolvedConfig &
    RegionResolvedConfig &
    HostHeaderResolvedConfig &
    EndpointResolvedConfig<EndpointParameters> &
    EventStreamSerdeResolvedConfig &
    HttpAuthSchemeResolvedConfig &
    S3ResolvedConfig &
    ClientResolvedEndpointParameters;
export interface S3ClientResolvedConfig extends S3ClientResolvedConfigType {}
export declare class S3Client extends __Client<
  __HttpHandlerOptions,
  ServiceInputTypes,
  ServiceOutputTypes,
  S3ClientResolvedConfig
> {
  readonly config: S3ClientResolvedConfig;
  constructor(...[configuration]: __CheckOptionalClientConfig<S3ClientConfig>);
  destroy(): void;
}
