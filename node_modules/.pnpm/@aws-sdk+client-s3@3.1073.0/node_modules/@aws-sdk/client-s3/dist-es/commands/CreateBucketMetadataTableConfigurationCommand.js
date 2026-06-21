import { getFlexibleChecksumsPlugin } from "@aws-sdk/middleware-flexible-checksums";
import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { CreateBucketMetadataTableConfiguration$ } from "../schemas/schemas_0";
export { $Command };
export class CreateBucketMetadataTableConfigurationCommand extends $Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getFlexibleChecksumsPlugin(config, {
            requestAlgorithmMember: { 'httpHeader': 'x-amz-sdk-checksum-algorithm', 'name': 'ChecksumAlgorithm' },
            requestChecksumRequired: true,
        }),
    ];
})
    .s("AmazonS3", "CreateBucketMetadataTableConfiguration", {})
    .n("S3Client", "CreateBucketMetadataTableConfigurationCommand")
    .sc(CreateBucketMetadataTableConfiguration$)
    .build() {
}
