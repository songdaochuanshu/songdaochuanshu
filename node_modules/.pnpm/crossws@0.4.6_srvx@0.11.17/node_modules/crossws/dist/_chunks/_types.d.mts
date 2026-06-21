import { Hooks } from "./adapter.mjs";
import { BunOptions } from "./bun.mjs";
import { BunnyOptions } from "./bunny.mjs";
import { CloudflareOptions } from "./cloudflare.mjs";
import { DenoOptions } from "./deno.mjs";
import { NodeOptions } from "./node.mjs";
import { SSEOptions } from "./sse.mjs";
import { Server, ServerOptions, ServerPlugin, ServerRequest } from "srvx";
type WSOptions = Partial<Hooks> & {
  resolve?: (req: ServerRequest) => Partial<Hooks> | Promise<Partial<Hooks>>;
  options?: {
    bun?: BunOptions;
    bunny?: BunnyOptions;
    deno?: DenoOptions;
    node?: NodeOptions;
    sse?: SSEOptions;
    cloudflare?: CloudflareOptions;
  };
};
type ServerWithWSOptions = ServerOptions & {
  websocket?: WSOptions;
};
export { ServerWithWSOptions, WSOptions };