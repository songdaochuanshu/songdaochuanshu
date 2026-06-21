import type { HttpResponse } from "@smithy/core/protocols";
import type { Logger } from "@smithy/types";
import type { PreviouslyResolved } from "./configuration";
export interface ValidateChecksumFromResponseOptions {
    config: PreviouslyResolved;
    /**
     * Defines the checksum algorithms clients SHOULD look for when validating checksums
     * returned in the HTTP response.
     */
    responseAlgorithms?: string[];
    logger?: Logger;
}
export declare const validateChecksumFromResponse: (response: HttpResponse, { config, responseAlgorithms, logger }: ValidateChecksumFromResponseOptions) => Promise<void>;
