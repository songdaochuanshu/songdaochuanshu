export declare const BucketAbacStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type BucketAbacStatus =
  (typeof BucketAbacStatus)[keyof typeof BucketAbacStatus];
export declare const RequestCharged: {
  readonly requester: "requester";
};
export type RequestCharged =
  (typeof RequestCharged)[keyof typeof RequestCharged];
export declare const RequestPayer: {
  readonly requester: "requester";
};
export type RequestPayer = (typeof RequestPayer)[keyof typeof RequestPayer];
export declare const BucketAccelerateStatus: {
  readonly Enabled: "Enabled";
  readonly Suspended: "Suspended";
};
export type BucketAccelerateStatus =
  (typeof BucketAccelerateStatus)[keyof typeof BucketAccelerateStatus];
export declare const Type: {
  readonly AmazonCustomerByEmail: "AmazonCustomerByEmail";
  readonly CanonicalUser: "CanonicalUser";
  readonly Group: "Group";
};
export type Type = (typeof Type)[keyof typeof Type];
export declare const Permission: {
  readonly FULL_CONTROL: "FULL_CONTROL";
  readonly READ: "READ";
  readonly READ_ACP: "READ_ACP";
  readonly WRITE: "WRITE";
  readonly WRITE_ACP: "WRITE_ACP";
};
export type Permission = (typeof Permission)[keyof typeof Permission];
export declare const OwnerOverride: {
  readonly Destination: "Destination";
};
export type OwnerOverride = (typeof OwnerOverride)[keyof typeof OwnerOverride];
export declare const ChecksumType: {
  readonly COMPOSITE: "COMPOSITE";
  readonly FULL_OBJECT: "FULL_OBJECT";
};
export type ChecksumType = (typeof ChecksumType)[keyof typeof ChecksumType];
export declare const ServerSideEncryption: {
  readonly AES256: "AES256";
  readonly aws_fsx: "aws:fsx";
  readonly aws_kms: "aws:kms";
  readonly aws_kms_dsse: "aws:kms:dsse";
};
export type ServerSideEncryption =
  (typeof ServerSideEncryption)[keyof typeof ServerSideEncryption];
export declare const ObjectCannedACL: {
  readonly authenticated_read: "authenticated-read";
  readonly aws_exec_read: "aws-exec-read";
  readonly bucket_owner_full_control: "bucket-owner-full-control";
  readonly bucket_owner_read: "bucket-owner-read";
  readonly private: "private";
  readonly public_read: "public-read";
  readonly public_read_write: "public-read-write";
};
export type ObjectCannedACL =
  (typeof ObjectCannedACL)[keyof typeof ObjectCannedACL];
export declare const AnnotationDirective: {
  readonly COPY: "COPY";
  readonly EXCLUDE: "EXCLUDE";
};
export type AnnotationDirective =
  (typeof AnnotationDirective)[keyof typeof AnnotationDirective];
export declare const ChecksumAlgorithm: {
  readonly CRC32: "CRC32";
  readonly CRC32C: "CRC32C";
  readonly CRC64NVME: "CRC64NVME";
  readonly MD5: "MD5";
  readonly SHA1: "SHA1";
  readonly SHA256: "SHA256";
  readonly SHA512: "SHA512";
  readonly XXHASH128: "XXHASH128";
  readonly XXHASH3: "XXHASH3";
  readonly XXHASH64: "XXHASH64";
};
export type ChecksumAlgorithm =
  (typeof ChecksumAlgorithm)[keyof typeof ChecksumAlgorithm];
export declare const MetadataDirective: {
  readonly COPY: "COPY";
  readonly REPLACE: "REPLACE";
};
export type MetadataDirective =
  (typeof MetadataDirective)[keyof typeof MetadataDirective];
export declare const ObjectLockLegalHoldStatus: {
  readonly OFF: "OFF";
  readonly ON: "ON";
};
export type ObjectLockLegalHoldStatus =
  (typeof ObjectLockLegalHoldStatus)[keyof typeof ObjectLockLegalHoldStatus];
export declare const ObjectLockMode: {
  readonly COMPLIANCE: "COMPLIANCE";
  readonly GOVERNANCE: "GOVERNANCE";
};
export type ObjectLockMode =
  (typeof ObjectLockMode)[keyof typeof ObjectLockMode];
