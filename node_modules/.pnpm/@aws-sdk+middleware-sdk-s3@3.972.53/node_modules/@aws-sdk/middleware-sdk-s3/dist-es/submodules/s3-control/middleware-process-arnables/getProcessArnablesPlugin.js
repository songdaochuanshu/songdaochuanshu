import { parseOutpostArnablesMiddleaware, parseOutpostArnablesMiddleawareOptions } from "./parse-outpost-arnables";
import { updateArnablesRequestMiddleware, updateArnablesRequestMiddlewareOptions } from "./update-arnables-request";
export const getProcessArnablesPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(parseOutpostArnablesMiddleaware(options), parseOutpostArnablesMiddleawareOptions);
        clientStack.addRelativeTo(updateArnablesRequestMiddleware(options), updateArnablesRequestMiddlewareOptions);
    },
});
