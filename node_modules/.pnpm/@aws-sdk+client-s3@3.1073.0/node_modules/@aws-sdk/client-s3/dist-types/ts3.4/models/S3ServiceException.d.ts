import {
  ServiceExceptionOptions as __ServiceExceptionOptions,
  ServiceException as __ServiceException,
} from "@smithy/core/client";
export { __ServiceExceptionOptions };
export { __ServiceException };
export declare class S3ServiceException extends __ServiceException {
  constructor(options: __ServiceExceptionOptions);
}
