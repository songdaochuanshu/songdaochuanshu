import { getThrow200ExceptionsPlugin } from "@aws-sdk/middleware-sdk-s3/s3";
import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { ListDirectoryBuckets$ } from "../schemas/schemas_0";
export { $Command };
export class ListDirectoryBucketsCommand extends $Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
})
    .m(function (Command, cs, config, o) {
    return [
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
        getThrow200ExceptionsPlugin(config),
    ];
})
    .s("AmazonS3", "ListDirectoryBuckets", {})
    .n("S3Client", "ListDirectoryBucketsCommand")
    .sc(ListDirectoryBuckets$)
    .build() {
}