export declare const StorageClass: {
  readonly DEEP_ARCHIVE: "DEEP_ARCHIVE";
  readonly EXPRESS_ONEZONE: "EXPRESS_ONEZONE";
  readonly FSX_ONTAP: "FSX_ONTAP";
  readonly FSX_OPENZFS: "FSX_OPENZFS";
  readonly GLACIER: "GLACIER";
  readonly GLACIER_IR: "GLACIER_IR";
  readonly INTELLIGENT_TIERING: "INTELLIGENT_TIERING";
  readonly ONEZONE_IA: "ONEZONE_IA";
  readonly OUTPOSTS: "OUTPOSTS";
  readonly REDUCED_REDUNDANCY: "REDUCED_REDUNDANCY";
  readonly SNOW: "SNOW";
  readonly STANDARD: "STANDARD";
  readonly STANDARD_IA: "STANDARD_IA";
};
export type StorageClass = (typeof StorageClass)[keyof typeof StorageClass];
export declare const TaggingDirective: {
  readonly COPY: "COPY";
  readonly REPLACE: "REPLACE";
};
export type TaggingDirective =
  (typeof TaggingDirective)[keyof typeof TaggingDirective];
export declare const BucketCannedACL: {
  readonly authenticated_read: "authenticated-read";
  readonly private: "private";
  readonly public_read: "public-read";
  readonly public_read_write: "public-read-write";
};
export type BucketCannedACL =
  (typeof BucketCannedACL)[keyof typeof BucketCannedACL];
export declare const BucketNamespace: {
  readonly ACCOUNT_REGIONAL: "account-regional";
  readonly GLOBAL: "global";
};
export type BucketNamespace =
  (typeof BucketNamespace)[keyof typeof BucketNamespace];
export declare const DataRedundancy: {
  readonly SingleAvailabilityZone: "SingleAvailabilityZone";
  readonly SingleLocalZone: "SingleLocalZone";
};
export type DataRedundancy =
  (typeof DataRedundancy)[keyof typeof DataRedundancy];
export declare const BucketType: {
  readonly Directory: "Directory";
};
export type BucketType = (typeof BucketType)[keyof typeof BucketType];
export declare const LocationType: {
  readonly AvailabilityZone: "AvailabilityZone";
  readonly LocalZone: "LocalZone";
};
export type LocationType = (typeof LocationType)[keyof typeof LocationType];
export declare const BucketLocationConstraint: {
  readonly EU: "EU";
  readonly af_south_1: "af-south-1";
  readonly ap_east_1: "ap-east-1";
  readonly ap_east_2: "ap-east-2";
  readonly ap_northeast_1: "ap-northeast-1";
  readonly ap_northeast_2: "ap-northeast-2";
  readonly ap_northeast_3: "ap-northeast-3";
  readonly ap_south_1: "ap-south-1";
  readonly ap_south_2: "ap-south-2";
  readonly ap_southeast_1: "ap-southeast-1";
  readonly ap_southeast_2: "ap-southeast-2";
  readonly ap_southeast_3: "ap-southeast-3";
  readonly ap_southeast_4: "ap-southeast-4";
  readonly ap_southeast_5: "ap-southeast-5";
  readonly ap_southeast_6: "ap-southeast-6";
  readonly ap_southeast_7: "ap-southeast-7";
  readonly ca_central_1: "ca-central-1";
  readonly ca_west_1: "ca-west-1";
  readonly cn_north_1: "cn-north-1";
  readonly cn_northwest_1: "cn-northwest-1";
  readonly eu_central_1: "eu-central-1";
  readonly eu_central_2: "eu-central-2";
  readonly eu_north_1: "eu-north-1";
  readonly eu_south_1: "eu-south-1";
  readonly eu_south_2: "eu-south-2";
  readonly eu_west_1: "eu-west-1";
  readonly eu_west_2: "eu-west-2";
  readonly eu_west_3: "eu-west-3";
  readonly il_central_1: "il-central-1";
  readonly me_central_1: "me-central-1";
  readonly me_south_1: "me-south-1";
  readonly mx_central_1: "mx-central-1";
  readonly sa_east_1: "sa-east-1";
  readonly us_east_2: "us-east-2";
  readonly us_gov_east_1: "us-gov-east-1";
  readonly us_gov_west_1: "us-gov-west-1";
  readonly us_west_1: "us-west-1";
  readonly us_west_2: "us-west-2";
};
export type BucketLocationConstraint =
  (typeof BucketLocationConstraint)[keyof typeof BucketLocationConstraint];
