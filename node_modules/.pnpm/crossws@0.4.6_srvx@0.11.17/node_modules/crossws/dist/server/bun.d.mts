import { ServerWithWSOptions, WSOptions } from "../_chunks/_types.mjs";
import { Server, ServerPlugin } from "srvx";
declare function plugin(wsOpts: WSOptions): ServerPlugin;
declare function serve(options: ServerWithWSOptions): Server;
export { plugin, serve };