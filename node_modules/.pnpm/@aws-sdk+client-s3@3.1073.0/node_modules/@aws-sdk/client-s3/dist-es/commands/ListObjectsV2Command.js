import { getThrow200ExceptionsPlugin } from "@aws-sdk/middleware-sdk-s3/s3";
import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { ListObjectsV2$ } from "../schemas/schemas_0";
export { $Command };
export class ListObjectsV2Command extends $Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Prefix: { type: "contextParams", name: "Prefix" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListObjectsV2", {})
    .n("S3Client", "ListObjectsV2Command")
    .sc(ListObjectsV2$)
    .build() {
}