export declare const ObjectOwnership: {
  readonly BucketOwnerEnforced: "BucketOwnerEnforced";
  readonly BucketOwnerPreferred: "BucketOwnerPreferred";
  readonly ObjectWriter: "ObjectWriter";
};
export type ObjectOwnership =
  (typeof ObjectOwnership)[keyof typeof ObjectOwnership];
export declare const AnnotationConfigurationState: {
  readonly DISABLED: "DISABLED";
  readonly ENABLED: "ENABLED";
};
export type AnnotationConfigurationState =
  (typeof AnnotationConfigurationState)[keyof typeof AnnotationConfigurationState];
export declare const TableSseAlgorithm: {
  readonly AES256: "AES256";
  readonly aws_kms: "aws:kms";
};
export type TableSseAlgorithm =
  (typeof TableSseAlgorithm)[keyof typeof TableSseAlgorithm];
export declare const InventoryConfigurationState: {
  readonly DISABLED: "DISABLED";
  readonly ENABLED: "ENABLED";
};
export type InventoryConfigurationState =
  (typeof InventoryConfigurationState)[keyof typeof InventoryConfigurationState];
export declare const ExpirationState: {
  readonly DISABLED: "DISABLED";
  readonly ENABLED: "ENABLED";
};
export type ExpirationState =
  (typeof ExpirationState)[keyof typeof ExpirationState];
export declare const SessionMode: {
  readonly ReadOnly: "ReadOnly";
  readonly ReadWrite: "ReadWrite";
};
export type SessionMode = (typeof SessionMode)[keyof typeof SessionMode];
export declare const AnalyticsS3ExportFileFormat: {
  readonly CSV: "CSV";
};
export type AnalyticsS3ExportFileFormat =
  (typeof AnalyticsS3ExportFileFormat)[keyof typeof AnalyticsS3ExportFileFormat];
export declare const StorageClassAnalysisSchemaVersion: {
  readonly V_1: "V_1";
};
export type StorageClassAnalysisSchemaVersion =
  (typeof StorageClassAnalysisSchemaVersion)[keyof typeof StorageClassAnalysisSchemaVersion];
export declare const EncryptionType: {
  readonly NONE: "NONE";
  readonly SSE_C: "SSE-C";
};
export type EncryptionType =
  (typeof EncryptionType)[keyof typeof EncryptionType];
export declare const IntelligentTieringStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type IntelligentTieringStatus =
  (typeof IntelligentTieringStatus)[keyof typeof IntelligentTieringStatus];
export declare const IntelligentTieringAccessTier: {
  readonly ARCHIVE_ACCESS: "ARCHIVE_ACCESS";
  readonly DEEP_ARCHIVE_ACCESS: "DEEP_ARCHIVE_ACCESS";
};
export type IntelligentTieringAccessTier =
  (typeof IntelligentTieringAccessTier)[keyof typeof IntelligentTieringAccessTier];
export declare const InventoryFormat: {
  readonly CSV: "CSV";
  readonly ORC: "ORC";
  readonly Parquet: "Parquet";
};
export type InventoryFormat =
  (typeof InventoryFormat)[keyof typeof InventoryFormat];
export declare const InventoryIncludedObjectVersions: {
  readonly All: "All";
  readonly Current: "Current";
};
export type InventoryIncludedObjectVersions =
  (typeof InventoryIncludedObjectVersions)[keyof typeof InventoryIncludedObjectVersions];
export declare const InventoryOptionalField: {
  readonly BucketKeyStatus: "BucketKeyStatus";
  readonly ChecksumAlgorithm: "ChecksumAlgorithm";
  readonly ETag: "ETag";
  readonly EncryptionStatus: "EncryptionStatus";
  readonly IntelligentTieringAccessTier: "IntelligentTieringAccessTier";
  readonly IsMultipartUploaded: "IsMultipartUploaded";
  readonly LastModifiedDate: "LastModifiedDate";
  readonly LifecycleExpirationDate: "LifecycleExpirationDate";
  readonly ObjectAccessControlList: "ObjectAccessControlList";
  readonly ObjectLockLegalHoldStatus: "ObjectLockLegalHoldStatus";
  readonly ObjectLockMode: "ObjectLockMode";
  readonly ObjectLockRetainUntilDate: "ObjectLockRetainUntilDate";
  readonly ObjectOwner: "ObjectOwner";
  readonly ReplicationStatus: "ReplicationStatus";
  readonly Size: "Size";
  readonly StorageClass: "StorageClass";
};
export type InventoryOptionalField =
  (typeof InventoryOptionalField)[keyof typeof InventoryOptionalField];
