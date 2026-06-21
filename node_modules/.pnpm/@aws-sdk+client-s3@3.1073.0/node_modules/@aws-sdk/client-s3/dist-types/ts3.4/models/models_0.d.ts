import { StreamingBlobTypes } from "@smithy/types";
import {
  AnalyticsS3ExportFileFormat,
  AnnotationConfigurationState,
  AnnotationDirective,
  ArchiveStatus,
  BucketAbacStatus,
  BucketAccelerateStatus,
  BucketCannedACL,
  BucketLocationConstraint,
  BucketLogsPermission,
  BucketNamespace,
  BucketType,
  BucketVersioningStatus,
  ChecksumAlgorithm,
  ChecksumMode,
  ChecksumType,
  DataRedundancy,
  DeleteMarkerReplicationStatus,
  EncodingType,
  EncryptionType,
  Event,
  ExistingObjectReplicationStatus,
  ExpirationState,
  ExpirationStatus,
  FilterRuleName,
  IntelligentTieringAccessTier,
  IntelligentTieringStatus,
  InventoryConfigurationState,
  InventoryFormat,
  InventoryFrequency,
  InventoryIncludedObjectVersions,
  InventoryOptionalField,
  LocationType,
  MetadataDirective,
  MetricsStatus,
  MFADelete,
  MFADeleteStatus,
  ObjectAttributes,
  ObjectCannedACL,
  ObjectLockEnabled,
  ObjectLockLegalHoldStatus,
  ObjectLockMode,
  ObjectLockRetentionMode,
  ObjectOwnership,
  ObjectStorageClass,
  ObjectVersionStorageClass,
  OptionalObjectAttributes,
  OwnerOverride,
  PartitionDateSource,
  Payer,
  Permission,
  Protocol,
  ReplicaModificationsStatus,
  ReplicationRuleStatus,
  ReplicationStatus,
  ReplicationTimeStatus,
  RequestCharged,
  RequestPayer,
  S3TablesBucketType,
  ServerSideEncryption,
  SessionMode,
  SseKmsEncryptedObjectsStatus,
  StorageClass,
  StorageClassAnalysisSchemaVersion,
  TableSseAlgorithm,
  TaggingDirective,
  TransitionDefaultMinimumObjectSize,
  TransitionStorageClass,
  Type,
} from "./enums";
export interface AbacStatus {
  Status?: BucketAbacStatus | undefined;
}
export interface AbortIncompleteMultipartUpload {
  DaysAfterInitiation?: number | undefined;
}
export interface AbortMultipartUploadOutput {
  RequestCharged?: RequestCharged | undefined;
}
export interface AbortMultipartUploadRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  UploadId: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
  IfMatchInitiatedTime?: Date | undefined;
}
export interface AccelerateConfiguration {
  Status?: BucketAccelerateStatus | undefined;
}
export interface Grantee {
  DisplayName?: string | undefined;
  EmailAddress?: string | undefined;
  ID?: string | undefined;
  URI?: string | undefined;
  Type: Type | undefined;
}
export interface Grant {
  Grantee?: Grantee | undefined;
  Permission?: Permission | undefined;
}
export interface Owner {
  DisplayName?: string | undefined;
  ID?: string | undefined;
}
export interface AccessControlPolicy {
  Grants?: Grant[] | undefined;
  Owner?: Owner | undefined;
}
export interface AccessControlTranslation {
  Owner: OwnerOverride | undefined;
}
export interface CompleteMultipartUploadOutput {
  Location?: string | undefined;
  Bucket?: string | undefined;
  Key?: string | undefined;
  Expiration?: string | undefined;
  ETag?: string | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  ChecksumType?: ChecksumType | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  VersionId?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface CompletedPart {
  ETag?: string | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  PartNumber?: number | undefined;
}
export interface CompletedMultipartUpload {
  Parts?: CompletedPart[] | undefined;
}
export interface CompleteMultipartUploadRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  MultipartUpload?: CompletedMultipartUpload | undefined;
  UploadId: string | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  ChecksumType?: ChecksumType | undefined;
  MpuObjectSize?: number | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
  IfMatch?: string | undefined;
  IfNoneMatch?: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
}
export interface CopyObjectResult {
  ETag?: string | undefined;
  LastModified?: Date | undefined;
  ChecksumType?: ChecksumType | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
}
export interface CopyObjectOutput {
  CopyObjectResult?: CopyObjectResult | undefined;
  Expiration?: string | undefined;
  CopySourceVersionId?: string | undefined;
  VersionId?: string | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  SSEKMSEncryptionContext?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface CopyObjectRequest {
  ACL?: ObjectCannedACL | undefined;
  Bucket: string | undefined;
  CacheControl?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ContentDisposition?: string | undefined;
  ContentEncoding?: string | undefined;
  ContentLanguage?: string | undefined;
  ContentType?: string | undefined;
  CopySource: string | undefined;
  CopySourceIfMatch?: string | undefined;
  CopySourceIfModifiedSince?: Date | undefined;
  CopySourceIfNoneMatch?: string | undefined;
  CopySourceIfUnmodifiedSince?: Date | undefined;
  Expires?: Date | undefined;
  GrantFullControl?: string | undefined;
  GrantRead?: string | undefined;
  GrantReadACP?: string | undefined;
  GrantWriteACP?: string | undefined;
  IfMatch?: string | undefined;
  IfNoneMatch?: string | undefined;
  Key: string | undefined;
  Metadata?: Record<string, string> | undefined;
  MetadataDirective?: MetadataDirective | undefined;
  TaggingDirective?: TaggingDirective | undefined;
  AnnotationDirective?: AnnotationDirective | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  StorageClass?: StorageClass | undefined;
  WebsiteRedirectLocation?: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  SSEKMSEncryptionContext?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  CopySourceSSECustomerAlgorithm?: string | undefined;
  CopySourceSSECustomerKey?: string | undefined;
  CopySourceSSECustomerKeyMD5?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  Tagging?: string | undefined;
  ObjectLockMode?: ObjectLockMode | undefined;
  ObjectLockRetainUntilDate?: Date | undefined;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus | undefined;
  ExpectedBucketOwner?: string | undefined;
  ExpectedSourceBucketOwner?: string | undefined;
}
export interface CreateBucketOutput {
  Location?: string | undefined;
  BucketArn?: string | undefined;
}
export interface BucketInfo {
  DataRedundancy?: DataRedundancy | undefined;
  Type?: BucketType | undefined;
}
export interface LocationInfo {
  Type?: LocationType | undefined;
  Name?: string | undefined;
}
export interface Tag {
  Key: string | undefined;
  Value: string | undefined;
}
export interface CreateBucketConfiguration {
  LocationConstraint?: BucketLocationConstraint | undefined;
  Location?: LocationInfo | undefined;
  Bucket?: BucketInfo | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateBucketRequest {
  ACL?: BucketCannedACL | undefined;
  Bucket: string | undefined;
  CreateBucketConfiguration?: CreateBucketConfiguration | undefined;
  GrantFullControl?: string | undefined;
  GrantRead?: string | undefined;
  GrantReadACP?: string | undefined;
  GrantWrite?: string | undefined;
  GrantWriteACP?: string | undefined;
  ObjectLockEnabledForBucket?: boolean | undefined;
  ObjectOwnership?: ObjectOwnership | undefined;
  BucketNamespace?: BucketNamespace | undefined;
}
export interface MetadataTableEncryptionConfiguration {
  SseAlgorithm: TableSseAlgorithm | undefined;
  KmsKeyArn?: string | undefined;
}
export interface AnnotationTableConfiguration {
  ConfigurationState: AnnotationConfigurationState | undefined;
  EncryptionConfiguration?: MetadataTableEncryptionConfiguration | undefined;
  Role?: string | undefined;
}
export interface InventoryTableConfiguration {
  ConfigurationState: InventoryConfigurationState | undefined;
  EncryptionConfiguration?: MetadataTableEncryptionConfiguration | undefined;
}
export interface RecordExpiration {
  Expiration: ExpirationState | undefined;
  Days?: number | undefined;
}
export interface JournalTableConfiguration {
  RecordExpiration: RecordExpiration | undefined;
  EncryptionConfiguration?: MetadataTableEncryptionConfiguration | undefined;
}
export interface MetadataConfiguration {
  JournalTableConfiguration: JournalTableConfiguration | undefined;
  InventoryTableConfiguration?: InventoryTableConfiguration | undefined;
  AnnotationTableConfiguration?: AnnotationTableConfiguration | undefined;
}
export interface CreateBucketMetadataConfigurationRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  MetadataConfiguration: MetadataConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface S3TablesDestination {
  TableBucketArn: string | undefined;
  TableName: string | undefined;
}
export interface MetadataTableConfiguration {
  S3TablesDestination: S3TablesDestination | undefined;
}
export interface CreateBucketMetadataTableConfigurationRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  MetadataTableConfiguration: MetadataTableConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface CreateMultipartUploadOutput {
  AbortDate?: Date | undefined;
  AbortRuleId?: string | undefined;
  Bucket?: string | undefined;
  Key?: string | undefined;
  UploadId?: string | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  SSEKMSEncryptionContext?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  RequestCharged?: RequestCharged | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ChecksumType?: ChecksumType | undefined;
}
export interface CreateMultipartUploadRequest {
  ACL?: ObjectCannedACL | undefined;
  Bucket: string | undefined;
  CacheControl?: string | undefined;
  ContentDisposition?: string | undefined;
  ContentEncoding?: string | undefined;
  ContentLanguage?: string | undefined;
  ContentType?: string | undefined;
  Expires?: Date | undefined;
  GrantFullControl?: string | undefined;
  GrantRead?: string | undefined;
  GrantReadACP?: string | undefined;
  GrantWriteACP?: string | undefined;
  Key: string | undefined;
  Metadata?: Record<string, string> | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  StorageClass?: StorageClass | undefined;
  WebsiteRedirectLocation?: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  SSEKMSEncryptionContext?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  RequestPayer?: RequestPayer | undefined;
  Tagging?: string | undefined;
  ObjectLockMode?: ObjectLockMode | undefined;
  ObjectLockRetainUntilDate?: Date | undefined;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus | undefined;
  ExpectedBucketOwner?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ChecksumType?: ChecksumType | undefined;
}
export interface SessionCredentials {
  AccessKeyId: string | undefined;
  SecretAccessKey: string | undefined;
  SessionToken: string | undefined;
  Expiration: Date | undefined;
}
export interface CreateSessionOutput {
  ServerSideEncryption?: ServerSideEncryption | undefined;
  SSEKMSKeyId?: string | undefined;
  SSEKMSEncryptionContext?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  Credentials: SessionCredentials | undefined;
}
export interface CreateSessionRequest {
  SessionMode?: SessionMode | undefined;
  Bucket: string | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  SSEKMSKeyId?: string | undefined;
  SSEKMSEncryptionContext?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
}
export interface DeleteBucketRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketAnalyticsConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketCorsRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketEncryptionRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketIntelligentTieringConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketInventoryConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketLifecycleRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketMetadataConfigurationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketMetadataTableConfigurationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketMetricsConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketOwnershipControlsRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketPolicyRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketReplicationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketTaggingRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteBucketWebsiteRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteObjectOutput {
  DeleteMarker?: boolean | undefined;
  VersionId?: string | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface DeleteObjectRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  MFA?: string | undefined;
  VersionId?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  BypassGovernanceRetention?: boolean | undefined;
  ExpectedBucketOwner?: string | undefined;
  IfMatch?: string | undefined;
  IfMatchLastModifiedTime?: Date | undefined;
  IfMatchSize?: number | undefined;
}
export interface DeleteObjectAnnotationOutput {
  ObjectVersionId?: string | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface DeleteObjectAnnotationRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  AnnotationName: string | undefined;
  VersionId?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
  ObjectIfMatch?: string | undefined;
}
export interface DeletedObject {
  Key?: string | undefined;
  VersionId?: string | undefined;
  DeleteMarker?: boolean | undefined;
  DeleteMarkerVersionId?: string | undefined;
}
export interface _Error {
  Key?: string | undefined;
  VersionId?: string | undefined;
  Code?: string | undefined;
  Message?: string | undefined;
}
export interface DeleteObjectsOutput {
  Deleted?: DeletedObject[] | undefined;
  RequestCharged?: RequestCharged | undefined;
  Errors?: _Error[] | undefined;
}
export interface ObjectIdentifier {
  Key: string | undefined;
  VersionId?: string | undefined;
  ETag?: string | undefined;
  LastModifiedTime?: Date | undefined;
  Size?: number | undefined;
}
export interface Delete {
  Objects: ObjectIdentifier[] | undefined;
  Quiet?: boolean | undefined;
}
export interface DeleteObjectsRequest {
  Bucket: string | undefined;
  Delete: Delete | undefined;
  MFA?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  BypassGovernanceRetention?: boolean | undefined;
  ExpectedBucketOwner?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
}
export interface DeleteObjectTaggingOutput {
  VersionId?: string | undefined;
}
export interface DeleteObjectTaggingRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeletePublicAccessBlockRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetBucketAbacOutput {
  AbacStatus?: AbacStatus | undefined;
}
export interface GetBucketAbacRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetBucketAccelerateConfigurationOutput {
  Status?: BucketAccelerateStatus | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface GetBucketAccelerateConfigurationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
}
export interface GetBucketAclOutput {
  Owner?: Owner | undefined;
  Grants?: Grant[] | undefined;
}
export interface GetBucketAclRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface AnalyticsAndOperator {
  Prefix?: string | undefined;
  Tags?: Tag[] | undefined;
}
export type AnalyticsFilter =
  | AnalyticsFilter.AndMember
  | AnalyticsFilter.PrefixMember
  | AnalyticsFilter.TagMember
  | AnalyticsFilter.$UnknownMember;
export declare namespace AnalyticsFilter {
  interface PrefixMember {
    Prefix: string;
    Tag?: never;
    And?: never;
    $unknown?: never;
  }
  interface TagMember {
    Prefix?: never;
    Tag: Tag;
    And?: never;
    $unknown?: never;
  }
  interface AndMember {
    Prefix?: never;
    Tag?: never;
    And: AnalyticsAndOperator;
    $unknown?: never;
  }
  interface $UnknownMember {
    Prefix?: never;
    Tag?: never;
    And?: never;
    $unknown: [string, any];
  }
  interface Visitor<T> {
    Prefix: (value: string) => T;
    Tag: (value: Tag) => T;
    And: (value: AnalyticsAndOperator) => T;
    _: (name: string, value: any) => T;
  }
}
export interface AnalyticsS3BucketDestination {
  Format: AnalyticsS3ExportFileFormat | undefined;
  BucketAccountId?: string | undefined;
  Bucket: string | undefined;
  Prefix?: string | undefined;
}
export interface AnalyticsExportDestination {
  S3BucketDestination: AnalyticsS3BucketDestination | undefined;
}
export interface StorageClassAnalysisDataExport {
  OutputSchemaVersion: StorageClassAnalysisSchemaVersion | undefined;
  Destination: AnalyticsExportDestination | undefined;
}
export interface StorageClassAnalysis {
  DataExport?: StorageClassAnalysisDataExport | undefined;
}
export interface AnalyticsConfiguration {
  Id: string | undefined;
  Filter?: AnalyticsFilter | undefined;
  StorageClassAnalysis: StorageClassAnalysis | undefined;
}
export interface GetBucketAnalyticsConfigurationOutput {
  AnalyticsConfiguration?: AnalyticsConfiguration | undefined;
}
export interface GetBucketAnalyticsConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface CORSRule {
  ID?: string | undefined;
  AllowedHeaders?: string[] | undefined;
  AllowedMethods: string[] | undefined;
  AllowedOrigins: string[] | undefined;
  ExposeHeaders?: string[] | undefined;
  MaxAgeSeconds?: number | undefined;
}
export interface GetBucketCorsOutput {
  CORSRules?: CORSRule[] | undefined;
}
export interface GetBucketCorsRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface ServerSideEncryptionByDefault {
  SSEAlgorithm: ServerSideEncryption | undefined;
  KMSMasterKeyID?: string | undefined;
}
export interface BlockedEncryptionTypes {
  EncryptionType?: EncryptionType[] | undefined;
}
export interface ServerSideEncryptionRule {
  ApplyServerSideEncryptionByDefault?:
    | ServerSideEncryptionByDefault
    | undefined;
  BucketKeyEnabled?: boolean | undefined;
  BlockedEncryptionTypes?: BlockedEncryptionTypes | undefined;
}
export interface ServerSideEncryptionConfiguration {
  Rules: ServerSideEncryptionRule[] | undefined;
}
export interface GetBucketEncryptionOutput {
  ServerSideEncryptionConfiguration?:
    | ServerSideEncryptionConfiguration
    | undefined;
}
export interface GetBucketEncryptionRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface IntelligentTieringAndOperator {
  Prefix?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface IntelligentTieringFilter {
  Prefix?: string | undefined;
  Tag?: Tag | undefined;
  And?: IntelligentTieringAndOperator | undefined;
}
export interface Tiering {
  Days: number | undefined;
  AccessTier: IntelligentTieringAccessTier | undefined;
}
export interface IntelligentTieringConfiguration {
  Id: string | undefined;
  Filter?: IntelligentTieringFilter | undefined;
  Status: IntelligentTieringStatus | undefined;
  Tierings: Tiering[] | undefined;
}
export interface GetBucketIntelligentTieringConfigurationOutput {
  IntelligentTieringConfiguration?: IntelligentTieringConfiguration | undefined;
}
export interface GetBucketIntelligentTieringConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface SSEKMS {
  KeyId: string | undefined;
}
export interface SSES3 {}
export interface InventoryEncryption {
  SSES3?: SSES3 | undefined;
  SSEKMS?: SSEKMS | undefined;
}
export interface InventoryS3BucketDestination {
  AccountId?: string | undefined;
  Bucket: string | undefined;
  Format: InventoryFormat | undefined;
  Prefix?: string | undefined;
  Encryption?: InventoryEncryption | undefined;
}
export interface InventoryDestination {
  S3BucketDestination: InventoryS3BucketDestination | undefined;
}
export interface InventoryFilter {
  Prefix: string | undefined;
}
export interface InventorySchedule {
  Frequency: InventoryFrequency | undefined;
}
export interface InventoryConfiguration {
  Destination: InventoryDestination | undefined;
  IsEnabled: boolean | undefined;
  Filter?: InventoryFilter | undefined;
  Id: string | undefined;
  IncludedObjectVersions: InventoryIncludedObjectVersions | undefined;
  OptionalFields?: InventoryOptionalField[] | undefined;
  Schedule: InventorySchedule | undefined;
}
export interface GetBucketInventoryConfigurationOutput {
  InventoryConfiguration?: InventoryConfiguration | undefined;
}
export interface GetBucketInventoryConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface LifecycleExpiration {
  Date?: Date | undefined;
  Days?: number | undefined;
  ExpiredObjectDeleteMarker?: boolean | undefined;
}
export interface LifecycleRuleAndOperator {
  Prefix?: string | undefined;
  Tags?: Tag[] | undefined;
  ObjectSizeGreaterThan?: number | undefined;
  ObjectSizeLessThan?: number | undefined;
}
export interface LifecycleRuleFilter {
  Prefix?: string | undefined;
  Tag?: Tag | undefined;
  ObjectSizeGreaterThan?: number | undefined;
  ObjectSizeLessThan?: number | undefined;
  And?: LifecycleRuleAndOperator | undefined;
}
export interface NoncurrentVersionExpiration {
  NoncurrentDays?: number | undefined;
  NewerNoncurrentVersions?: number | undefined;
}
export interface NoncurrentVersionTransition {
  NoncurrentDays?: number | undefined;
  StorageClass?: TransitionStorageClass | undefined;
  NewerNoncurrentVersions?: number | undefined;
}
export interface Transition {
  Date?: Date | undefined;
  Days?: number | undefined;
  StorageClass?: TransitionStorageClass | undefined;
}
export interface LifecycleRule {
  Expiration?: LifecycleExpiration | undefined;
  ID?: string | undefined;
  Prefix?: string | undefined;
  Filter?: LifecycleRuleFilter | undefined;
  Status: ExpirationStatus | undefined;
  Transitions?: Transition[] | undefined;
  NoncurrentVersionTransitions?: NoncurrentVersionTransition[] | undefined;
  NoncurrentVersionExpiration?: NoncurrentVersionExpiration | undefined;
  AbortIncompleteMultipartUpload?: AbortIncompleteMultipartUpload | undefined;
}
export interface GetBucketLifecycleConfigurationOutput {
  Rules?: LifecycleRule[] | undefined;
  TransitionDefaultMinimumObjectSize?:
    | TransitionDefaultMinimumObjectSize
    | undefined;
}
export interface GetBucketLifecycleConfigurationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetBucketLocationOutput {
  LocationConstraint?: BucketLocationConstraint | undefined;
}
export interface GetBucketLocationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface TargetGrant {
  Grantee?: Grantee | undefined;
  Permission?: BucketLogsPermission | undefined;
}
export interface PartitionedPrefix {
  PartitionDateSource?: PartitionDateSource | undefined;
}
export interface SimplePrefix {}
export interface TargetObjectKeyFormat {
  SimplePrefix?: SimplePrefix | undefined;
  PartitionedPrefix?: PartitionedPrefix | undefined;
}
export interface LoggingEnabled {
  TargetBucket: string | undefined;
  TargetGrants?: TargetGrant[] | undefined;
  TargetPrefix: string | undefined;
  TargetObjectKeyFormat?: TargetObjectKeyFormat | undefined;
}
export interface GetBucketLoggingOutput {
  LoggingEnabled?: LoggingEnabled | undefined;
}
export interface GetBucketLoggingRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface ErrorDetails {
  ErrorCode?: string | undefined;
  ErrorMessage?: string | undefined;
}
export interface AnnotationTableConfigurationResult {
  ConfigurationState: AnnotationConfigurationState | undefined;
  TableStatus?: string | undefined;
  Error?: ErrorDetails | undefined;
  TableName?: string | undefined;
  TableArn?: string | undefined;
  Role?: string | undefined;
}
export interface DestinationResult {
  TableBucketType?: S3TablesBucketType | undefined;
  TableBucketArn?: string | undefined;
  TableNamespace?: string | undefined;
}
export interface InventoryTableConfigurationResult {
  ConfigurationState: InventoryConfigurationState | undefined;
  TableStatus?: string | undefined;
  Error?: ErrorDetails | undefined;
  TableName?: string | undefined;
  TableArn?: string | undefined;
}
export interface JournalTableConfigurationResult {
  TableStatus: string | undefined;
  Error?: ErrorDetails | undefined;
  TableName: string | undefined;
  TableArn?: string | undefined;
  RecordExpiration: RecordExpiration | undefined;
}
export interface MetadataConfigurationResult {
  DestinationResult: DestinationResult | undefined;
  JournalTableConfigurationResult?: JournalTableConfigurationResult | undefined;
  InventoryTableConfigurationResult?:
    | InventoryTableConfigurationResult
    | undefined;
  AnnotationTableConfigurationResult?:
    | AnnotationTableConfigurationResult
    | undefined;
}
export interface GetBucketMetadataConfigurationResult {
  MetadataConfigurationResult: MetadataConfigurationResult | undefined;
}
export interface GetBucketMetadataConfigurationOutput {
  GetBucketMetadataConfigurationResult?:
    | GetBucketMetadataConfigurationResult
    | undefined;
}
export interface GetBucketMetadataConfigurationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface S3TablesDestinationResult {
  TableBucketArn: string | undefined;
  TableName: string | undefined;
  TableArn: string | undefined;
  TableNamespace: string | undefined;
}
export interface MetadataTableConfigurationResult {
  S3TablesDestinationResult: S3TablesDestinationResult | undefined;
}
export interface GetBucketMetadataTableConfigurationResult {
  MetadataTableConfigurationResult:
    | MetadataTableConfigurationResult
    | undefined;
  Status: string | undefined;
  Error?: ErrorDetails | undefined;
}
export interface GetBucketMetadataTableConfigurationOutput {
  GetBucketMetadataTableConfigurationResult?:
    | GetBucketMetadataTableConfigurationResult
    | undefined;
}
export interface GetBucketMetadataTableConfigurationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface MetricsAndOperator {
  Prefix?: string | undefined;
  Tags?: Tag[] | undefined;
  AccessPointArn?: string | undefined;
}
export type MetricsFilter =
  | MetricsFilter.AccessPointArnMember
  | MetricsFilter.AndMember
  | MetricsFilter.PrefixMember
  | MetricsFilter.TagMember
  | MetricsFilter.$UnknownMember;
export declare namespace MetricsFilter {
  interface PrefixMember {
    Prefix: string;
    Tag?: never;
    AccessPointArn?: never;
    And?: never;
    $unknown?: never;
  }
  interface TagMember {
    Prefix?: never;
    Tag: Tag;
    AccessPointArn?: never;
    And?: never;
    $unknown?: never;
  }
  interface AccessPointArnMember {
    Prefix?: never;
    Tag?: never;
    AccessPointArn: string;
    And?: never;
    $unknown?: never;
  }
  interface AndMember {
    Prefix?: never;
    Tag?: never;
    AccessPointArn?: never;
    And: MetricsAndOperator;
    $unknown?: never;
  }
  interface $UnknownMember {
    Prefix?: never;
    Tag?: never;
    AccessPointArn?: never;
    And?: never;
    $unknown: [string, any];
  }
  interface Visitor<T> {
    Prefix: (value: string) => T;
    Tag: (value: Tag) => T;
    AccessPointArn: (value: string) => T;
    And: (value: MetricsAndOperator) => T;
    _: (name: string, value: any) => T;
  }
}
export interface MetricsConfiguration {
  Id: string | undefined;
  Filter?: MetricsFilter | undefined;
}
export interface GetBucketMetricsConfigurationOutput {
  MetricsConfiguration?: MetricsConfiguration | undefined;
}
export interface GetBucketMetricsConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetBucketNotificationConfigurationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface EventBridgeConfiguration {}
export interface FilterRule {
  Name?: FilterRuleName | undefined;
  Value?: string | undefined;
}
export interface S3KeyFilter {
  FilterRules?: FilterRule[] | undefined;
}
export interface NotificationConfigurationFilter {
  Key?: S3KeyFilter | undefined;
}
export interface LambdaFunctionConfiguration {
  Id?: string | undefined;
  LambdaFunctionArn: string | undefined;
  Events: Event[] | undefined;
  Filter?: NotificationConfigurationFilter | undefined;
}
export interface QueueConfiguration {
  Id?: string | undefined;
  QueueArn: string | undefined;
  Events: Event[] | undefined;
  Filter?: NotificationConfigurationFilter | undefined;
}
export interface TopicConfiguration {
  Id?: string | undefined;
  TopicArn: string | undefined;
  Events: Event[] | undefined;
  Filter?: NotificationConfigurationFilter | undefined;
}
export interface NotificationConfiguration {
  TopicConfigurations?: TopicConfiguration[] | undefined;
  QueueConfigurations?: QueueConfiguration[] | undefined;
  LambdaFunctionConfigurations?: LambdaFunctionConfiguration[] | undefined;
  EventBridgeConfiguration?: EventBridgeConfiguration | undefined;
}
export interface OwnershipControlsRule {
  ObjectOwnership: ObjectOwnership | undefined;
}
export interface OwnershipControls {
  Rules: OwnershipControlsRule[] | undefined;
}
export interface GetBucketOwnershipControlsOutput {
  OwnershipControls?: OwnershipControls | undefined;
}
export interface GetBucketOwnershipControlsRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetBucketPolicyOutput {
  Policy?: string | undefined;
}
export interface GetBucketPolicyRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PolicyStatus {
  IsPublic?: boolean | undefined;
}
export interface GetBucketPolicyStatusOutput {
  PolicyStatus?: PolicyStatus | undefined;
}
export interface GetBucketPolicyStatusRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DeleteMarkerReplication {
  Status?: DeleteMarkerReplicationStatus | undefined;
}
export interface EncryptionConfiguration {
  ReplicaKmsKeyID?: string | undefined;
}
export interface ReplicationTimeValue {
  Minutes?: number | undefined;
}
export interface Metrics {
  Status: MetricsStatus | undefined;
  EventThreshold?: ReplicationTimeValue | undefined;
}
export interface ReplicationTime {
  Status: ReplicationTimeStatus | undefined;
  Time: ReplicationTimeValue | undefined;
}
export interface Destination {
  Bucket: string | undefined;
  Account?: string | undefined;
  StorageClass?: StorageClass | undefined;
  AccessControlTranslation?: AccessControlTranslation | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  ReplicationTime?: ReplicationTime | undefined;
  Metrics?: Metrics | undefined;
}
export interface ExistingObjectReplication {
  Status: ExistingObjectReplicationStatus | undefined;
}
export interface ReplicationRuleAndOperator {
  Prefix?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface ReplicationRuleFilter {
  Prefix?: string | undefined;
  Tag?: Tag | undefined;
  And?: ReplicationRuleAndOperator | undefined;
}
export interface ReplicaModifications {
  Status: ReplicaModificationsStatus | undefined;
}
export interface SseKmsEncryptedObjects {
  Status: SseKmsEncryptedObjectsStatus | undefined;
}
export interface SourceSelectionCriteria {
  SseKmsEncryptedObjects?: SseKmsEncryptedObjects | undefined;
  ReplicaModifications?: ReplicaModifications | undefined;
}
export interface ReplicationRule {
  ID?: string | undefined;
  Priority?: number | undefined;
  Prefix?: string | undefined;
  Filter?: ReplicationRuleFilter | undefined;
  Status: ReplicationRuleStatus | undefined;
  SourceSelectionCriteria?: SourceSelectionCriteria | undefined;
  ExistingObjectReplication?: ExistingObjectReplication | undefined;
  Destination: Destination | undefined;
  DeleteMarkerReplication?: DeleteMarkerReplication | undefined;
}
export interface ReplicationConfiguration {
  Role: string | undefined;
  Rules: ReplicationRule[] | undefined;
}
export interface GetBucketReplicationOutput {
  ReplicationConfiguration?: ReplicationConfiguration | undefined;
}
export interface GetBucketReplicationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetBucketRequestPaymentOutput {
  Payer?: Payer | undefined;
}
export interface GetBucketRequestPaymentRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetBucketTaggingOutput {
  TagSet: Tag[] | undefined;
}
export interface GetBucketTaggingRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetBucketVersioningOutput {
  Status?: BucketVersioningStatus | undefined;
  MFADelete?: MFADeleteStatus | undefined;
}
export interface GetBucketVersioningRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface ErrorDocument {
  Key: string | undefined;
}
export interface IndexDocument {
  Suffix: string | undefined;
}
export interface RedirectAllRequestsTo {
  HostName: string | undefined;
  Protocol?: Protocol | undefined;
}
export interface Condition {
  HttpErrorCodeReturnedEquals?: string | undefined;
  KeyPrefixEquals?: string | undefined;
}
export interface Redirect {
  HostName?: string | undefined;
  HttpRedirectCode?: string | undefined;
  Protocol?: Protocol | undefined;
  ReplaceKeyPrefixWith?: string | undefined;
  ReplaceKeyWith?: string | undefined;
}
export interface RoutingRule {
  Condition?: Condition | undefined;
  Redirect: Redirect | undefined;
}
export interface GetBucketWebsiteOutput {
  RedirectAllRequestsTo?: RedirectAllRequestsTo | undefined;
  IndexDocument?: IndexDocument | undefined;
  ErrorDocument?: ErrorDocument | undefined;
  RoutingRules?: RoutingRule[] | undefined;
}
export interface GetBucketWebsiteRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetObjectOutput {
  Body?: StreamingBlobTypes | undefined;
  DeleteMarker?: boolean | undefined;
  AcceptRanges?: string | undefined;
  Expiration?: string | undefined;
  Restore?: string | undefined;
  LastModified?: Date | undefined;
  ContentLength?: number | undefined;
  ETag?: string | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  ChecksumType?: ChecksumType | undefined;
  MissingMeta?: number | undefined;
  VersionId?: string | undefined;
  CacheControl?: string | undefined;
  ContentDisposition?: string | undefined;
  ContentEncoding?: string | undefined;
  ContentLanguage?: string | undefined;
  ContentRange?: string | undefined;
  ContentType?: string | undefined;
  Expires?: Date | undefined;
  ExpiresString?: string | undefined;
  WebsiteRedirectLocation?: string | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  Metadata?: Record<string, string> | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  StorageClass?: StorageClass | undefined;
  RequestCharged?: RequestCharged | undefined;
  ReplicationStatus?: ReplicationStatus | undefined;
  PartsCount?: number | undefined;
  TagCount?: number | undefined;
  ObjectLockMode?: ObjectLockMode | undefined;
  ObjectLockRetainUntilDate?: Date | undefined;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus | undefined;
}
export interface GetObjectRequest {
  Bucket: string | undefined;
  IfMatch?: string | undefined;
  IfModifiedSince?: Date | undefined;
  IfNoneMatch?: string | undefined;
  IfUnmodifiedSince?: Date | undefined;
  Key: string | undefined;
  Range?: string | undefined;
  ResponseCacheControl?: string | undefined;
  ResponseContentDisposition?: string | undefined;
  ResponseContentEncoding?: string | undefined;
  ResponseContentLanguage?: string | undefined;
  ResponseContentType?: string | undefined;
  ResponseExpires?: Date | undefined;
  VersionId?: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  PartNumber?: number | undefined;
  ExpectedBucketOwner?: string | undefined;
  ChecksumMode?: ChecksumMode | undefined;
}
export interface GetObjectAclOutput {
  Owner?: Owner | undefined;
  Grants?: Grant[] | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface GetObjectAclRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetObjectAnnotationOutput {
  AnnotationPayload?: StreamingBlobTypes | undefined;
  ObjectVersionId?: string | undefined;
  LastModified?: Date | undefined;
  ContentLength?: number | undefined;
  ETag?: string | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  ChecksumType?: ChecksumType | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  RequestCharged?: RequestCharged | undefined;
  ReplicationStatus?: ReplicationStatus | undefined;
}
export interface GetObjectAnnotationRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  AnnotationName: string | undefined;
  VersionId?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
  ChecksumMode?: ChecksumMode | undefined;
}
export interface Checksum {
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  ChecksumType?: ChecksumType | undefined;
}
export interface ObjectPart {
  PartNumber?: number | undefined;
  Size?: number | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
}
export interface GetObjectAttributesParts {
  TotalPartsCount?: number | undefined;
  PartNumberMarker?: string | undefined;
  NextPartNumberMarker?: string | undefined;
  MaxParts?: number | undefined;
  IsTruncated?: boolean | undefined;
  Parts?: ObjectPart[] | undefined;
}
export interface GetObjectAttributesOutput {
  DeleteMarker?: boolean | undefined;
  LastModified?: Date | undefined;
  VersionId?: string | undefined;
  RequestCharged?: RequestCharged | undefined;
  ETag?: string | undefined;
  Checksum?: Checksum | undefined;
  ObjectParts?: GetObjectAttributesParts | undefined;
  StorageClass?: StorageClass | undefined;
  ObjectSize?: number | undefined;
}
export interface GetObjectAttributesRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  MaxParts?: number | undefined;
  PartNumberMarker?: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
  ObjectAttributes: ObjectAttributes[] | undefined;
}
export interface ObjectLockLegalHold {
  Status?: ObjectLockLegalHoldStatus | undefined;
}
export interface GetObjectLegalHoldOutput {
  LegalHold?: ObjectLockLegalHold | undefined;
}
export interface GetObjectLegalHoldRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface DefaultRetention {
  Mode?: ObjectLockRetentionMode | undefined;
  Days?: number | undefined;
  Years?: number | undefined;
}
export interface ObjectLockRule {
  DefaultRetention?: DefaultRetention | undefined;
}
export interface ObjectLockConfiguration {
  ObjectLockEnabled?: ObjectLockEnabled | undefined;
  Rule?: ObjectLockRule | undefined;
}
export interface GetObjectLockConfigurationOutput {
  ObjectLockConfiguration?: ObjectLockConfiguration | undefined;
}
export interface GetObjectLockConfigurationRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface ObjectLockRetention {
  Mode?: ObjectLockRetentionMode | undefined;
  RetainUntilDate?: Date | undefined;
}
export interface GetObjectRetentionOutput {
  Retention?: ObjectLockRetention | undefined;
}
export interface GetObjectRetentionRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface GetObjectTaggingOutput {
  VersionId?: string | undefined;
  TagSet: Tag[] | undefined;
}
export interface GetObjectTaggingRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
}
export interface GetObjectTorrentOutput {
  Body?: StreamingBlobTypes | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface GetObjectTorrentRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PublicAccessBlockConfiguration {
  BlockPublicAcls?: boolean | undefined;
  IgnorePublicAcls?: boolean | undefined;
  BlockPublicPolicy?: boolean | undefined;
  RestrictPublicBuckets?: boolean | undefined;
}
export interface GetPublicAccessBlockOutput {
  PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration | undefined;
}
export interface GetPublicAccessBlockRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface HeadBucketOutput {
  BucketArn?: string | undefined;
  BucketLocationType?: LocationType | undefined;
  BucketLocationName?: string | undefined;
  BucketRegion?: string | undefined;
  AccessPointAlias?: boolean | undefined;
}
export interface HeadBucketRequest {
  Bucket: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface HeadObjectOutput {
  DeleteMarker?: boolean | undefined;
  AcceptRanges?: string | undefined;
  Expiration?: string | undefined;
  Restore?: string | undefined;
  ArchiveStatus?: ArchiveStatus | undefined;
  LastModified?: Date | undefined;
  ContentLength?: number | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  ChecksumType?: ChecksumType | undefined;
  ETag?: string | undefined;
  MissingMeta?: number | undefined;
  VersionId?: string | undefined;
  CacheControl?: string | undefined;
  ContentDisposition?: string | undefined;
  ContentEncoding?: string | undefined;
  ContentLanguage?: string | undefined;
  ContentType?: string | undefined;
  ContentRange?: string | undefined;
  Expires?: Date | undefined;
  ExpiresString?: string | undefined;
  WebsiteRedirectLocation?: string | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  Metadata?: Record<string, string> | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  StorageClass?: StorageClass | undefined;
  RequestCharged?: RequestCharged | undefined;
  ReplicationStatus?: ReplicationStatus | undefined;
  PartsCount?: number | undefined;
  TagCount?: number | undefined;
  ObjectLockMode?: ObjectLockMode | undefined;
  ObjectLockRetainUntilDate?: Date | undefined;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus | undefined;
}
export interface HeadObjectRequest {
  Bucket: string | undefined;
  IfMatch?: string | undefined;
  IfModifiedSince?: Date | undefined;
  IfNoneMatch?: string | undefined;
  IfUnmodifiedSince?: Date | undefined;
  Key: string | undefined;
  Range?: string | undefined;
  ResponseCacheControl?: string | undefined;
  ResponseContentDisposition?: string | undefined;
  ResponseContentEncoding?: string | undefined;
  ResponseContentLanguage?: string | undefined;
  ResponseContentType?: string | undefined;
  ResponseExpires?: Date | undefined;
  VersionId?: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  PartNumber?: number | undefined;
  ExpectedBucketOwner?: string | undefined;
  ChecksumMode?: ChecksumMode | undefined;
}
export interface ListBucketAnalyticsConfigurationsOutput {
  IsTruncated?: boolean | undefined;
  ContinuationToken?: string | undefined;
  NextContinuationToken?: string | undefined;
  AnalyticsConfigurationList?: AnalyticsConfiguration[] | undefined;
}
export interface ListBucketAnalyticsConfigurationsRequest {
  Bucket: string | undefined;
  ContinuationToken?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface ListBucketIntelligentTieringConfigurationsOutput {
  IsTruncated?: boolean | undefined;
  ContinuationToken?: string | undefined;
  NextContinuationToken?: string | undefined;
  IntelligentTieringConfigurationList?:
    | IntelligentTieringConfiguration[]
    | undefined;
}
export interface ListBucketIntelligentTieringConfigurationsRequest {
  Bucket: string | undefined;
  ContinuationToken?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface ListBucketInventoryConfigurationsOutput {
  ContinuationToken?: string | undefined;
  InventoryConfigurationList?: InventoryConfiguration[] | undefined;
  IsTruncated?: boolean | undefined;
  NextContinuationToken?: string | undefined;
}
export interface ListBucketInventoryConfigurationsRequest {
  Bucket: string | undefined;
  ContinuationToken?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface ListBucketMetricsConfigurationsOutput {
  IsTruncated?: boolean | undefined;
  ContinuationToken?: string | undefined;
  NextContinuationToken?: string | undefined;
  MetricsConfigurationList?: MetricsConfiguration[] | undefined;
}
export interface ListBucketMetricsConfigurationsRequest {
  Bucket: string | undefined;
  ContinuationToken?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface Bucket {
  Name?: string | undefined;
  CreationDate?: Date | undefined;
  BucketRegion?: string | undefined;
  BucketArn?: string | undefined;
}
export interface ListBucketsOutput {
  Buckets?: Bucket[] | undefined;
  Owner?: Owner | undefined;
  ContinuationToken?: string | undefined;
  Prefix?: string | undefined;
}
export interface ListBucketsRequest {
  MaxBuckets?: number | undefined;
  ContinuationToken?: string | undefined;
  Prefix?: string | undefined;
  BucketRegion?: string | undefined;
}
export interface ListDirectoryBucketsOutput {
  Buckets?: Bucket[] | undefined;
  ContinuationToken?: string | undefined;
}
export interface ListDirectoryBucketsRequest {
  ContinuationToken?: string | undefined;
  MaxDirectoryBuckets?: number | undefined;
}
export interface CommonPrefix {
  Prefix?: string | undefined;
}
export interface Initiator {
  ID?: string | undefined;
  DisplayName?: string | undefined;
}
export interface MultipartUpload {
  UploadId?: string | undefined;
  Key?: string | undefined;
  Initiated?: Date | undefined;
  StorageClass?: StorageClass | undefined;
  Owner?: Owner | undefined;
  Initiator?: Initiator | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ChecksumType?: ChecksumType | undefined;
}
export interface ListMultipartUploadsOutput {
  Bucket?: string | undefined;
  KeyMarker?: string | undefined;
  UploadIdMarker?: string | undefined;
  NextKeyMarker?: string | undefined;
  Prefix?: string | undefined;
  Delimiter?: string | undefined;
  NextUploadIdMarker?: string | undefined;
  MaxUploads?: number | undefined;
  IsTruncated?: boolean | undefined;
  Uploads?: MultipartUpload[] | undefined;
  CommonPrefixes?: CommonPrefix[] | undefined;
  EncodingType?: EncodingType | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface ListMultipartUploadsRequest {
  Bucket: string | undefined;
  Delimiter?: string | undefined;
  EncodingType?: EncodingType | undefined;
  KeyMarker?: string | undefined;
  MaxUploads?: number | undefined;
  Prefix?: string | undefined;
  UploadIdMarker?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
}
export interface AnnotationEntry {
  AnnotationName: string | undefined;
  LastModified: Date | undefined;
  ETag?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm[] | undefined;
  Size: number | undefined;
  ReplicationStatus?: ReplicationStatus | undefined;
}
export interface ListObjectAnnotationsOutput {
  Annotations?: AnnotationEntry[] | undefined;
  Bucket?: string | undefined;
  Key?: string | undefined;
  ObjectVersionId?: string | undefined;
  AnnotationPrefix?: string | undefined;
  MaxAnnotationResults?: number | undefined;
  AnnotationCount?: number | undefined;
  ContinuationToken?: string | undefined;
  NextContinuationToken?: string | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface ListObjectAnnotationsRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  MaxAnnotationResults?: number | undefined;
  AnnotationPrefix?: string | undefined;
  ContinuationToken?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface RestoreStatus {
  IsRestoreInProgress?: boolean | undefined;
  RestoreExpiryDate?: Date | undefined;
}
export interface _Object {
  Key?: string | undefined;
  LastModified?: Date | undefined;
  ETag?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm[] | undefined;
  ChecksumType?: ChecksumType | undefined;
  Size?: number | undefined;
  StorageClass?: ObjectStorageClass | undefined;
  Owner?: Owner | undefined;
  RestoreStatus?: RestoreStatus | undefined;
}
export interface ListObjectsOutput {
  IsTruncated?: boolean | undefined;
  Marker?: string | undefined;
  NextMarker?: string | undefined;
  Contents?: _Object[] | undefined;
  Name?: string | undefined;
  Prefix?: string | undefined;
  Delimiter?: string | undefined;
  MaxKeys?: number | undefined;
  CommonPrefixes?: CommonPrefix[] | undefined;
  EncodingType?: EncodingType | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface ListObjectsRequest {
  Bucket: string | undefined;
  Delimiter?: string | undefined;
  EncodingType?: EncodingType | undefined;
  Marker?: string | undefined;
  MaxKeys?: number | undefined;
  Prefix?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
  OptionalObjectAttributes?: OptionalObjectAttributes[] | undefined;
}
export interface ListObjectsV2Output {
  IsTruncated?: boolean | undefined;
  Contents?: _Object[] | undefined;
  Name?: string | undefined;
  Prefix?: string | undefined;
  Delimiter?: string | undefined;
  MaxKeys?: number | undefined;
  CommonPrefixes?: CommonPrefix[] | undefined;
  EncodingType?: EncodingType | undefined;
  KeyCount?: number | undefined;
  ContinuationToken?: string | undefined;
  NextContinuationToken?: string | undefined;
  StartAfter?: string | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface ListObjectsV2Request {
  Bucket: string | undefined;
  Delimiter?: string | undefined;
  EncodingType?: EncodingType | undefined;
  MaxKeys?: number | undefined;
  Prefix?: string | undefined;
  ContinuationToken?: string | undefined;
  FetchOwner?: boolean | undefined;
  StartAfter?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
  OptionalObjectAttributes?: OptionalObjectAttributes[] | undefined;
}
export interface DeleteMarkerEntry {
  Owner?: Owner | undefined;
  Key?: string | undefined;
  VersionId?: string | undefined;
  IsLatest?: boolean | undefined;
  LastModified?: Date | undefined;
}
export interface ObjectVersion {
  ETag?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm[] | undefined;
  ChecksumType?: ChecksumType | undefined;
  Size?: number | undefined;
  StorageClass?: ObjectVersionStorageClass | undefined;
  Key?: string | undefined;
  VersionId?: string | undefined;
  IsLatest?: boolean | undefined;
  LastModified?: Date | undefined;
  Owner?: Owner | undefined;
  RestoreStatus?: RestoreStatus | undefined;
}
export interface ListObjectVersionsOutput {
  IsTruncated?: boolean | undefined;
  KeyMarker?: string | undefined;
  VersionIdMarker?: string | undefined;
  NextKeyMarker?: string | undefined;
  NextVersionIdMarker?: string | undefined;
  Versions?: ObjectVersion[] | undefined;
  DeleteMarkers?: DeleteMarkerEntry[] | undefined;
  Name?: string | undefined;
  Prefix?: string | undefined;
  Delimiter?: string | undefined;
  MaxKeys?: number | undefined;
  CommonPrefixes?: CommonPrefix[] | undefined;
  EncodingType?: EncodingType | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface ListObjectVersionsRequest {
  Bucket: string | undefined;
  Delimiter?: string | undefined;
  EncodingType?: EncodingType | undefined;
  KeyMarker?: string | undefined;
  MaxKeys?: number | undefined;
  Prefix?: string | undefined;
  VersionIdMarker?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  OptionalObjectAttributes?: OptionalObjectAttributes[] | undefined;
}
export interface Part {
  PartNumber?: number | undefined;
  LastModified?: Date | undefined;
  ETag?: string | undefined;
  Size?: number | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
}
export interface ListPartsOutput {
  AbortDate?: Date | undefined;
  AbortRuleId?: string | undefined;
  Bucket?: string | undefined;
  Key?: string | undefined;
  UploadId?: string | undefined;
  PartNumberMarker?: string | undefined;
  NextPartNumberMarker?: string | undefined;
  MaxParts?: number | undefined;
  IsTruncated?: boolean | undefined;
  Parts?: Part[] | undefined;
  Initiator?: Initiator | undefined;
  Owner?: Owner | undefined;
  StorageClass?: StorageClass | undefined;
  RequestCharged?: RequestCharged | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ChecksumType?: ChecksumType | undefined;
}
export interface ListPartsRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  MaxParts?: number | undefined;
  PartNumberMarker?: string | undefined;
  UploadId: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
}
export interface PutBucketAbacRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ExpectedBucketOwner?: string | undefined;
  AbacStatus: AbacStatus | undefined;
}
export interface PutBucketAccelerateConfigurationRequest {
  Bucket: string | undefined;
  AccelerateConfiguration: AccelerateConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
}
export interface PutBucketAclRequest {
  ACL?: BucketCannedACL | undefined;
  AccessControlPolicy?: AccessControlPolicy | undefined;
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  GrantFullControl?: string | undefined;
  GrantRead?: string | undefined;
  GrantReadACP?: string | undefined;
  GrantWrite?: string | undefined;
  GrantWriteACP?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutBucketAnalyticsConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  AnalyticsConfiguration: AnalyticsConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface CORSConfiguration {
  CORSRules: CORSRule[] | undefined;
}
export interface PutBucketCorsRequest {
  Bucket: string | undefined;
  CORSConfiguration: CORSConfiguration | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutBucketEncryptionRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ServerSideEncryptionConfiguration:
    | ServerSideEncryptionConfiguration
    | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutBucketIntelligentTieringConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  ExpectedBucketOwner?: string | undefined;
  IntelligentTieringConfiguration: IntelligentTieringConfiguration | undefined;
}
export interface PutBucketInventoryConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  InventoryConfiguration: InventoryConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutBucketLifecycleConfigurationOutput {
  TransitionDefaultMinimumObjectSize?:
    | TransitionDefaultMinimumObjectSize
    | undefined;
}
export interface BucketLifecycleConfiguration {
  Rules: LifecycleRule[] | undefined;
}
export interface PutBucketLifecycleConfigurationRequest {
  Bucket: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  LifecycleConfiguration?: BucketLifecycleConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
  TransitionDefaultMinimumObjectSize?:
    | TransitionDefaultMinimumObjectSize
    | undefined;
}
export interface BucketLoggingStatus {
  LoggingEnabled?: LoggingEnabled | undefined;
}
export interface PutBucketLoggingRequest {
  Bucket: string | undefined;
  BucketLoggingStatus: BucketLoggingStatus | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutBucketMetricsConfigurationRequest {
  Bucket: string | undefined;
  Id: string | undefined;
  MetricsConfiguration: MetricsConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutBucketNotificationConfigurationRequest {
  Bucket: string | undefined;
  NotificationConfiguration: NotificationConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
  SkipDestinationValidation?: boolean | undefined;
}
export interface PutBucketOwnershipControlsRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
  OwnershipControls: OwnershipControls | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
}
export interface PutBucketPolicyRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ConfirmRemoveSelfBucketAccess?: boolean | undefined;
  Policy: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutBucketReplicationRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ReplicationConfiguration: ReplicationConfiguration | undefined;
  Token?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface RequestPaymentConfiguration {
  Payer: Payer | undefined;
}
export interface PutBucketRequestPaymentRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  RequestPaymentConfiguration: RequestPaymentConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface Tagging {
  TagSet: Tag[] | undefined;
}
export interface PutBucketTaggingRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  Tagging: Tagging | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface VersioningConfiguration {
  MFADelete?: MFADelete | undefined;
  Status?: BucketVersioningStatus | undefined;
}
export interface PutBucketVersioningRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  MFA?: string | undefined;
  VersioningConfiguration: VersioningConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface WebsiteConfiguration {
  ErrorDocument?: ErrorDocument | undefined;
  IndexDocument?: IndexDocument | undefined;
  RedirectAllRequestsTo?: RedirectAllRequestsTo | undefined;
  RoutingRules?: RoutingRule[] | undefined;
}
export interface PutBucketWebsiteRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  WebsiteConfiguration: WebsiteConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutObjectOutput {
  Expiration?: string | undefined;
  ETag?: string | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  ChecksumType?: ChecksumType | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  VersionId?: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  SSEKMSEncryptionContext?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  Size?: number | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface PutObjectRequest {
  ACL?: ObjectCannedACL | undefined;
  Body?: StreamingBlobTypes | undefined;
  Bucket: string | undefined;
  CacheControl?: string | undefined;
  ContentDisposition?: string | undefined;
  ContentEncoding?: string | undefined;
  ContentLanguage?: string | undefined;
  ContentLength?: number | undefined;
  ContentMD5?: string | undefined;
  ContentType?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  Expires?: Date | undefined;
  IfMatch?: string | undefined;
  IfNoneMatch?: string | undefined;
  GrantFullControl?: string | undefined;
  GrantRead?: string | undefined;
  GrantReadACP?: string | undefined;
  GrantWriteACP?: string | undefined;
  Key: string | undefined;
  WriteOffsetBytes?: number | undefined;
  Metadata?: Record<string, string> | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  StorageClass?: StorageClass | undefined;
  WebsiteRedirectLocation?: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  SSEKMSEncryptionContext?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  RequestPayer?: RequestPayer | undefined;
  Tagging?: string | undefined;
  ObjectLockMode?: ObjectLockMode | undefined;
  ObjectLockRetainUntilDate?: Date | undefined;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutObjectAclOutput {
  RequestCharged?: RequestCharged | undefined;
}
export interface PutObjectAclRequest {
  ACL?: ObjectCannedACL | undefined;
  AccessControlPolicy?: AccessControlPolicy | undefined;
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  GrantFullControl?: string | undefined;
  GrantRead?: string | undefined;
  GrantReadACP?: string | undefined;
  GrantWrite?: string | undefined;
  GrantWriteACP?: string | undefined;
  Key: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  VersionId?: string | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutObjectAnnotationOutput {
  Key?: string | undefined;
  AnnotationName?: string | undefined;
  ObjectVersionId?: string | undefined;
  ETag?: string | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  ChecksumType?: ChecksumType | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface PutObjectAnnotationRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  AnnotationName: string | undefined;
  AnnotationPayload: StreamingBlobTypes | undefined;
  ObjectIfMatch?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ChecksumCRC32?: string | undefined;
  ChecksumCRC32C?: string | undefined;
  ChecksumCRC64NVME?: string | undefined;
  ChecksumSHA1?: string | undefined;
  ChecksumSHA256?: string | undefined;
  ChecksumSHA512?: string | undefined;
  ChecksumMD5?: string | undefined;
  ChecksumXXHASH64?: string | undefined;
  ChecksumXXHASH3?: string | undefined;
  ChecksumXXHASH128?: string | undefined;
  ContentMD5?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutObjectLegalHoldOutput {
  RequestCharged?: RequestCharged | undefined;
}
export interface PutObjectLegalHoldRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  LegalHold?: ObjectLockLegalHold | undefined;
  RequestPayer?: RequestPayer | undefined;
  VersionId?: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutObjectLockConfigurationOutput {
  RequestCharged?: RequestCharged | undefined;
}
export interface PutObjectLockConfigurationRequest {
  Bucket: string | undefined;
  ObjectLockConfiguration?: ObjectLockConfiguration | undefined;
  RequestPayer?: RequestPayer | undefined;
  Token?: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutObjectRetentionOutput {
  RequestCharged?: RequestCharged | undefined;
}
export interface PutObjectRetentionRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  Retention?: ObjectLockRetention | undefined;
  RequestPayer?: RequestPayer | undefined;
  VersionId?: string | undefined;
  BypassGovernanceRetention?: boolean | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface PutObjectTaggingOutput {
  VersionId?: string | undefined;
}
export interface PutObjectTaggingRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  Tagging: Tagging | undefined;
  ExpectedBucketOwner?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
}
export interface PutPublicAccessBlockRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  PublicAccessBlockConfiguration: PublicAccessBlockConfiguration | undefined;
  ExpectedBucketOwner?: string | undefined;
}
