import { getFlexibleChecksumsPlugin } from "@aws-sdk/middleware-flexible-checksums";
import { getS3ExpiresMiddlewarePlugin, getSsecPlugin } from "@aws-sdk/middleware-sdk-s3/s3";
import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { GetObject$ } from "../schemas/schemas_0";
export { $Command };
export class GetObjectCommand extends $Command
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
        getSsecPlugin(config),
        getS3ExpiresMiddlewarePlugin(config),
    ];
})
    .s("AmazonS3", "GetObject", {})
    .n("S3Client", "GetObjectCommand")
    .sc(GetObject$)
    .build() {
}
