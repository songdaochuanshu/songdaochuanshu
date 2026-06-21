/**
 * @public
 * @enum
 */
export declare const BucketAbacStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type BucketAbacStatus = (typeof BucketAbacStatus)[keyof typeof BucketAbacStatus];
/**
 * @public
 * @enum
 */
export declare const RequestCharged: {
    readonly requester: "requester";
};
/**
 * @public
 */
export type RequestCharged = (typeof RequestCharged)[keyof typeof RequestCharged];
/**
 * @public
 * @enum
 */
export declare const RequestPayer: {
    readonly requester: "requester";
};
/**
 * @public
 */
export type RequestPayer = (typeof RequestPayer)[keyof typeof RequestPayer];
/**
 * @public
 * @enum
 */
export declare const BucketAccelerateStatus: {
    readonly Enabled: "Enabled";
    readonly Suspended: "Suspended";
};
/**
 * @public
 */
export type BucketAccelerateStatus = (typeof BucketAccelerateStatus)[keyof typeof BucketAccelerateStatus];
/**
 * @public
 * @enum
 */
export declare const Type: {
    readonly AmazonCustomerByEmail: "AmazonCustomerByEmail";
    readonly CanonicalUser: "CanonicalUser";
    readonly Group: "Group";
};
/**
 * @public
 */
export type Type = (typeof Type)[keyof typeof Type];
/**
 * @public
 * @enum
 */
export declare const Permission: {
    readonly FULL_CONTROL: "FULL_CONTROL";
    readonly READ: "READ";
    readonly READ_ACP: "READ_ACP";
    readonly WRITE: "WRITE";
    readonly WRITE_ACP: "WRITE_ACP";
};
/**
 * @public
 */
export type Permission = (typeof Permission)[keyof typeof Permission];
/**
 * @public
 * @enum
 */
export declare const OwnerOverride: {
    readonly Destination: "Destination";
};
/**
 * @public
 */
export type OwnerOverride = (typeof OwnerOverride)[keyof typeof OwnerOverride];
/**
 * @public
 * @enum
 */
export declare const ChecksumType: {
    readonly COMPOSITE: "COMPOSITE";
    readonly FULL_OBJECT: "FULL_OBJECT";
};
/**
 * @public
 */
export type ChecksumType = (typeof ChecksumType)[keyof typeof ChecksumType];
/**
 * @public
 * @enum
 */
export declare const ServerSideEncryption: {
    readonly AES256: "AES256";
    readonly aws_fsx: "aws:fsx";
    readonly aws_kms: "aws:kms";
    readonly aws_kms_dsse: "aws:kms:dsse";
};
/**
 * @public
 */
export type ServerSideEncryption = (typeof ServerSideEncryption)[keyof typeof ServerSideEncryption];
/**
 * @public
 * @enum
 */
export declare const ObjectCannedACL: {
    readonly authenticated_read: "authenticated-read";
    readonly aws_exec_read: "aws-exec-read";
    readonly bucket_owner_full_control: "bucket-owner-full-control";
    readonly bucket_owner_read: "bucket-owner-read";
    readonly private: "private";
    readonly public_read: "public-read";
    readonly public_read_write: "public-read-write";
};
/**
 * @public
 */
export type ObjectCannedACL = (typeof ObjectCannedACL)[keyof typeof ObjectCannedACL];
/**
 * @public
 * @enum
 */
export declare const AnnotationDirective: {
    readonly COPY: "COPY";
    readonly EXCLUDE: "EXCLUDE";
};
/**
 * @public
 */
export type AnnotationDirective = (typeof AnnotationDirective)[keyof typeof AnnotationDirective];
/**
 * @public
 * @enum
 */
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
/**
 * @public
 */
export type ChecksumAlgorithm = (typeof ChecksumAlgorithm)[keyof typeof ChecksumAlgorithm];
/**
 * @public
 * @enum
 */
export declare const MetadataDirective: {
    readonly COPY: "COPY";
    readonly REPLACE: "REPLACE";
};
/**
 * @public
 */
export type MetadataDirective = (typeof MetadataDirective)[keyof typeof MetadataDirective];
/**
 * @public
 * @enum
 */
export declare const ObjectLockLegalHoldStatus: {
    readonly OFF: "OFF";
    readonly ON: "ON";
};
/**
 * @public
 */
export type ObjectLockLegalHoldStatus = (typeof ObjectLockLegalHoldStatus)[keyof typeof ObjectLockLegalHoldStatus];
/**
 * @public
 * @enum
 */
