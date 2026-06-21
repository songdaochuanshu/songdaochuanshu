import { Adapter, AdapterInstance, AdapterOptions } from "./adapter.mjs";
interface SSEAdapter extends AdapterInstance {
  fetch(req: Request): Promise<Response>;
}
interface SSEOptions extends AdapterOptions {
  bidir?: boolean;
}
declare const sseAdapter: Adapter<SSEAdapter, SSEOptions>;
export { SSEAdapter, SSEOptions, sseAdapter };