import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { DeleteBucketLifecycle$ } from "../schemas/schemas_0";
export { $Command };
export class DeleteBucketLifecycleCommand extends $Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketLifecycle", {})
    .n("S3Client", "DeleteBucketLifecycleCommand")
    .sc(DeleteBucketLifecycle$)
    .build() {
}