export declare const ObjectLockMode: {
    readonly COMPLIANCE: "COMPLIANCE";
    readonly GOVERNANCE: "GOVERNANCE";
};
/**
 * @public
 */
export type ObjectLockMode = (typeof ObjectLockMode)[keyof typeof ObjectLockMode];
/**
 * @public
 * @enum
 */
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
/**
 * @public
 */
export type StorageClass = (typeof StorageClass)[keyof typeof StorageClass];
/**
 * @public
 * @enum
 */
export declare const TaggingDirective: {
    readonly COPY: "COPY";
    readonly REPLACE: "REPLACE";
};
/**
 * @public
 */
export type TaggingDirective = (typeof TaggingDirective)[keyof typeof TaggingDirective];
/**
 * @public
 * @enum
 */
export declare const BucketCannedACL: {
    readonly authenticated_read: "authenticated-read";
    readonly private: "private";
    readonly public_read: "public-read";
    readonly public_read_write: "public-read-write";
};
/**
 * @public
 */
export type BucketCannedACL = (typeof BucketCannedACL)[keyof typeof BucketCannedACL];
/**
 * @public
 * @enum
 */
export declare const BucketNamespace: {
    readonly ACCOUNT_REGIONAL: "account-regional";
    readonly GLOBAL: "global";
};
/**
 * @public
 */
export type BucketNamespace = (typeof BucketNamespace)[keyof typeof BucketNamespace];
/**
 * @public
 * @enum
 */
export declare const DataRedundancy: {
    readonly SingleAvailabilityZone: "SingleAvailabilityZone";
    readonly SingleLocalZone: "SingleLocalZone";
};
/**
 * @public
 */
export type DataRedundancy = (typeof DataRedundancy)[keyof typeof DataRedundancy];
/**
 * @public
 * @enum
 */
export declare const BucketType: {
    readonly Directory: "Directory";
};
/**
 * @public
 */
export type BucketType = (typeof BucketType)[keyof typeof BucketType];
/**
 * @public
 * @enum
 */
export declare const LocationType: {
    readonly AvailabilityZone: "AvailabilityZone";
    readonly LocalZone: "LocalZone";
};
/**
 * @public
 */
export type LocationType = (typeof LocationType)[keyof typeof LocationType];
/**
 * @public
 * @enum
 */
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
/**
 * @public
 */
export type BucketLocationConstraint = (typeof BucketLocationConstraint)[keyof typeof BucketLocationConstraint];
/**
 * @public
 * @enum
 */
export declare const ObjectOwnership: {
    readonly BucketOwnerEnforced: "BucketOwnerEnforced";
    readonly BucketOwnerPreferred: "BucketOwnerPreferred";
    readonly ObjectWriter: "ObjectWriter";
};
/**
 * @public
 */
export type ObjectOwnership = (typeof ObjectOwnership)[keyof typeof ObjectOwnership];
/**
 * @public
 * @enum
 */
export declare const AnnotationConfigurationState: {
    readonly DISABLED: "DISABLED";
    readonly ENABLED: "ENABLED";
};
/**
 * @public
 */
export type AnnotationConfigurationState = (typeof AnnotationConfigurationState)[keyof typeof AnnotationConfigurationState];
/**
 * @public
 * @enum
 */
export declare const TableSseAlgorithm: {
    readonly AES256: "AES256";
    readonly aws_kms: "aws:kms";
};
/**
 * @public
 */
export type TableSseAlgorithm = (typeof TableSseAlgorithm)[keyof typeof TableSseAlgorithm];
/**
 * @public
 * @enum
 */
export declare const InventoryConfigurationState: {
    readonly DISABLED: "DISABLED";
    readonly ENABLED: "ENABLED";
};
/**
 * @public
 */
export type InventoryConfigurationState = (typeof InventoryConfigurationState)[keyof typeof InventoryConfigurationState];
/**
 * @public
 * @enum
 */
export declare const ExpirationState: {
    readonly DISABLED: "DISABLED";
    readonly ENABLED: "ENABLED";
};
/**
 * @public
 */
export type ExpirationState = (typeof ExpirationState)[keyof typeof ExpirationState];
/**
 * @public
 * @enum
 */
export declare const SessionMode: {
    readonly ReadOnly: "ReadOnly";
    readonly ReadWrite: "ReadWrite";
};
/**
 * @public
 */
