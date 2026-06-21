import cloudflareAdapter from "../adapters/cloudflare.mjs";
import { serve as serve$1 } from "srvx/cloudflare";
function plugin(wsOpts) {
	return (server) => {
		const ws = cloudflareAdapter({
			hooks: wsOpts,
			resolve: wsOpts.resolve,
			...wsOpts.options?.cloudflare
		});
		server.options.middleware.unshift((req, next) => {
			if (req.headers.get("upgrade")?.toLowerCase() === "websocket") return ws.handleUpgrade(req, req.runtime.cloudflare.env, req.runtime.cloudflare.context);
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