export declare const InventoryFrequency: {
  readonly Daily: "Daily";
  readonly Weekly: "Weekly";
};
export type InventoryFrequency =
  (typeof InventoryFrequency)[keyof typeof InventoryFrequency];
export declare const TransitionStorageClass: {
  readonly DEEP_ARCHIVE: "DEEP_ARCHIVE";
  readonly GLACIER: "GLACIER";
  readonly GLACIER_IR: "GLACIER_IR";
  readonly INTELLIGENT_TIERING: "INTELLIGENT_TIERING";
  readonly ONEZONE_IA: "ONEZONE_IA";
  readonly STANDARD_IA: "STANDARD_IA";
};
export type TransitionStorageClass =
  (typeof TransitionStorageClass)[keyof typeof TransitionStorageClass];
export declare const ExpirationStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type ExpirationStatus =
  (typeof ExpirationStatus)[keyof typeof ExpirationStatus];
export declare const TransitionDefaultMinimumObjectSize: {
  readonly all_storage_classes_128K: "all_storage_classes_128K";
  readonly varies_by_storage_class: "varies_by_storage_class";
};
export type TransitionDefaultMinimumObjectSize =
  (typeof TransitionDefaultMinimumObjectSize)[keyof typeof TransitionDefaultMinimumObjectSize];
export declare const BucketLogsPermission: {
  readonly FULL_CONTROL: "FULL_CONTROL";
  readonly READ: "READ";
  readonly WRITE: "WRITE";
};
export type BucketLogsPermission =
  (typeof BucketLogsPermission)[keyof typeof BucketLogsPermission];
export declare const PartitionDateSource: {
  readonly DeliveryTime: "DeliveryTime";
  readonly EventTime: "EventTime";
};
export type PartitionDateSource =
  (typeof PartitionDateSource)[keyof typeof PartitionDateSource];
export declare const S3TablesBucketType: {
  readonly aws: "aws";
  readonly customer: "customer";
};
export type S3TablesBucketType =
  (typeof S3TablesBucketType)[keyof typeof S3TablesBucketType];
export declare const Event: {
  readonly s3_IntelligentTiering: "s3:IntelligentTiering";
  readonly s3_LifecycleExpiration_: "s3:LifecycleExpiration:*";
  readonly s3_LifecycleExpiration_Delete: "s3:LifecycleExpiration:Delete";
  readonly s3_LifecycleExpiration_DeleteMarkerCreated: "s3:LifecycleExpiration:DeleteMarkerCreated";
  readonly s3_LifecycleTransition: "s3:LifecycleTransition";
  readonly s3_ObjectAcl_Put: "s3:ObjectAcl:Put";
  readonly s3_ObjectAnnotation_: "s3:ObjectAnnotation:*";
  readonly s3_ObjectAnnotation_Delete: "s3:ObjectAnnotation:Delete";
  readonly s3_ObjectAnnotation_Put: "s3:ObjectAnnotation:Put";
  readonly s3_ObjectCreated_: "s3:ObjectCreated:*";
  readonly s3_ObjectCreated_CompleteMultipartUpload: "s3:ObjectCreated:CompleteMultipartUpload";
  readonly s3_ObjectCreated_Copy: "s3:ObjectCreated:Copy";
  readonly s3_ObjectCreated_Post: "s3:ObjectCreated:Post";
  readonly s3_ObjectCreated_Put: "s3:ObjectCreated:Put";
  readonly s3_ObjectRemoved_: "s3:ObjectRemoved:*";
  readonly s3_ObjectRemoved_Delete: "s3:ObjectRemoved:Delete";
  readonly s3_ObjectRemoved_DeleteMarkerCreated: "s3:ObjectRemoved:DeleteMarkerCreated";
  readonly s3_ObjectRestore_: "s3:ObjectRestore:*";
  readonly s3_ObjectRestore_Completed: "s3:ObjectRestore:Completed";
  readonly s3_ObjectRestore_Delete: "s3:ObjectRestore:Delete";
  readonly s3_ObjectRestore_Post: "s3:ObjectRestore:Post";
  readonly s3_ObjectTagging_: "s3:ObjectTagging:*";
  readonly s3_ObjectTagging_Delete: "s3:ObjectTagging:Delete";
  readonly s3_ObjectTagging_Put: "s3:ObjectTagging:Put";
  readonly s3_ReducedRedundancyLostObject: "s3:ReducedRedundancyLostObject";
  readonly s3_Replication_: "s3:Replication:*";
  readonly s3_Replication_OperationFailedReplication: "s3:Replication:OperationFailedReplication";
  readonly s3_Replication_OperationMissedThreshold: "s3:Replication:OperationMissedThreshold";
  readonly s3_Replication_OperationNotTracked: "s3:Replication:OperationNotTracked";
  readonly s3_Replication_OperationReplicatedAfterThreshold: "s3:Replication:OperationReplicatedAfterThreshold";
};
export type Event = (typeof Event)[keyof typeof Event];
export declare const FilterRuleName: {
  readonly prefix: "prefix";
  readonly suffix: "suffix";
};
export type FilterRuleName =
  (typeof FilterRuleName)[keyof typeof FilterRuleName];
export declare const DeleteMarkerReplicationStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type DeleteMarkerReplicationStatus =
  (typeof DeleteMarkerReplicationStatus)[keyof typeof DeleteMarkerReplicationStatus];
export declare const MetricsStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type MetricsStatus = (typeof MetricsStatus)[keyof typeof MetricsStatus];
export declare const ReplicationTimeStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type ReplicationTimeStatus =
  (typeof ReplicationTimeStatus)[keyof typeof ReplicationTimeStatus];
export declare const ExistingObjectReplicationStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type ExistingObjectReplicationStatus =
  (typeof ExistingObjectReplicationStatus)[keyof typeof ExistingObjectReplicationStatus];
export declare const ReplicaModificationsStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type ReplicaModificationsStatus =
  (typeof ReplicaModificationsStatus)[keyof typeof ReplicaModificationsStatus];
export declare const SseKmsEncryptedObjectsStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type SseKmsEncryptedObjectsStatus =
  (typeof SseKmsEncryptedObjectsStatus)[keyof typeof SseKmsEncryptedObjectsStatus];
export declare const ReplicationRuleStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type ReplicationRuleStatus =
  (typeof ReplicationRuleStatus)[keyof typeof ReplicationRuleStatus];
export declare const Payer: {
  readonly BucketOwner: "BucketOwner";
  readonly Requester: "Requester";
};
export type Payer = (typeof Payer)[keyof typeof Payer];
export declare const MFADeleteStatus: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type MFADeleteStatus =
  (typeof MFADeleteStatus)[keyof typeof MFADeleteStatus];
export declare const BucketVersioningStatus: {
  readonly Enabled: "Enabled";
  readonly Suspended: "Suspended";
};
export type BucketVersioningStatus =
  (typeof BucketVersioningStatus)[keyof typeof BucketVersioningStatus];
export declare const Protocol: {
  readonly http: "http";
  readonly https: "https";
};
export type Protocol = (typeof Protocol)[keyof typeof Protocol];
export declare const ReplicationStatus: {
  readonly COMPLETE: "COMPLETE";
  readonly COMPLETED: "COMPLETED";
  readonly FAILED: "FAILED";
  readonly PENDING: "PENDING";
  readonly REPLICA: "REPLICA";
};
export type ReplicationStatus =
  (typeof ReplicationStatus)[keyof typeof ReplicationStatus];
export declare const ChecksumMode: {
  readonly ENABLED: "ENABLED";
};
export type ChecksumMode = (typeof ChecksumMode)[keyof typeof ChecksumMode];
export declare const ObjectAttributes: {
  readonly CHECKSUM: "Checksum";
  readonly ETAG: "ETag";
  readonly OBJECT_PARTS: "ObjectParts";
  readonly OBJECT_SIZE: "ObjectSize";
  readonly STORAGE_CLASS: "StorageClass";
};
export type ObjectAttributes =
  (typeof ObjectAttributes)[keyof typeof ObjectAttributes];
