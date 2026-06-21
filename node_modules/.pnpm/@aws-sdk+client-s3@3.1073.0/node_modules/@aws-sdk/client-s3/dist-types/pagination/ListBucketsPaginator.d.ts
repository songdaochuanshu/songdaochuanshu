import type { Paginator } from "@smithy/types";
import { ListBucketsCommandInput, ListBucketsCommandOutput } from "../commands/ListBucketsCommand";
import type { S3PaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListBuckets: (config: S3PaginationConfiguration, input: ListBucketsCommandInput, ...rest: any[]) => Paginator<ListBucketsCommandOutput>;
