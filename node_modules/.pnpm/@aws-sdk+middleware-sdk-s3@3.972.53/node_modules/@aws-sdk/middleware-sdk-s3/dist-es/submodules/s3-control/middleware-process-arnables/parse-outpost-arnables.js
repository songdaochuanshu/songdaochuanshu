import { partition } from "@aws-sdk/core/client";
import { parse as parseArn, validate as validateArn } from "@aws-sdk/core/util";
import { getArnResources as getS3AccesspointArnResources, validateAccountId, validateOutpostService, validatePartition, } from "@aws-sdk/middleware-sdk-s3/s3";
import { CONTEXT_ARN_REGION, CONTEXT_OUTPOST_ID, CONTEXT_SIGNING_REGION, CONTEXT_SIGNING_SERVICE } from "../constants";
export const parseOutpostArnablesMiddleaware = (options) => (next, context) => async (args) => {
    const { input } = args;
    const parameter = input.Name && validateArn(input.Name) ? "Name" : input.Bucket && validateArn(input.Bucket) ? "Bucket" : undefined;
    if (!parameter)
        return next(args);
    const clientRegion = await options.region();
    const useArnRegion = await options.useArnRegion();
    const useFipsEndpoint = await options.useFipsEndpoint();
    const useDualstackEndpoint = await options.useDualstackEndpoint();
    const baseRegion = clientRegion;
    let clientPartition;
    let signingRegion;
    if (options.regionInfoProvider) {
        ({ partition: clientPartition, signingRegion = baseRegion } = (await options.regionInfoProvider(baseRegion, {
            useFipsEndpoint,
            useDualstackEndpoint,
        })));
    }
    else {
        signingRegion = context.endpointV2?.properties?.authSchemes?.[0]?.signingRegion || baseRegion;
        clientPartition = partition(signingRegion).name;
    }
    const validatorOptions = {
        useFipsEndpoint,
        useDualstackEndpoint,
        clientRegion,
        clientPartition,
        signingRegion,
        useArnRegion,
    };
    let arn;
    if (parameter === "Name") {
        arn = parseArn(input.Name);
        validateOutpostsArn(arn, validatorOptions);
        const { outpostId, accesspointName } = parseOutpostsAccessPointArnResource(arn.resource);
        input.Name = accesspointName;
        context[CONTEXT_OUTPOST_ID] = outpostId;
    }
    else {
        arn = parseArn(input.Bucket);
        validateOutpostsArn(arn, validatorOptions);
        const { outpostId, bucketName } = parseOutpostBucketArnResource(arn.resource);
        input.Bucket = bucketName;
        context[CONTEXT_OUTPOST_ID] = outpostId;
    }
    context[CONTEXT_SIGNING_SERVICE] = arn.service;
    context[CONTEXT_SIGNING_REGION] = useArnRegion ? arn.region : signingRegion;
    if (!input.AccountId) {
        input.AccountId = arn.accountId;
    }
    if (useArnRegion)
        context[CONTEXT_ARN_REGION] = arn.region;
    return next(args);
};
export const parseOutpostArnablesMiddleawareOptions = {
    toMiddleware: "serializerMiddleware",
    relation: "before",
    tags: ["CONVERT_ARN", "OUTPOST_BUCKET_ARN", "OUTPOST_ACCESS_POINT_ARN", "OUTPOST"],
    name: "parseOutpostArnablesMiddleaware",
};
const validateOutpostsArn = (arn, { clientPartition }) => {
    const { service, partition, accountId, region } = arn;
    validateOutpostService(service);
    validatePartition(partition, { clientPartition });
    validateAccountId(accountId);
};
const parseOutpostsAccessPointArnResource = (resource) => {
    const { outpostId, accesspointName } = getS3AccesspointArnResources(resource);
    if (!outpostId) {
        throw new Error("ARN resource should begin with 'outpost'");
    }
    return {
        outpostId,
        accesspointName,
    };
};
const parseOutpostBucketArnResource = (resource) => {
    const delimiter = resource.includes(":") ? ":" : "/";
    const [resourceType, ...rest] = resource.split(delimiter);
    if (resourceType === "outpost") {
        if (!rest[0] || rest[1] !== "bucket" || !rest[2] || rest.length !== 3) {
            throw new Error(`Outpost Bucket ARN should have resource outpost${delimiter}{outpostId}${delimiter}bucket${delimiter}{bucketName}`);
        }
        const [outpostId, _, bucketName] = rest;
        return { outpostId, bucketName };
    }
    else {
        throw new Error(`ARN resource should begin with 'outpost${delimiter}'`);
    }
};
