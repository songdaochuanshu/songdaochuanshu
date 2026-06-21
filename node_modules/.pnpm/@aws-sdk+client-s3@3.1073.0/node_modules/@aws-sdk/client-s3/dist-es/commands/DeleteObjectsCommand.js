import { getFlexibleChecksumsPlugin } from "@aws-sdk/middleware-flexible-checksums";
import { getThrow200ExceptionsPlugin } from "@aws-sdk/middleware-sdk-s3/s3";
import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { DeleteObjects$ } from "../schemas/schemas_0";
export { $Command };
export class DeleteObjectsCommand extends $Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "DeleteObjects", {})
    .n("S3Client", "DeleteObjectsCommand")
    .sc(DeleteObjects$)
    .build() {
}
