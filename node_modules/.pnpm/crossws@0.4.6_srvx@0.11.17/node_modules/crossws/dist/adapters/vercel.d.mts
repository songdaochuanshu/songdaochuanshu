import { Adapter } from "../_chunks/adapter.mjs";
import { NodeAdapter, NodeOptions } from "../_chunks/node.mjs";
import { IncomingMessage, ServerResponse } from "node:http";
interface VercelAdapter extends Omit<NodeAdapter, "handleUpgrade"> {
  /**
   * Handle a WebSocket upgrade from a Web `Request` (fetch-style handlers).
   *
   * Returns a `204` {@link Response} when the upgrade was handled, or
   * `undefined` when the request is not a WebSocket upgrade or Vercel's upgrade
   * context is unavailable.
   */
  handleWebUpgrade(request: Request): Promise<Response | undefined>;
  /**
   * Handle a WebSocket upgrade from a Node.js `IncomingMessage` (Node-style
   * handlers).
   *
   * Returns `true` when the upgrade was handled (and ends `res` with `204`), or
   * `false` when the request is not a WebSocket upgrade or Vercel's upgrade
   * context is unavailable.
   */
  handleNodeUpgrade(req: IncomingMessage, res: ServerResponse): Promise<boolean>;
}
interface VercelOptions extends NodeOptions {}
declare const vercelAdapter: Adapter<VercelAdapter, VercelOptions>;
export { VercelAdapter, VercelOptions, vercelAdapter as default };