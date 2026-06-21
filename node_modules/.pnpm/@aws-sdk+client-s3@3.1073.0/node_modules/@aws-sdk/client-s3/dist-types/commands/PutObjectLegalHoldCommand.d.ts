import { Command as $Command } from "@smithy/core/client";
import type { MetadataBearer as __MetadataBearer } from "@smithy/types";
import type { PutObjectLegalHoldOutput, PutObjectLegalHoldRequest } from "../models/models_0";
import type { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link PutObjectLegalHoldCommand}.
 */
export interface PutObjectLegalHoldCommandInput extends PutObjectLegalHoldRequest {
}
/**
 * @public
 *
 * The output of {@link PutObjectLegalHoldCommand}.
 */
export interface PutObjectLegalHoldCommandOutput extends PutObjectLegalHoldOutput, __MetadataBearer {
}
declare const PutObjectLegalHoldCommand_base: {
    new (input: PutObjectLegalHoldCommandInput): import("@smithy/core/client").CommandImpl<PutObjectLegalHoldCommandInput, PutObjectLegalHoldCommandOutput, S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: PutObjectLegalHoldCommandInput): import("@smithy/core/client").CommandImpl<PutObjectLegalHoldCommandInput, PutObjectLegalHoldCommandOutput, S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): {
        [x: string]: unknown;
    };
};
/**
 * <note>
 *             <p>This operation is not supported for directory buckets.</p>
 *          </note>
 *          <p>Applies a legal hold configuration to the specified object. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking Objects</a>.</p>
 *          <p>This functionality is not supported for Amazon S3 on Outposts.</p>
 *          <important>
 *             <p>You must URL encode any signed header values that contain spaces. For example, if your header value is <code>my  file.txt</code>, containing two spaces after <code>my</code>, you must URL encode this value to <code>my%20%20file.txt</code>.</p>
 *          </important>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { S3Client, PutObjectLegalHoldCommand } from "@aws-sdk/client-s3"; // ES Modules import
 * // const { S3Client, PutObjectLegalHoldCommand } = require("@aws-sdk/client-s3"); // CommonJS import
 * // import type { S3ClientConfig } from "@aws-sdk/client-s3";
 * const config = {}; // type is S3ClientConfig
 * const client = new S3Client(config);
 * const input = { // PutObjectLegalHoldRequest
 *   Bucket: "STRING_VALUE", // required
 *   Key: "STRING_VALUE", // required
 *   LegalHold: { // ObjectLockLegalHold
 *     Status: "ON" || "OFF",
 *   },
 *   RequestPayer: "requester",
 *   VersionId: "STRING_VALUE",
 *   ContentMD5: "STRING_VALUE",
 *   ChecksumAlgorithm: "CRC32" || "CRC32C" || "SHA1" || "SHA256" || "CRC64NVME" || "SHA512" || "MD5" || "XXHASH64" || "XXHASH3" || "XXHASH128",
 *   ExpectedBucketOwner: "STRING_VALUE",
 * };
 * const command = new PutObjectLegalHoldCommand(input);
 * const response = await client.send(command);
 * // { // PutObjectLegalHoldOutput
 * //   RequestCharged: "requester",
 * // };
 *
 * ```
 *
 * @param PutObjectLegalHoldCommandInput - {@link PutObjectLegalHoldCommandInput}
 * @returns {@link PutObjectLegalHoldCommandOutput}
 * @see {@link PutObjectLegalHoldCommandInput} for command's `input` shape.
 * @see {@link PutObjectLegalHoldCommandOutput} for command's `response` shape.
 * @see {@link S3ClientResolvedConfig | config} for S3Client's `config` shape.
 *
 * @throws {@link S3ServiceException}
 * <p>Base exception class for all service exceptions from S3 service.</p>
 *
 *
 * @public
 */
export declare class PutObjectLegalHoldCommand extends PutObjectLegalHoldCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: PutObjectLegalHoldRequest;
            output: PutObjectLegalHoldOutput;
        };
        sdk: {
            input: PutObjectLegalHoldCommandInput;
            output: PutObjectLegalHoldCommandOutput;
        };
    };
}
