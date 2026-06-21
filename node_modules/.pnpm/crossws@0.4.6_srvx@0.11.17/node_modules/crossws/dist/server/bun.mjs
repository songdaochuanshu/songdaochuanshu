import bunAdapter from "../adapters/bun.mjs";
import { serve as serve$1 } from "srvx/bun";
function plugin(wsOpts) {
	return (server) => {
		const ws = bunAdapter({
			hooks: wsOpts,
			resolve: wsOpts.resolve,
			...wsOpts.options?.bun
		});
		server.options.middleware.unshift((req, next) => {
			if (req.headers.get("upgrade")?.toLowerCase() === "websocket") return ws.handleUpgrade(req, req.runtime.bun.server);
			return next();
		});
		server.options.bun ??= {};
		if (server.options.bun.websocket) throw new Error("websocket handlers for bun already set!");
		server.options.bun.websocket = ws.websocket;
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
