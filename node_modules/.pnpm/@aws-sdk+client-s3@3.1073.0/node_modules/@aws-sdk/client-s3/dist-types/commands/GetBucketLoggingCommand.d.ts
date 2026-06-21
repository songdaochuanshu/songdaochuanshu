import { Command as $Command } from "@smithy/core/client";
import type { MetadataBearer as __MetadataBearer } from "@smithy/types";
import type { GetBucketLoggingOutput, GetBucketLoggingRequest } from "../models/models_0";
import type { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link GetBucketLoggingCommand}.
 */
export interface GetBucketLoggingCommandInput extends GetBucketLoggingRequest {
}
/**
 * @public
 *
 * The output of {@link GetBucketLoggingCommand}.
 */
export interface GetBucketLoggingCommandOutput extends GetBucketLoggingOutput, __MetadataBearer {
}
declare const GetBucketLoggingCommand_base: {
    new (input: GetBucketLoggingCommandInput): import("@smithy/core/client").CommandImpl<GetBucketLoggingCommandInput, GetBucketLoggingCommandOutput, S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: GetBucketLoggingCommandInput): import("@smithy/core/client").CommandImpl<GetBucketLoggingCommandInput, GetBucketLoggingCommandOutput, S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): {
        [x: string]: unknown;
    };
};
/**
 * <note>
 *             <p>This operation is not supported for directory buckets.</p>
 *          </note>
 *          <p>Returns the logging status of a bucket and the permissions users have to view and modify that
 *       status.</p>
 *          <p>The following operations are related to <code>GetBucketLogging</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLogging.html">PutBucketLogging</a>
 *                </p>
 *             </li>
 *          </ul>
 *          <important>
 *             <p>You must URL encode any signed header values that contain spaces. For example, if your header value is <code>my  file.txt</code>, containing two spaces after <code>my</code>, you must URL encode this value to <code>my%20%20file.txt</code>.</p>
 *          </important>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { S3Client, GetBucketLoggingCommand } from "@aws-sdk/client-s3"; // ES Modules import
 * // const { S3Client, GetBucketLoggingCommand } = require("@aws-sdk/client-s3"); // CommonJS import
 * // import type { S3ClientConfig } from "@aws-sdk/client-s3";
 * const config = {}; // type is S3ClientConfig
 * const client = new S3Client(config);
 * const input = { // GetBucketLoggingRequest
 *   Bucket: "STRING_VALUE", // required
 *   ExpectedBucketOwner: "STRING_VALUE",
 * };
 * const command = new GetBucketLoggingCommand(input);
 * const response = await client.send(command);
 * // { // GetBucketLoggingOutput
 * //   LoggingEnabled: { // LoggingEnabled
 * //     TargetBucket: "STRING_VALUE", // required
 * //     TargetGrants: [ // TargetGrants
 * //       { // TargetGrant
 * //         Grantee: { // Grantee
 * //           DisplayName: "STRING_VALUE",
 * //           EmailAddress: "STRING_VALUE",
 * //           ID: "STRING_VALUE",
 * //           URI: "STRING_VALUE",
 * //           Type: "CanonicalUser" || "AmazonCustomerByEmail" || "Group", // required
 * //         },
 * //         Permission: "FULL_CONTROL" || "READ" || "WRITE",
 * //       },
 * //     ],
 * //     TargetPrefix: "STRING_VALUE", // required
 * //     TargetObjectKeyFormat: { // TargetObjectKeyFormat
 * //       SimplePrefix: {},
 * //       PartitionedPrefix: { // PartitionedPrefix
 * //         PartitionDateSource: "EventTime" || "DeliveryTime",
 * //       },
 * //     },
 * //   },
 * // };
 *
 * ```
 *
 * @param GetBucketLoggingCommandInput - {@link GetBucketLoggingCommandInput}
 * @returns {@link GetBucketLoggingCommandOutput}
 * @see {@link GetBucketLoggingCommandInput} for command's `input` shape.
 * @see {@link GetBucketLoggingCommandOutput} for command's `response` shape.
 * @see {@link S3ClientResolvedConfig | config} for S3Client's `config` shape.
 *
 * @throws {@link S3ServiceException}
 * <p>Base exception class for all service exceptions from S3 service.</p>
 *
 *
 * @public
 */
export declare class GetBucketLoggingCommand extends GetBucketLoggingCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: GetBucketLoggingRequest;
            output: GetBucketLoggingOutput;
        };
        sdk: {
            input: GetBucketLoggingCommandInput;
            output: GetBucketLoggingCommandOutput;
        };
    };
}
