import type { ExceptionOptionType as __ExceptionOptionType } from "@smithy/core/client";
import type { IntelligentTieringAccessTier, StorageClass } from "./enums";
import { S3ServiceException as __BaseException } from "./S3ServiceException";
/**
 * <p>The specified multipart upload does not exist.</p>
 * @public
 */
export declare class NoSuchUpload extends __BaseException {
    readonly name: "NoSuchUpload";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<NoSuchUpload, __BaseException>);
}
/**
 * <p>
 *       You might receive this error for several reasons. For details, see the description of this API
 *       operation.</p>
 * @public
 */
export declare class AccessDenied extends __BaseException {
    readonly name: "AccessDenied";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<AccessDenied, __BaseException>);
}
/**
 * <p>The source object of the COPY action is not in the active tier and is only stored in Amazon S3
 *       Glacier.</p>
 * @public
 */
export declare class ObjectNotInActiveTierError extends __BaseException {
    readonly name: "ObjectNotInActiveTierError";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<ObjectNotInActiveTierError, __BaseException>);
}
/**
 * <p>The requested bucket name is not available. The bucket namespace is shared by all users of the
 *       system. Select a different name and try again.</p>
 * @public
 */
export declare class BucketAlreadyExists extends __BaseException {
    readonly name: "BucketAlreadyExists";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<BucketAlreadyExists, __BaseException>);
}
/**
 * <p>The bucket you tried to create already exists, and you own it. Amazon S3 returns this error in all Amazon Web Services
 *       Regions except in the North Virginia Region. For legacy compatibility, if you re-create an existing
 *       bucket that you already own in the North Virginia Region, Amazon S3 returns 200 OK and resets the bucket
 *       access control lists (ACLs).</p>
 * @public
 */
export declare class BucketAlreadyOwnedByYou extends __BaseException {
    readonly name: "BucketAlreadyOwnedByYou";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<BucketAlreadyOwnedByYou, __BaseException>);
}
/**
 * <p>The specified bucket does not exist.</p>
 * @public
 */
export declare class NoSuchBucket extends __BaseException {
    readonly name: "NoSuchBucket";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<NoSuchBucket, __BaseException>);
}
/**
 * <p>The specified key does not exist.</p>
 * @public
 */
export declare class NoSuchKey extends __BaseException {
    readonly name: "NoSuchKey";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<NoSuchKey, __BaseException>);
}
/**
 * <p>Object is archived and inaccessible until restored.</p>
 *          <p>If the object you are retrieving is stored in the S3 Glacier Flexible Retrieval storage class, the
 *       S3 Glacier Deep Archive storage class, the S3 Intelligent-Tiering Archive Access tier, or the
 *       S3 Intelligent-Tiering Deep Archive Access tier, before you can retrieve the object you must first restore a copy
 *       using <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_RestoreObject.html">RestoreObject</a>. Otherwise, this operation returns an <code>InvalidObjectState</code> error. For
 *       information about restoring archived objects, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/restoring-objects.html">Restoring Archived Objects</a> in the
 *         <i>Amazon S3 User Guide</i>.</p>
 * @public
 */
export declare class InvalidObjectState extends __BaseException {
    readonly name: "InvalidObjectState";
    readonly $fault: "client";
    StorageClass?: StorageClass | undefined;
    AccessTier?: IntelligentTieringAccessTier | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidObjectState, __BaseException>);
}
/**
 * <p>The specified annotation does not exist on this object.</p>
 * @public
 */
export declare class NoSuchAnnotation extends __BaseException {
    readonly name: "NoSuchAnnotation";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<NoSuchAnnotation, __BaseException>);
}
/**
 * <p>The specified content does not exist.</p>
 * @public
 */
export declare class NotFound extends __BaseException {
    readonly name: "NotFound";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<NotFound, __BaseException>);
}
/**
 * <p>The annotation prefix you provided is invalid.</p>
 * @public
 */
export declare class InvalidPrefix extends __BaseException {
    readonly name: "InvalidPrefix";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidPrefix, __BaseException>);
}
/**
 * <p> The existing object was created with a different encryption type. Subsequent write requests must
 *       include the appropriate encryption parameters in the request or while creating the session. </p>
 * @public
 */
export declare class EncryptionTypeMismatch extends __BaseException {
    readonly name: "EncryptionTypeMismatch";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<EncryptionTypeMismatch, __BaseException>);
}
/**
 * <p>A parameter or header in your request isn't valid. For details, see the description of this API
 *       operation.</p>
 * @public
 */
export declare class InvalidRequest extends __BaseException {
    readonly name: "InvalidRequest";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidRequest, __BaseException>);
}
/**
 * <p> The write offset value that you specified does not match the current object size. </p>
 * @public
 */
export declare class InvalidWriteOffset extends __BaseException {
    readonly name: "InvalidWriteOffset";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidWriteOffset, __BaseException>);
}
/**
 * <p> You have attempted to add more parts than the maximum of 10000 that are allowed for this object.
 *       You can use the CopyObject operation to copy this object to another and then add more data to the newly
 *       copied object. </p>
 * @public
 */
export declare class TooManyParts extends __BaseException {
    readonly name: "TooManyParts";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<TooManyParts, __BaseException>);
}
/**
 * <p>The request would exceed the maximum number of annotations allowed per object.</p>
 * @public
 */
export declare class AnnotationLimitExceeded extends __BaseException {
    readonly name: "AnnotationLimitExceeded";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<AnnotationLimitExceeded, __BaseException>);
}
/**
 * <p>The annotation name exceeds 512 bytes.</p>
 * @public
 */
export declare class AnnotationNameTooLong extends __BaseException {
    readonly name: "AnnotationNameTooLong";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<AnnotationNameTooLong, __BaseException>);
}
/**
 * <p>The annotation name you provided is invalid.</p>
 * @public
 */
export declare class InvalidAnnotationName extends __BaseException {
    readonly name: "InvalidAnnotationName";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidAnnotationName, __BaseException>);
}
/**
 * <p>The annotation payload is not valid UTF-8 encoded text.</p>
 * @public
 */
export declare class UnsupportedMediaType extends __BaseException {
    readonly name: "UnsupportedMediaType";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<UnsupportedMediaType, __BaseException>);
}
/**
 * <p>Parameters on this idempotent request are inconsistent with parameters used in previous request(s). </p>
 *          <p>For a list of error codes and more information on Amazon S3 errors, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html#ErrorCodeList">Error codes</a>.</p>
 *          <note>
 *             <p>Idempotency ensures that an API request completes no more than one time. With an idempotent
 *         request, if the original request completes successfully, any subsequent retries complete successfully
 *         without performing any further actions.</p>
 *          </note>
 * @public
 */
export declare class IdempotencyParameterMismatch extends __BaseException {
    readonly name: "IdempotencyParameterMismatch";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<IdempotencyParameterMismatch, __BaseException>);
}
/**
 * <p>This action is not allowed against this storage tier.</p>
 * @public
 */
export declare class ObjectAlreadyInActiveTierError extends __BaseException {
    readonly name: "ObjectAlreadyInActiveTierError";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<ObjectAlreadyInActiveTierError, __BaseException>);
}
