import { StreamingBlobTypes } from "@smithy/types";
import {
  AnnotationConfigurationState,
  ChecksumAlgorithm,
  CompressionType,
  ExpressionType,
  FileHeaderInfo,
  InventoryConfigurationState,
  JSONType,
  ObjectCannedACL,
  ObjectLockLegalHoldStatus,
  ObjectLockMode,
  QuoteFields,
  ReplicationStatus,
  RequestCharged,
  RequestPayer,
  RestoreRequestType,
  ServerSideEncryption,
  StorageClass,
  Tier,
} from "./enums";
import {
  Grant,
  MetadataTableEncryptionConfiguration,
  RecordExpiration,
  Tagging,
} from "./models_0";
export interface RenameObjectOutput {}
export interface RenameObjectRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  RenameSource: string | undefined;
  DestinationIfMatch?: string | undefined;
  DestinationIfNoneMatch?: string | undefined;
  DestinationIfModifiedSince?: Date | undefined;
  DestinationIfUnmodifiedSince?: Date | undefined;
  SourceIfMatch?: string | undefined;
  SourceIfNoneMatch?: string | undefined;
  SourceIfModifiedSince?: Date | undefined;
  SourceIfUnmodifiedSince?: Date | undefined;
  ClientToken?: string | undefined;
}
export interface RestoreObjectOutput {
  RequestCharged?: RequestCharged | undefined;
  RestoreOutputPath?: string | undefined;
}
export interface GlacierJobParameters {
  Tier: Tier | undefined;
}
export interface Encryption {
  EncryptionType: ServerSideEncryption | undefined;
  KMSKeyId?: string | undefined;
  KMSContext?: string | undefined;
}
export interface MetadataEntry {
  Name?: string | undefined;
  Value?: string | undefined;
}
export interface S3Location {
  BucketName: string | undefined;
  Prefix: string | undefined;
  Encryption?: Encryption | undefined;
  CannedACL?: ObjectCannedACL | undefined;
  AccessControlList?: Grant[] | undefined;
  Tagging?: Tagging | undefined;
  UserMetadata?: MetadataEntry[] | undefined;
  StorageClass?: StorageClass | undefined;
}
export interface OutputLocation {
  S3?: S3Location | undefined;
}
export interface CSVInput {
  FileHeaderInfo?: FileHeaderInfo | undefined;
  Comments?: string | undefined;
  QuoteEscapeCharacter?: string | undefined;
  RecordDelimiter?: string | undefined;
  FieldDelimiter?: string | undefined;
  QuoteCharacter?: string | undefined;
  AllowQuotedRecordDelimiter?: boolean | undefined;
}
export interface JSONInput {
  Type?: JSONType | undefined;
}
export interface ParquetInput {}
export interface InputSerialization {
  CSV?: CSVInput | undefined;
  CompressionType?: CompressionType | undefined;
  JSON?: JSONInput | undefined;
  Parquet?: ParquetInput | undefined;
}
export interface CSVOutput {
  QuoteFields?: QuoteFields | undefined;
  QuoteEscapeCharacter?: string | undefined;
  RecordDelimiter?: string | undefined;
  FieldDelimiter?: string | undefined;
  QuoteCharacter?: string | undefined;
}
export interface JSONOutput {
  RecordDelimiter?: string | undefined;
}
export interface OutputSerialization {
  CSV?: CSVOutput | undefined;
  JSON?: JSONOutput | undefined;
}
export interface SelectParameters {
  InputSerialization: InputSerialization | undefined;
  ExpressionType: ExpressionType | undefined;
  Expression: string | undefined;
  OutputSerialization: OutputSerialization | undefined;
}
export interface RestoreRequest {
  Days?: number | undefined;
  GlacierJobParameters?: GlacierJobParameters | undefined;
  Type?: RestoreRequestType | undefined;
  Tier?: Tier | undefined;
  Description?: string | undefined;
  SelectParameters?: SelectParameters | undefined;
  OutputLocation?: OutputLocation | undefined;
}
export interface RestoreObjectRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  RestoreRequest?: RestoreRequest | undefined;
  RequestPayer?: RequestPayer | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface ContinuationEvent {}
