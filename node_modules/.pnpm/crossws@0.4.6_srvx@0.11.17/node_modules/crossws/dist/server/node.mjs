import { nodeAdapter } from "../_chunks/node.mjs";
import { NodeRequest, serve as serve$1 } from "srvx/node";
function plugin(wsOpts) {
	return (server) => {
		const ws = nodeAdapter({
			hooks: wsOpts,
			resolve: wsOpts.resolve,
			...wsOpts.options?.deno
		});
		const originalServe = server.serve;
		server.serve = () => {
			server.node?.server.on("upgrade", (req, socket, head) => {
				ws.handleUpgrade(req, socket, head, new NodeRequest({
					req,
					upgrade: {
						socket,
						head
					}
				}));
			});
			return originalServe.call(server);
		};
	};
}
function serve(options) {
	if (options.websocket) {
		options.plugins ||= [];
		options.plugins.push(plugin(options.websocket));
	}
	return serve$1(options);
}
export { plugin, serve };
