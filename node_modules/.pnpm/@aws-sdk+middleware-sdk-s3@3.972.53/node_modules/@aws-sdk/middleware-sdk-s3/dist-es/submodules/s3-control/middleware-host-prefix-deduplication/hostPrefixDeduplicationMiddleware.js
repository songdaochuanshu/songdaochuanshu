export const hostPrefixDeduplicationMiddleware = () => {
    return (next, context) => (args) => {
        return next(args);
    };
};
export const hostPrefixDeduplicationMiddlewareOptions = {
    tags: ["HOST_PREFIX_DEDUPLICATION", "ENDPOINT_V2", "ENDPOINT"],
    toMiddleware: "serializerMiddleware",
    relation: "after",
    name: "hostPrefixDeduplicationMiddleware",
    override: true,
};
export const getHostPrefixDeduplicationPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(hostPrefixDeduplicationMiddleware(), hostPrefixDeduplicationMiddlewareOptions);
    },
});