export type SessionMode = (typeof SessionMode)[keyof typeof SessionMode];
/**
 * @public
 * @enum
 */
export declare const AnalyticsS3ExportFileFormat: {
    readonly CSV: "CSV";
};
/**
 * @public
 */
export type AnalyticsS3ExportFileFormat = (typeof AnalyticsS3ExportFileFormat)[keyof typeof AnalyticsS3ExportFileFormat];
/**
 * @public
 * @enum
 */
export declare const StorageClassAnalysisSchemaVersion: {
    readonly V_1: "V_1";
};
/**
 * @public
 */
export type StorageClassAnalysisSchemaVersion = (typeof StorageClassAnalysisSchemaVersion)[keyof typeof StorageClassAnalysisSchemaVersion];
/**
 * @public
 * @enum
 */
export declare const EncryptionType: {
    readonly NONE: "NONE";
    readonly SSE_C: "SSE-C";
};
/**
 * @public
 */
export type EncryptionType = (typeof EncryptionType)[keyof typeof EncryptionType];
/**
 * @public
 * @enum
 */
export declare const IntelligentTieringStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type IntelligentTieringStatus = (typeof IntelligentTieringStatus)[keyof typeof IntelligentTieringStatus];
/**
 * @public
 * @enum
 */
export declare const IntelligentTieringAccessTier: {
    readonly ARCHIVE_ACCESS: "ARCHIVE_ACCESS";
    readonly DEEP_ARCHIVE_ACCESS: "DEEP_ARCHIVE_ACCESS";
};
/**
 * @public
 */
export type IntelligentTieringAccessTier = (typeof IntelligentTieringAccessTier)[keyof typeof IntelligentTieringAccessTier];
/**
 * @public
 * @enum
 */
export declare const InventoryFormat: {
    readonly CSV: "CSV";
    readonly ORC: "ORC";
    readonly Parquet: "Parquet";
};
/**
 * @public
 */
export type InventoryFormat = (typeof InventoryFormat)[keyof typeof InventoryFormat];
/**
 * @public
 * @enum
 */
export declare const InventoryIncludedObjectVersions: {
    readonly All: "All";
    readonly Current: "Current";
};
/**
 * @public
 */
export type InventoryIncludedObjectVersions = (typeof InventoryIncludedObjectVersions)[keyof typeof InventoryIncludedObjectVersions];
/**
 * @public
 * @enum
 */
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
/**
 * @public
 */
export type InventoryOptionalField = (typeof InventoryOptionalField)[keyof typeof InventoryOptionalField];
/**
 * @public
 * @enum
 */
export declare const InventoryFrequency: {
    readonly Daily: "Daily";
    readonly Weekly: "Weekly";
};
/**
 * @public
 */
export type InventoryFrequency = (typeof InventoryFrequency)[keyof typeof InventoryFrequency];
/**
 * @public
 * @enum
 */
export declare const TransitionStorageClass: {
    readonly DEEP_ARCHIVE: "DEEP_ARCHIVE";
    readonly GLACIER: "GLACIER";
    readonly GLACIER_IR: "GLACIER_IR";
    readonly INTELLIGENT_TIERING: "INTELLIGENT_TIERING";
    readonly ONEZONE_IA: "ONEZONE_IA";
    readonly STANDARD_IA: "STANDARD_IA";
};
/**
 * @public
 */
export type TransitionStorageClass = (typeof TransitionStorageClass)[keyof typeof TransitionStorageClass];
/**
 * @public
 * @enum
 */
export declare const ExpirationStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type ExpirationStatus = (typeof ExpirationStatus)[keyof typeof ExpirationStatus];
/**
 * @public
 * @enum
 */
export declare const TransitionDefaultMinimumObjectSize: {
    readonly all_storage_classes_128K: "all_storage_classes_128K";
    readonly varies_by_storage_class: "varies_by_storage_class";
};
/**
 * @public
 */
export type TransitionDefaultMinimumObjectSize = (typeof TransitionDefaultMinimumObjectSize)[keyof typeof TransitionDefaultMinimumObjectSize];
/**
 * @public
 * @enum
 */
export declare const BucketLogsPermission: {
    readonly FULL_CONTROL: "FULL_CONTROL";
    readonly READ: "READ";
    readonly WRITE: "WRITE";
};
/**
 * @public
 */
export type BucketLogsPermission = (typeof BucketLogsPermission)[keyof typeof BucketLogsPermission];
/**
 * @public
 * @enum
 */
