import { checkExceptions, createWaiter, WaiterState, } from "@smithy/core/client";
import { HeadObjectCommand, } from "../commands/HeadObjectCommand";
const checkState = async (client, input) => {
    let reason;
    try {
        let result = await client.send(new HeadObjectCommand(input));
        reason = result;
        return { state: WaiterState.SUCCESS, reason };
    }
    catch (exception) {
        reason = exception;
        if (exception.name === "NotFound") {
            return { state: WaiterState.RETRY, reason };
        }
    }
    return { state: WaiterState.RETRY, reason };
};
export const waitForObjectExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
export const waitUntilObjectExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
    return checkExceptions(result);
};
