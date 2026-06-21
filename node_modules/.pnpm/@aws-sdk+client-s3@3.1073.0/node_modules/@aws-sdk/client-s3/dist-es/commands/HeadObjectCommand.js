import { getS3ExpiresMiddlewarePlugin, getSsecPlugin, getThrow200ExceptionsPlugin, } from "@aws-sdk/middleware-sdk-s3/s3";
import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { HeadObject$ } from "../schemas/schemas_0";
export { $Command };
export class HeadObjectCommand extends $Command
    .classBuilder()
    .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
        getSsecPlugin(config),
        getS3ExpiresMiddlewarePlugin(config),
    ];
})
    .s("AmazonS3", "HeadObject", {})
    .n("S3Client", "HeadObjectCommand")
    .sc(HeadObject$)
    .build() {
}