export declare const PartitionDateSource: {
    readonly DeliveryTime: "DeliveryTime";
    readonly EventTime: "EventTime";
};
/**
 * @public
 */
export type PartitionDateSource = (typeof PartitionDateSource)[keyof typeof PartitionDateSource];
/**
 * @public
 * @enum
 */
export declare const S3TablesBucketType: {
    readonly aws: "aws";
    readonly customer: "customer";
};
/**
 * @public
 */
export type S3TablesBucketType = (typeof S3TablesBucketType)[keyof typeof S3TablesBucketType];
/**
 * @public
 * @enum
 */
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
/**
 * @public
 */
export type Event = (typeof Event)[keyof typeof Event];
/**
 * @public
 * @enum
 */
export declare const FilterRuleName: {
    readonly prefix: "prefix";
    readonly suffix: "suffix";
};
/**
 * @public
 */
export type FilterRuleName = (typeof FilterRuleName)[keyof typeof FilterRuleName];
/**
 * @public
 * @enum
 */
export declare const DeleteMarkerReplicationStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type DeleteMarkerReplicationStatus = (typeof DeleteMarkerReplicationStatus)[keyof typeof DeleteMarkerReplicationStatus];
/**
 * @public
 * @enum
 */
export declare const MetricsStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type MetricsStatus = (typeof MetricsStatus)[keyof typeof MetricsStatus];
/**
 * @public
 * @enum
 */
export declare const ReplicationTimeStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type ReplicationTimeStatus = (typeof ReplicationTimeStatus)[keyof typeof ReplicationTimeStatus];
/**
 * @public
 * @enum
 */
export declare const ExistingObjectReplicationStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type ExistingObjectReplicationStatus = (typeof ExistingObjectReplicationStatus)[keyof typeof ExistingObjectReplicationStatus];
/**
 * @public
 * @enum
 */
export declare const ReplicaModificationsStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type ReplicaModificationsStatus = (typeof ReplicaModificationsStatus)[keyof typeof ReplicaModificationsStatus];
/**
 * @public
 * @enum
 */
export declare const SseKmsEncryptedObjectsStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type SseKmsEncryptedObjectsStatus = (typeof SseKmsEncryptedObjectsStatus)[keyof typeof SseKmsEncryptedObjectsStatus];
/**
 * @public
 * @enum
 */
export declare const ReplicationRuleStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type ReplicationRuleStatus = (typeof ReplicationRuleStatus)[keyof typeof ReplicationRuleStatus];
/**
 * @public
 * @enum
 */
export declare const Payer: {
    readonly BucketOwner: "BucketOwner";
    readonly Requester: "Requester";
};
/**
 * @public
 */
export type Payer = (typeof Payer)[keyof typeof Payer];
/**
 * @public
 * @enum
 */
export declare const MFADeleteStatus: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type MFADeleteStatus = (typeof MFADeleteStatus)[keyof typeof MFADeleteStatus];
/**
 * @public
 * @enum
 */
export declare const BucketVersioningStatus: {
    readonly Enabled: "Enabled";
    readonly Suspended: "Suspended";
};
/**
 * @public
 */
export type BucketVersioningStatus = (typeof BucketVersioningStatus)[keyof typeof BucketVersioningStatus];
/**
 * @public
 * @enum
 */
export declare const Protocol: {
    readonly http: "http";
    readonly https: "https";
};
/**
 * @public
 */
export type Protocol = (typeof Protocol)[keyof typeof Protocol];
/**
 * @public
 * @enum
 */
export declare const ReplicationStatus: {
    readonly COMPLETE: "COMPLETE";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly PENDING: "PENDING";
    readonly REPLICA: "REPLICA";
};
/**
 * @public
 */
export type ReplicationStatus = (typeof ReplicationStatus)[keyof typeof ReplicationStatus];
/**
 * @public
 * @enum
 */
export declare const ChecksumMode: {
    readonly ENABLED: "ENABLED";
};
/**
 * @public
 */
export type ChecksumMode = (typeof ChecksumMode)[keyof typeof ChecksumMode];
/**
 * @public
 * @enum
 */
export declare const ObjectAttributes: {
    readonly CHECKSUM: "Checksum";
    readonly ETAG: "ETag";
    readonly OBJECT_PARTS: "ObjectParts";
    readonly OBJECT_SIZE: "ObjectSize";
    readonly STORAGE_CLASS: "StorageClass";
};
/**
 * @public
 */
