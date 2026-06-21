import { HttpRequest } from "@smithy/core/protocols";
import { CONTEXT_SIGNING_SERVICE } from "../constants";
import { getOutpostEndpoint } from "../middleware-process-arnables/getOutpostEndpoint";
export const redirectFromPostIdMiddleware = (config) => (next, context) => async (args) => {
    const { input, request } = args;
    if (!HttpRequest.isInstance(request))
        return next(args);
    if (input.OutpostId) {
        const { isCustomEndpoint } = config;
        const useFipsEndpoint = await config.useFipsEndpoint();
        request.hostname = getOutpostEndpoint(request.hostname, { isCustomEndpoint, useFipsEndpoint });
        context[CONTEXT_SIGNING_SERVICE] = "s3-outposts";
    }
    return next(args);
};
export const redirectFromPostIdMiddlewareOptions = {
    step: "build",
    name: "redirectFromPostIdMiddleware",
    tags: ["OUTPOST"],
    override: true,
};
export const getRedirectFromPostIdPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(redirectFromPostIdMiddleware(options), redirectFromPostIdMiddlewareOptions);
    },
});
