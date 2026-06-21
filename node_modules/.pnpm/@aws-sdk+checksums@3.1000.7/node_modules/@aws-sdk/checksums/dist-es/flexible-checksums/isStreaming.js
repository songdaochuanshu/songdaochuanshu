import { isArrayBuffer } from "@smithy/core/serde";
export const isStreaming = (body) => body !== undefined && typeof body !== "string" && !ArrayBuffer.isView(body) && !isArrayBuffer(body);
