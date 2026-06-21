import { HttpRequest } from "@smithy/core/protocols";
import { CONTEXT_ACCOUNT_ID, CONTEXT_ARN_REGION, CONTEXT_OUTPOST_ID } from "../constants";
import { getOutpostEndpoint } from "./getOutpostEndpoint";
const ACCOUNT_ID_HEADER = "x-amz-account-id";
const OUTPOST_ID_HEADER = "x-amz-outpost-id";
export const updateArnablesRequestMiddleware = (config) => (next, context) => async (args) => {
    const { request } = args;
    if (!HttpRequest.isInstance(request)) {
        return next(args);
    }
    if (context[CONTEXT_ACCOUNT_ID]) {
        request.headers[ACCOUNT_ID_HEADER] = context[CONTEXT_ACCOUNT_ID];
    }
    if (context[CONTEXT_OUTPOST_ID]) {
        const { isCustomEndpoint } = config;
        const useFipsEndpoint = await config.useFipsEndpoint();
        request.headers[OUTPOST_ID_HEADER] = context[CONTEXT_OUTPOST_ID];
        request.hostname = getOutpostEndpoint(request.hostname, {
            isCustomEndpoint,
            regionOverride: context[CONTEXT_ARN_REGION],
            useFipsEndpoint,
        });
    }
    return next(args);
};
export const updateArnablesRequestMiddlewareOptions = {
    toMiddleware: "serializerMiddleware",
    relation: "after",
    name: "updateArnablesRequestMiddleware",
    tags: ["ACCOUNT_ID", "OUTPOST_ID", "OUTPOST"],
};
