import type { Paginator } from "@smithy/types";
import { ListObjectAnnotationsCommandInput, ListObjectAnnotationsCommandOutput } from "../commands/ListObjectAnnotationsCommand";
import type { S3PaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListObjectAnnotations: (config: S3PaginationConfiguration, input: ListObjectAnnotationsCommandInput, ...rest: any[]) => Paginator<ListObjectAnnotationsCommandOutput>;
