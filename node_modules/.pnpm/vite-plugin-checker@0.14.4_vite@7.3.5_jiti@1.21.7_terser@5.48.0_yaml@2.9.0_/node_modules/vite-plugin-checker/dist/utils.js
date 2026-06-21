import { isMainThread as isMainThread$1, threadId } from "node:worker_threads";
//#region src/utils.ts
const isInVitestEntryThread = threadId === 0 && process.env.VITEST;
const isMainThread = isMainThread$1 || isInVitestEntryThread;
//#endregion
export { isInVitestEntryThread, isMainThread };

//# sourceMappingURL=utils.js.map