import { AwsRestXmlProtocol } from "@aws-sdk/core/protocols";
import { NormalizedSchema } from "@smithy/core/schema";
export class S3RestXmlProtocol extends AwsRestXmlProtocol {
    async serializeRequest(operationSchema, input, context) {
        const request = await super.serializeRequest(operationSchema, input, context);
        const ns = NormalizedSchema.of(operationSchema.input);
        const staticStructureSchema = ns.getSchema();
        let bucketMemberIndex = 0;
        const requiredMemberCount = staticStructureSchema[6] ?? 0;
        if (input && typeof input === "object") {
            for (const [memberName, memberNs] of ns.structIterator()) {
                if (++bucketMemberIndex > requiredMemberCount) {
                    break;
                }
                if (memberName === "Bucket") {
                    if (!input.Bucket && memberNs.getMergedTraits().httpLabel) {
                        throw new Error(`No value provided for input HTTP label: Bucket.`);
                    }
                    break;
                }
            }
        }
        return request;
    }
}
