import { AwsRestXmlProtocol } from "@aws-sdk/core/protocols";
import {
  EndpointBearer,
  HandlerExecutionContext,
  HttpRequest,
  OperationSchema,
  SerdeFunctions,
} from "@smithy/types";
export declare class S3RestXmlProtocol extends AwsRestXmlProtocol {
  serializeRequest<Input extends object>(
    operationSchema: OperationSchema,
    input: Input,
    context: HandlerExecutionContext & SerdeFunctions & EndpointBearer
  ): Promise<HttpRequest>;
}