export interface EndEvent {}
export interface Progress {
  BytesScanned?: number | undefined;
  BytesProcessed?: number | undefined;
  BytesReturned?: number | undefined;
}
export interface ProgressEvent {
  Details?: Progress | undefined;
}
export interface RecordsEvent {
  Payload?: Uint8Array | undefined;
}
export interface Stats {
  BytesScanned?: number | undefined;
  BytesProcessed?: number | undefined;
  BytesReturned?: number | undefined;
}
export interface StatsEvent {
  Details?: Stats | undefined;
}
export type SelectObjectContentEventStream =
  | SelectObjectContentEventStream.ContMember
  | SelectObjectContentEventStream.EndMember
  | SelectObjectContentEventStream.ProgressMember
  | SelectObjectContentEventStream.RecordsMember
  | SelectObjectContentEventStream.StatsMember
  | SelectObjectContentEventStream.$UnknownMember;
export declare namespace SelectObjectContentEventStream {
  interface RecordsMember {
    Records: RecordsEvent;
    Stats?: never;
    Progress?: never;
    Cont?: never;
    End?: never;
    $unknown?: never;
  }
  interface StatsMember {
    Records?: never;
    Stats: StatsEvent;
    Progress?: never;
    Cont?: never;
    End?: never;
    $unknown?: never;
  }
  interface ProgressMember {
    Records?: never;
    Stats?: never;
    Progress: ProgressEvent;
    Cont?: never;
    End?: never;
    $unknown?: never;
  }
  interface ContMember {
    Records?: never;
    Stats?: never;
    Progress?: never;
    Cont: ContinuationEvent;
    End?: never;
    $unknown?: never;
  }
  interface EndMember {
    Records?: never;
    Stats?: never;
    Progress?: never;
    Cont?: never;
    End: EndEvent;
    $unknown?: never;
  }
  interface $UnknownMember {
    Records?: never;
    Stats?: never;
    Progress?: never;
    Cont?: never;
    End?: never;
    $unknown: [string, any];
  }
  interface Visitor<T> {
    Records: (value: RecordsEvent) => T;
    Stats: (value: StatsEvent) => T;
    Progress: (value: ProgressEvent) => T;
    Cont: (value: ContinuationEvent) => T;
    End: (value: EndEvent) => T;
    _: (name: string, value: any) => T;
  }
}
export interface SelectObjectContentOutput {
  Payload?: AsyncIterable<SelectObjectContentEventStream> | undefined;
}
export interface RequestProgress {
  Enabled?: boolean | undefined;
}
export interface ScanRange {
  Start?: number | undefined;
  End?: number | undefined;
}
export interface SelectObjectContentRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  Expression: string | undefined;
  ExpressionType: ExpressionType | undefined;
  RequestProgress?: RequestProgress | undefined;
  InputSerialization: InputSerialization | undefined;
  OutputSerialization: OutputSerialization | undefined;
  ScanRange?: ScanRange | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface AnnotationTableConfigurationUpdates {
  ConfigurationState: AnnotationConfigurationState | undefined;
  EncryptionConfiguration?: MetadataTableEncryptionConfiguration | undefined;
  Role?: string | undefined;
}
export interface UpdateBucketMetadataAnnotationTableConfigurationRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  AnnotationTableConfiguration: AnnotationTableConfigurationUpdates | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface InventoryTableConfigurationUpdates {
  ConfigurationState: InventoryConfigurationState | undefined;
  EncryptionConfiguration?: MetadataTableEncryptionConfiguration | undefined;
}
export interface UpdateBucketMetadataInventoryTableConfigurationRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  InventoryTableConfiguration: InventoryTableConfigurationUpdates | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface JournalTableConfigurationUpdates {
  RecordExpiration: RecordExpiration | undefined;
}
export interface UpdateBucketMetadataJournalTableConfigurationRequest {
  Bucket: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
  JournalTableConfiguration: JournalTableConfigurationUpdates | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface SSEKMSEncryption {
  KMSKeyArn: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
}
export type ObjectEncryption =
  | ObjectEncryption.SSEKMSMember
  | ObjectEncryption.$UnknownMember;
export declare namespace ObjectEncryption {
  interface SSEKMSMember {
    SSEKMS: SSEKMSEncryption;
    $unknown?: never;
  }
  interface $UnknownMember {
    SSEKMS?: never;
    $unknown: [string, any];
  }
  interface Visitor<T> {
    SSEKMS: (value: SSEKMSEncryption) => T;
    _: (name: string, value: any) => T;
  }
}
export interface UpdateObjectEncryptionRequest {
  Bucket: string | undefined;
  Key: string | undefined;
  VersionId?: string | undefined;
  ObjectEncryption: ObjectEncryption | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
  ContentMD5?: string | undefined;
  ChecksumAlgorithm?: ChecksumAlgorithm | undefined;
}
export interface UpdateObjectEncryptionResponse {
  RequestCharged?: RequestCharged | undefined;
}
export interface UploadPartOutput {
  ServerSideEncryption?: ServerSideEncryption | undefined;
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
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface UploadPartRequest {
  Body?: StreamingBlobTypes | undefined;
  Bucket: string | undefined;
  ContentLength?: number | undefined;
  ContentMD5?: string | undefined;
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
  Key: string | undefined;
  PartNumber: number | undefined;
  UploadId: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
}
export interface CopyPartResult {
  ETag?: string | undefined;
  LastModified?: Date | undefined;
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
export interface UploadPartCopyOutput {
  CopySourceVersionId?: string | undefined;
  CopyPartResult?: CopyPartResult | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
  RequestCharged?: RequestCharged | undefined;
}
export interface UploadPartCopyRequest {
  Bucket: string | undefined;
  CopySource: string | undefined;
  CopySourceIfMatch?: string | undefined;
  CopySourceIfModifiedSince?: Date | undefined;
  CopySourceIfNoneMatch?: string | undefined;
  CopySourceIfUnmodifiedSince?: Date | undefined;
  CopySourceRange?: string | undefined;
  Key: string | undefined;
  PartNumber: number | undefined;
  UploadId: string | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSECustomerKey?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  CopySourceSSECustomerAlgorithm?: string | undefined;
  CopySourceSSECustomerKey?: string | undefined;
  CopySourceSSECustomerKeyMD5?: string | undefined;
  RequestPayer?: RequestPayer | undefined;
  ExpectedBucketOwner?: string | undefined;
  ExpectedSourceBucketOwner?: string | undefined;
}
export interface WriteGetObjectResponseRequest {
  RequestRoute: string | undefined;
  RequestToken: string | undefined;
  Body?: StreamingBlobTypes | undefined;
  StatusCode?: number | undefined;
  ErrorCode?: string | undefined;
  ErrorMessage?: string | undefined;
  AcceptRanges?: string | undefined;
  CacheControl?: string | undefined;
  ContentDisposition?: string | undefined;
  ContentEncoding?: string | undefined;
  ContentLanguage?: string | undefined;
  ContentLength?: number | undefined;
  ContentRange?: string | undefined;
  ContentType?: string | undefined;
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
  DeleteMarker?: boolean | undefined;
  ETag?: string | undefined;
  Expires?: Date | undefined;
  Expiration?: string | undefined;
  LastModified?: Date | undefined;
  MissingMeta?: number | undefined;
  Metadata?: Record<string, string> | undefined;
  ObjectLockMode?: ObjectLockMode | undefined;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus | undefined;
  ObjectLockRetainUntilDate?: Date | undefined;
  PartsCount?: number | undefined;
  ReplicationStatus?: ReplicationStatus | undefined;
  RequestCharged?: RequestCharged | undefined;
  Restore?: string | undefined;
  ServerSideEncryption?: ServerSideEncryption | undefined;
  SSECustomerAlgorithm?: string | undefined;
  SSEKMSKeyId?: string | undefined;
  SSECustomerKeyMD5?: string | undefined;
  StorageClass?: StorageClass | undefined;
  TagCount?: number | undefined;
  VersionId?: string | undefined;
  BucketKeyEnabled?: boolean | undefined;
}
