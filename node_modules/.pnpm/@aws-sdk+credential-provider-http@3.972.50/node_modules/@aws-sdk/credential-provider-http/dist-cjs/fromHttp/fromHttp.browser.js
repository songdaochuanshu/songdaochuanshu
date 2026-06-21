const { CredentialsProviderError } = require("@smithy/core/config");
const { FetchHttpHandler } = require("@smithy/fetch-http-handler");
const { checkUrl } = require("./checkUrl");
const { createGetRequest, getCredentials } = require("./requestHelpers");
const { retryWrapper } = require("./retry-wrapper");
exports.fromHttp = (options = {}) => {
    options.logger?.debug("@aws-sdk/credential-provider-http - fromHttp");
    let host;
    const full = options.credentialsFullUri;
    if (full) {
        host = full;
    }
    else {
        throw new CredentialsProviderError("No HTTP credential provider host provided.", { logger: options.logger });
    }
    const url = new URL(host);
    checkUrl(url, options.logger);
    const requestHandler = new FetchHttpHandler();
    return retryWrapper(async () => {
        const request = createGetRequest(url);
        if (options.authorizationToken) {
            request.headers.Authorization = options.authorizationToken;
        }
        const result = await requestHandler.handle(request);
        return getCredentials(result.response);
    }, options.maxRetries ?? 3, options.timeout ?? 1000);
};
