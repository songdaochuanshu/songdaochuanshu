export const BucketAbacStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const RequestCharged = {
    requester: "requester",
};
export const RequestPayer = {
    requester: "requester",
};
export const BucketAccelerateStatus = {
    Enabled: "Enabled",
    Suspended: "Suspended",
};
export const Type = {
    AmazonCustomerByEmail: "AmazonCustomerByEmail",
    CanonicalUser: "CanonicalUser",
    Group: "Group",
};
export const Permission = {
    FULL_CONTROL: "FULL_CONTROL",
    READ: "READ",
    READ_ACP: "READ_ACP",
    WRITE: "WRITE",
    WRITE_ACP: "WRITE_ACP",
};
export const OwnerOverride = {
    Destination: "Destination",
};
export const ChecksumType = {
    COMPOSITE: "COMPOSITE",
    FULL_OBJECT: "FULL_OBJECT",
};
export const ServerSideEncryption = {
    AES256: "AES256",
    aws_fsx: "aws:fsx",
    aws_kms: "aws:kms",
    aws_kms_dsse: "aws:kms:dsse",
};
export const ObjectCannedACL = {
    authenticated_read: "authenticated-read",
    aws_exec_read: "aws-exec-read",
    bucket_owner_full_control: "bucket-owner-full-control",
    bucket_owner_read: "bucket-owner-read",
    private: "private",
    public_read: "public-read",
    public_read_write: "public-read-write",
};
export const AnnotationDirective = {
    COPY: "COPY",
    EXCLUDE: "EXCLUDE",
};
export const ChecksumAlgorithm = {
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
export const MetadataDirective = {
    COPY: "COPY",
    REPLACE: "REPLACE",
};
export const ObjectLockLegalHoldStatus = {
    OFF: "OFF",
    ON: "ON",
};
export const ObjectLockMode = {
    COMPLIANCE: "COMPLIANCE",
    GOVERNANCE: "GOVERNANCE",
};
export const StorageClass = {
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
export const TaggingDirective = {
    COPY: "COPY",
    REPLACE: "REPLACE",
};
export const BucketCannedACL = {
    authenticated_read: "authenticated-read",
    private: "private",
    public_read: "public-read",
    public_read_write: "public-read-write",
};
export const BucketNamespace = {
    ACCOUNT_REGIONAL: "account-regional",
    GLOBAL: "global",
};
export const DataRedundancy = {
    SingleAvailabilityZone: "SingleAvailabilityZone",
    SingleLocalZone: "SingleLocalZone",
};
export const BucketType = {
    Directory: "Directory",
};
export const LocationType = {
    AvailabilityZone: "AvailabilityZone",
    LocalZone: "LocalZone",
};
export const BucketLocationConstraint = {
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
export const ObjectOwnership = {
    BucketOwnerEnforced: "BucketOwnerEnforced",
    BucketOwnerPreferred: "BucketOwnerPreferred",
    ObjectWriter: "ObjectWriter",
};
export const AnnotationConfigurationState = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
};
export const TableSseAlgorithm = {
    AES256: "AES256",
    aws_kms: "aws:kms",
};
export const InventoryConfigurationState = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
};
export const ExpirationState = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
};
export const SessionMode = {
    ReadOnly: "ReadOnly",
    ReadWrite: "ReadWrite",
};
export const AnalyticsS3ExportFileFormat = {
    CSV: "CSV",
};
export const StorageClassAnalysisSchemaVersion = {
    V_1: "V_1",
};
export const EncryptionType = {
    NONE: "NONE",
    SSE_C: "SSE-C",
};
export const IntelligentTieringStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const IntelligentTieringAccessTier = {
    ARCHIVE_ACCESS: "ARCHIVE_ACCESS",
    DEEP_ARCHIVE_ACCESS: "DEEP_ARCHIVE_ACCESS",
};
export const InventoryFormat = {
    CSV: "CSV",
    ORC: "ORC",
    Parquet: "Parquet",
};
export const InventoryIncludedObjectVersions = {
    All: "All",
    Current: "Current",
};
export const InventoryOptionalField = {
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
export const InventoryFrequency = {
    Daily: "Daily",
    Weekly: "Weekly",
};
export const TransitionStorageClass = {
    DEEP_ARCHIVE: "DEEP_ARCHIVE",
    GLACIER: "GLACIER",
    GLACIER_IR: "GLACIER_IR",
    INTELLIGENT_TIERING: "INTELLIGENT_TIERING",
    ONEZONE_IA: "ONEZONE_IA",
    STANDARD_IA: "STANDARD_IA",
};
export const ExpirationStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const TransitionDefaultMinimumObjectSize = {
    all_storage_classes_128K: "all_storage_classes_128K",
    varies_by_storage_class: "varies_by_storage_class",
};
export const BucketLogsPermission = {
    FULL_CONTROL: "FULL_CONTROL",
    READ: "READ",
    WRITE: "WRITE",
};
export const PartitionDateSource = {
    DeliveryTime: "DeliveryTime",
    EventTime: "EventTime",
};
export const S3TablesBucketType = {
    aws: "aws",
    customer: "customer",
};
export const Event = {
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
export const FilterRuleName = {
    prefix: "prefix",
    suffix: "suffix",
};
export const DeleteMarkerReplicationStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const MetricsStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const ReplicationTimeStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const ExistingObjectReplicationStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const ReplicaModificationsStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const SseKmsEncryptedObjectsStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const ReplicationRuleStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const Payer = {
    BucketOwner: "BucketOwner",
    Requester: "Requester",
};
export const MFADeleteStatus = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const BucketVersioningStatus = {
    Enabled: "Enabled",
    Suspended: "Suspended",
};
export const Protocol = {
    http: "http",
    https: "https",
};
export const ReplicationStatus = {
    COMPLETE: "COMPLETE",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
    PENDING: "PENDING",
    REPLICA: "REPLICA",
};
export const ChecksumMode = {
    ENABLED: "ENABLED",
};
export const ObjectAttributes = {
    CHECKSUM: "Checksum",
    ETAG: "ETag",
    OBJECT_PARTS: "ObjectParts",
    OBJECT_SIZE: "ObjectSize",
    STORAGE_CLASS: "StorageClass",
};
export const ObjectLockEnabled = {
    Enabled: "Enabled",
};
export const ObjectLockRetentionMode = {
    COMPLIANCE: "COMPLIANCE",
    GOVERNANCE: "GOVERNANCE",
};
export const ArchiveStatus = {
    ARCHIVE_ACCESS: "ARCHIVE_ACCESS",
    DEEP_ARCHIVE_ACCESS: "DEEP_ARCHIVE_ACCESS",
};
export const EncodingType = {
    url: "url",
};
export const ObjectStorageClass = {
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
export const OptionalObjectAttributes = {
    RESTORE_STATUS: "RestoreStatus",
};
export const ObjectVersionStorageClass = {
    STANDARD: "STANDARD",
};
export const MFADelete = {
    Disabled: "Disabled",
    Enabled: "Enabled",
};
export const Tier = {
    Bulk: "Bulk",
    Expedited: "Expedited",
    Standard: "Standard",
};
export const ExpressionType = {
    SQL: "SQL",
};
export const CompressionType = {
    BZIP2: "BZIP2",
    GZIP: "GZIP",
    NONE: "NONE",
};
export const FileHeaderInfo = {
    IGNORE: "IGNORE",
    NONE: "NONE",
    USE: "USE",
};
export const JSONType = {
    DOCUMENT: "DOCUMENT",
    LINES: "LINES",
};
export const QuoteFields = {
    ALWAYS: "ALWAYS",
    ASNEEDED: "ASNEEDED",
};
export const RestoreRequestType = {
    SELECT: "SELECT",
};
