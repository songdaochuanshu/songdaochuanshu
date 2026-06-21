import type { Paginator } from "@smithy/types";
import { ListDirectoryBucketsCommandInput, ListDirectoryBucketsCommandOutput } from "../commands/ListDirectoryBucketsCommand";
import type { S3PaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListDirectoryBuckets: (config: S3PaginationConfiguration, input: ListDirectoryBucketsCommandInput, ...rest: any[]) => Paginator<ListDirectoryBucketsCommandOutput>;