export declare const ObjectLockEnabled: {
  readonly Enabled: "Enabled";
};
export type ObjectLockEnabled =
  (typeof ObjectLockEnabled)[keyof typeof ObjectLockEnabled];
export declare const ObjectLockRetentionMode: {
  readonly COMPLIANCE: "COMPLIANCE";
  readonly GOVERNANCE: "GOVERNANCE";
};
export type ObjectLockRetentionMode =
  (typeof ObjectLockRetentionMode)[keyof typeof ObjectLockRetentionMode];
export declare const ArchiveStatus: {
  readonly ARCHIVE_ACCESS: "ARCHIVE_ACCESS";
  readonly DEEP_ARCHIVE_ACCESS: "DEEP_ARCHIVE_ACCESS";
};
export type ArchiveStatus = (typeof ArchiveStatus)[keyof typeof ArchiveStatus];
export declare const EncodingType: {
  readonly url: "url";
};
export type EncodingType = (typeof EncodingType)[keyof typeof EncodingType];
export declare const ObjectStorageClass: {
  readonly DEEP_ARCHIVE: "DEEP_ARCHIVE";
  readonly EXPRESS_ONEZONE: "EXPRESS_ONEZONE";
  readonly FSX_ONTAP: "FSX_ONTAP";
  readonly FSX_OPENZFS: "FSX_OPENZFS";
  readonly GLACIER: "GLACIER";
  readonly GLACIER_IR: "GLACIER_IR";
  readonly INTELLIGENT_TIERING: "INTELLIGENT_TIERING";
  readonly ONEZONE_IA: "ONEZONE_IA";
  readonly OUTPOSTS: "OUTPOSTS";
  readonly REDUCED_REDUNDANCY: "REDUCED_REDUNDANCY";
  readonly SNOW: "SNOW";
  readonly STANDARD: "STANDARD";
  readonly STANDARD_IA: "STANDARD_IA";
};
export type ObjectStorageClass =
  (typeof ObjectStorageClass)[keyof typeof ObjectStorageClass];
export declare const OptionalObjectAttributes: {
  readonly RESTORE_STATUS: "RestoreStatus";
};
export type OptionalObjectAttributes =
  (typeof OptionalObjectAttributes)[keyof typeof OptionalObjectAttributes];
export declare const ObjectVersionStorageClass: {
  readonly STANDARD: "STANDARD";
};
export type ObjectVersionStorageClass =
  (typeof ObjectVersionStorageClass)[keyof typeof ObjectVersionStorageClass];
export declare const MFADelete: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type MFADelete = (typeof MFADelete)[keyof typeof MFADelete];
export declare const Tier: {
  readonly Bulk: "Bulk";
  readonly Expedited: "Expedited";
  readonly Standard: "Standard";
};
export type Tier = (typeof Tier)[keyof typeof Tier];
export declare const ExpressionType: {
  readonly SQL: "SQL";
};
export type ExpressionType =
  (typeof ExpressionType)[keyof typeof ExpressionType];
export declare const CompressionType: {
  readonly BZIP2: "BZIP2";
  readonly GZIP: "GZIP";
  readonly NONE: "NONE";
};
export type CompressionType =
  (typeof CompressionType)[keyof typeof CompressionType];
export declare const FileHeaderInfo: {
  readonly IGNORE: "IGNORE";
  readonly NONE: "NONE";
  readonly USE: "USE";
};
export type FileHeaderInfo =
  (typeof FileHeaderInfo)[keyof typeof FileHeaderInfo];
export declare const JSONType: {
  readonly DOCUMENT: "DOCUMENT";
  readonly LINES: "LINES";
};
export type JSONType = (typeof JSONType)[keyof typeof JSONType];
export declare const QuoteFields: {
  readonly ALWAYS: "ALWAYS";
  readonly ASNEEDED: "ASNEEDED";
};
export type QuoteFields = (typeof QuoteFields)[keyof typeof QuoteFields];
export declare const RestoreRequestType: {
  readonly SELECT: "SELECT";
};
export type RestoreRequestType =
  (typeof RestoreRequestType)[keyof typeof RestoreRequestType];
