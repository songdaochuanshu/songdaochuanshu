import { getFlexibleChecksumsPlugin } from "@aws-sdk/middleware-flexible-checksums";
import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { PutBucketAbac$ } from "../schemas/schemas_0";
export { $Command };
export class PutBucketAbacCommand extends $Command
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
            requestChecksumRequired: false,
        }),
    ];
})
    .s("AmazonS3", "PutBucketAbac", {})
    .n("S3Client", "PutBucketAbacCommand")
    .sc(PutBucketAbac$)
    .build() {
}
