const { ServiceException: __ServiceException } = require("@smithy/core/client");
exports.__ServiceException = __ServiceException;
exports.S3ServiceException = class S3ServiceException extends __ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, S3ServiceException.prototype);
    }
};
