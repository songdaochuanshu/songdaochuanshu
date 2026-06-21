import { getFlexibleChecksumsPlugin } from "@aws-sdk/middleware-flexible-checksums";
import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { GetObjectAnnotation$ } from "../schemas/schemas_0";
export { $Command };
export class GetObjectAnnotationCommand extends $Command
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
            requestChecksumRequired: false,
            requestValidationModeMember: 'ChecksumMode',
            'responseAlgorithms': ['CRC64NVME', 'CRC32', 'CRC32C', 'SHA256', 'SHA1', 'SHA512', 'MD5', 'XXHASH64', 'XXHASH3', 'XXHASH128'],
        }),
    ];
})
    .s("AmazonS3", "GetObjectAnnotation", {})
    .n("S3Client", "GetObjectAnnotationCommand")
    .sc(GetObjectAnnotation$)
    .build() {
}
