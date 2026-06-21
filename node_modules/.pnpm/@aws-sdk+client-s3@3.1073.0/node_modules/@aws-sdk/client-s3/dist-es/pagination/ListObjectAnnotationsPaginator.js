import { createPaginator } from "@smithy/core";
import { ListObjectAnnotationsCommand, } from "../commands/ListObjectAnnotationsCommand";
import { S3Client } from "../S3Client";
export const paginateListObjectAnnotations = createPaginator(S3Client, ListObjectAnnotationsCommand, "ContinuationToken", "NextContinuationToken", "MaxAnnotationResults");
