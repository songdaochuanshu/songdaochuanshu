import { getThrow200ExceptionsPlugin } from "@aws-sdk/middleware-sdk-s3/s3";
import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { ListMultipartUploads$ } from "../schemas/schemas_0";
export { $Command };
export class ListMultipartUploadsCommand extends $Command
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
    .s("AmazonS3", "ListMultipartUploads", {})
    .n("S3Client", "ListMultipartUploadsCommand")
    .sc(ListMultipartUploads$)
    .build() {
}
