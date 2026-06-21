import type { Paginator } from "@smithy/types";
import { ListObjectsV2CommandInput, ListObjectsV2CommandOutput } from "../commands/ListObjectsV2Command";
import type { S3PaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListObjectsV2: (config: S3PaginationConfiguration, input: ListObjectsV2CommandInput, ...rest: any[]) => Paginator<ListObjectsV2CommandOutput>;
