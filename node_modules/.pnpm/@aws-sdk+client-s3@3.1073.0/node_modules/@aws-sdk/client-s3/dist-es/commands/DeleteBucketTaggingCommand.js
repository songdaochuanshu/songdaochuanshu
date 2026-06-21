import { Command as $Command } from "@smithy/core/client";
import { getEndpointPlugin } from "@smithy/core/endpoints";
import { commonParams } from "../endpoint/EndpointParameters";
import { DeleteBucketTagging$ } from "../schemas/schemas_0";
export { $Command };
export class DeleteBucketTaggingCommand extends $Command
    .classBuilder()
    .ep({
    ...commonParams,
    UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true },
    Bucket: { type: "contextParams", name: "Bucket" },
})
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("AmazonS3", "DeleteBucketTagging", {})
    .n("S3Client", "DeleteBucketTaggingCommand")
    .sc(DeleteBucketTagging$)
    .build() {
}
