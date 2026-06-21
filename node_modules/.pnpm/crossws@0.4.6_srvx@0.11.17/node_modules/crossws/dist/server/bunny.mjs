import bunnyAdapter from "../adapters/bunny.mjs";
import { serve as serve$1 } from "srvx/bunny";
function plugin(wsOpts) {
	return (server) => {
		const ws = bunnyAdapter({
			hooks: wsOpts,
			resolve: wsOpts.resolve,
			...wsOpts.options?.bunny
		});
		server.options.middleware.unshift((req, next) => {
			if (req.headers.get("upgrade")?.toLowerCase() === "websocket") return ws.handleUpgrade(req);
			return next();
		});
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
