import { Paginator } from "@smithy/types";
import {
  ListObjectAnnotationsCommandInput,
  ListObjectAnnotationsCommandOutput,
} from "../commands/ListObjectAnnotationsCommand";
import { S3PaginationConfiguration } from "./Interfaces";
export declare const paginateListObjectAnnotations: (
  config: S3PaginationConfiguration,
  input: ListObjectAnnotationsCommandInput,
  ...rest: any[]
) => Paginator<ListObjectAnnotationsCommandOutput>;