export type ObjectAttributes = (typeof ObjectAttributes)[keyof typeof ObjectAttributes];
/**
 * @public
 * @enum
 */
export declare const ObjectLockEnabled: {
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type ObjectLockEnabled = (typeof ObjectLockEnabled)[keyof typeof ObjectLockEnabled];
/**
 * @public
 * @enum
 */
export declare const ObjectLockRetentionMode: {
    readonly COMPLIANCE: "COMPLIANCE";
    readonly GOVERNANCE: "GOVERNANCE";
};
/**
 * @public
 */
export type ObjectLockRetentionMode = (typeof ObjectLockRetentionMode)[keyof typeof ObjectLockRetentionMode];
/**
 * @public
 * @enum
 */
export declare const ArchiveStatus: {
    readonly ARCHIVE_ACCESS: "ARCHIVE_ACCESS";
    readonly DEEP_ARCHIVE_ACCESS: "DEEP_ARCHIVE_ACCESS";
};
/**
 * @public
 */
export type ArchiveStatus = (typeof ArchiveStatus)[keyof typeof ArchiveStatus];
/**
 * @public
 * @enum
 */
export declare const EncodingType: {
    readonly url: "url";
};
/**
 * @public
 */
export type EncodingType = (typeof EncodingType)[keyof typeof EncodingType];
/**
 * @public
 * @enum
 */
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
/**
 * @public
 */
export type ObjectStorageClass = (typeof ObjectStorageClass)[keyof typeof ObjectStorageClass];
/**
 * @public
 * @enum
 */
export declare const OptionalObjectAttributes: {
    readonly RESTORE_STATUS: "RestoreStatus";
};
/**
 * @public
 */
export type OptionalObjectAttributes = (typeof OptionalObjectAttributes)[keyof typeof OptionalObjectAttributes];
/**
 * @public
 * @enum
 */
export declare const ObjectVersionStorageClass: {
    readonly STANDARD: "STANDARD";
};
/**
 * @public
 */
export type ObjectVersionStorageClass = (typeof ObjectVersionStorageClass)[keyof typeof ObjectVersionStorageClass];
/**
 * @public
 * @enum
 */
export declare const MFADelete: {
    readonly Disabled: "Disabled";
    readonly Enabled: "Enabled";
};
/**
 * @public
 */
export type MFADelete = (typeof MFADelete)[keyof typeof MFADelete];
/**
 * @public
 * @enum
 */
export declare const Tier: {
    readonly Bulk: "Bulk";
    readonly Expedited: "Expedited";
    readonly Standard: "Standard";
};
/**
 * @public
 */
export type Tier = (typeof Tier)[keyof typeof Tier];
/**
 * @public
 * @enum
 */
export declare const ExpressionType: {
    readonly SQL: "SQL";
};
/**
 * @public
 */
export type ExpressionType = (typeof ExpressionType)[keyof typeof ExpressionType];
/**
 * @public
 * @enum
 */
export declare const CompressionType: {
    readonly BZIP2: "BZIP2";
    readonly GZIP: "GZIP";
    readonly NONE: "NONE";
};
/**
 * @public
 */
export type CompressionType = (typeof CompressionType)[keyof typeof CompressionType];
/**
 * @public
 * @enum
 */
export declare const FileHeaderInfo: {
    readonly IGNORE: "IGNORE";
    readonly NONE: "NONE";
    readonly USE: "USE";
};
/**
 * @public
 */
export type FileHeaderInfo = (typeof FileHeaderInfo)[keyof typeof FileHeaderInfo];
/**
 * @public
 * @enum
 */
export declare const JSONType: {
    readonly DOCUMENT: "DOCUMENT";
    readonly LINES: "LINES";
};
/**
 * @public
 */
export type JSONType = (typeof JSONType)[keyof typeof JSONType];
/**
 * @public
 * @enum
 */
export declare const QuoteFields: {
    readonly ALWAYS: "ALWAYS";
    readonly ASNEEDED: "ASNEEDED";
};
/**
 * @public
 */
export type QuoteFields = (typeof QuoteFields)[keyof typeof QuoteFields];
/**
 * @public
 * @enum
 */
export declare const RestoreRequestType: {
    readonly SELECT: "SELECT";
};
/**
 * @public
 */
export type RestoreRequestType = (typeof RestoreRequestType)[keyof typeof RestoreRequestType];
