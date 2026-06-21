const { S3ServiceException: __BaseException } = require("./S3ServiceException");
exports.NoSuchUpload = class NoSuchUpload extends __BaseException {
    name = "NoSuchUpload";
    $fault = "client";
    constructor(opts) {
        super({
            name: "NoSuchUpload",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, NoSuchUpload.prototype);
    }
};
exports.AccessDenied = class AccessDenied extends __BaseException {
    name = "AccessDenied";
    $fault = "client";
    constructor(opts) {
        super({
            name: "AccessDenied",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AccessDenied.prototype);
    }
};
exports.ObjectNotInActiveTierError = class ObjectNotInActiveTierError extends __BaseException {
    name = "ObjectNotInActiveTierError";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ObjectNotInActiveTierError",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ObjectNotInActiveTierError.prototype);
    }
};
exports.BucketAlreadyExists = class BucketAlreadyExists extends __BaseException {
    name = "BucketAlreadyExists";
    $fault = "client";
    constructor(opts) {
        super({
            name: "BucketAlreadyExists",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, BucketAlreadyExists.prototype);
    }
};
exports.BucketAlreadyOwnedByYou = class BucketAlreadyOwnedByYou extends __BaseException {
    name = "BucketAlreadyOwnedByYou";
    $fault = "client";
    constructor(opts) {
        super({
            name: "BucketAlreadyOwnedByYou",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, BucketAlreadyOwnedByYou.prototype);
    }
};
exports.NoSuchBucket = class NoSuchBucket extends __BaseException {
    name = "NoSuchBucket";
    $fault = "client";
    constructor(opts) {
        super({
            name: "NoSuchBucket",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, NoSuchBucket.prototype);
    }
};
exports.NoSuchKey = class NoSuchKey extends __BaseException {
    name = "NoSuchKey";
    $fault = "client";
    constructor(opts) {
        super({
            name: "NoSuchKey",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, NoSuchKey.prototype);
    }
};
exports.InvalidObjectState = class InvalidObjectState extends __BaseException {
    name = "InvalidObjectState";
    $fault = "client";
    StorageClass;
    AccessTier;
    constructor(opts) {
        super({
            name: "InvalidObjectState",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidObjectState.prototype);
        this.StorageClass = opts.StorageClass;
        this.AccessTier = opts.AccessTier;
    }
};
exports.NoSuchAnnotation = class NoSuchAnnotation extends __BaseException {
    name = "NoSuchAnnotation";
    $fault = "client";
    constructor(opts) {
        super({
            name: "NoSuchAnnotation",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, NoSuchAnnotation.prototype);
    }
};
exports.NotFound = class NotFound extends __BaseException {
    name = "NotFound";
    $fault = "client";
    constructor(opts) {
        super({
            name: "NotFound",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, NotFound.prototype);
    }
};
exports.InvalidPrefix = class InvalidPrefix extends __BaseException {
    name = "InvalidPrefix";
    $fault = "client";
    constructor(opts) {
        super({
            name: "InvalidPrefix",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidPrefix.prototype);
    }
};
exports.EncryptionTypeMismatch = class EncryptionTypeMismatch extends __BaseException {
    name = "EncryptionTypeMismatch";
    $fault = "client";
    constructor(opts) {
        super({
            name: "EncryptionTypeMismatch",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, EncryptionTypeMismatch.prototype);
    }
};
exports.InvalidRequest = class InvalidRequest extends __BaseException {
    name = "InvalidRequest";
    $fault = "client";
    constructor(opts) {
        super({
            name: "InvalidRequest",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidRequest.prototype);
    }
};
exports.InvalidWriteOffset = class InvalidWriteOffset extends __BaseException {
    name = "InvalidWriteOffset";
    $fault = "client";
    constructor(opts) {
        super({
            name: "InvalidWriteOffset",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidWriteOffset.prototype);
    }
};
exports.TooManyParts = class TooManyParts extends __BaseException {
    name = "TooManyParts";
    $fault = "client";
    constructor(opts) {
        super({
            name: "TooManyParts",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TooManyParts.prototype);
    }
};
exports.AnnotationLimitExceeded = class AnnotationLimitExceeded extends __BaseException {
    name = "AnnotationLimitExceeded";
    $fault = "client";
    constructor(opts) {
        super({
            name: "AnnotationLimitExceeded",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AnnotationLimitExceeded.prototype);
    }
};
exports.AnnotationNameTooLong = class AnnotationNameTooLong extends __BaseException {
    name = "AnnotationNameTooLong";
    $fault = "client";
    constructor(opts) {
        super({
            name: "AnnotationNameTooLong",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AnnotationNameTooLong.prototype);
    }
};
exports.InvalidAnnotationName = class InvalidAnnotationName extends __BaseException {
    name = "InvalidAnnotationName";
    $fault = "client";
    constructor(opts) {
        super({
            name: "InvalidAnnotationName",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidAnnotationName.prototype);
    }
};
exports.UnsupportedMediaType = class UnsupportedMediaType extends __BaseException {
    name = "UnsupportedMediaType";
    $fault = "client";
    constructor(opts) {
        super({
            name: "UnsupportedMediaType",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, UnsupportedMediaType.prototype);
    }
};
exports.IdempotencyParameterMismatch = class IdempotencyParameterMismatch extends __BaseException {
    name = "IdempotencyParameterMismatch";
    $fault = "client";
    constructor(opts) {
        super({
            name: "IdempotencyParameterMismatch",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, IdempotencyParameterMismatch.prototype);
    }
};
exports.ObjectAlreadyInActiveTierError = class ObjectAlreadyInActiveTierError extends __BaseException {
    name = "ObjectAlreadyInActiveTierError";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ObjectAlreadyInActiveTierError",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ObjectAlreadyInActiveTierError.prototype);
    }
};
