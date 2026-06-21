import { getFlexibleChecksumsPlugin } from "@aws-sdk/middleware-flexible-checksums";
import { getThrow200ExceptionsPlugin } from "@aws-sdk/middleware-sdk-s3/s3";
import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { PutObjectAnnotation$ } from "../schemas/schemas_0";
export { $Command };
export class PutObjectAnnotationCommand extends $Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: false,
        }),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "PutObjectAnnotation", {})
    .n("S3Client", "PutObjectAnnotationCommand")
    .sc(PutObjectAnnotation$)
    .build() {
}
