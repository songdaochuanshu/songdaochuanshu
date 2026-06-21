import { Readable } from "node:stream";
export function toStream(bytes) {
    return Readable.from(Buffer.from(bytes));
}
