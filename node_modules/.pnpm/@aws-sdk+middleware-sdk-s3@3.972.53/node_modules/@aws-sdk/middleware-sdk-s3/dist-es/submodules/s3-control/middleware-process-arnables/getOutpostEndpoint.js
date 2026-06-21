const REGEX_S3CONTROL_HOSTNAME = /^(.+\.)?s3-control(-fips)?[.-]([a-z0-9-]+)\./;
export const getOutpostEndpoint = (hostname, { isCustomEndpoint, regionOverride, useFipsEndpoint }) => {
    if (isCustomEndpoint) {
        return hostname;
    }
    const match = hostname.match(REGEX_S3CONTROL_HOSTNAME);
    if (!match) {
        return hostname;
    }
    const [matched, prefix, fips, region] = hostname.match(REGEX_S3CONTROL_HOSTNAME);
    return [
        `s3-outposts${useFipsEndpoint ? "-fips" : ""}`,
        regionOverride || region,
        hostname.replace(new RegExp(`^${matched}`), ""),
    ]
        .filter((part) => part !== undefined)
        .join(".");
};
