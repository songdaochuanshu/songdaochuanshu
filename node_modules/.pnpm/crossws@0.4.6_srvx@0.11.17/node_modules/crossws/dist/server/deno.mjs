import denoAdapter from "../adapters/deno.mjs";
import { serve as serve$1 } from "srvx/deno";
function plugin(wsOpts) {
	return (server) => {
		const ws = denoAdapter({
			hooks: wsOpts,
			resolve: wsOpts.resolve,
			...wsOpts.options?.deno
		});
		server.options.middleware.unshift((req, next) => {
			if (req.headers.get("upgrade")?.toLowerCase() === "websocket") return ws.handleUpgrade(req, req.runtime.deno.info);
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
