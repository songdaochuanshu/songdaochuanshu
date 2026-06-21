import type { HttpHandler } from "@smithy/core/protocols";
import type { BodyLengthCalculator, BuildHandlerOptions, BuildMiddleware, Pluggable, RequestHandler } from "@smithy/types";
interface PreviouslyResolved {
    runtime: string;
    requestHandler?: RequestHandler<any, any, any> | HttpHandler<any>;
    bodyLengthChecker?: BodyLengthCalculator;
    expectContinueHeader?: boolean | number;
}
export declare function addExpectContinueMiddleware(options: PreviouslyResolved): BuildMiddleware<any, any>;
export declare const addExpectContinueMiddlewareOptions: BuildHandlerOptions;
export declare const getAddExpectContinuePlugin: (options: PreviouslyResolved) => Pluggable<any, any>;
export {};
