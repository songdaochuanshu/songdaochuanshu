import { nodeAdapter } from "../_chunks/node.mjs";
import { NodeRequest } from "srvx/node";
const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
const vercelAdapter = (options = {}) => {
	const wss = nodeAdapter(options);
	async function handleWebUpgrade(request) {
		if (!_isWsUpgrade(request.method, request.headers.get("upgrade") || void 0)) return;
		const upgrade = _getVercelUpgrade();
		if (!upgrade) return;
		await wss.handleUpgrade(upgrade.req, upgrade.socket, upgrade.head, request);
		return new Response(null, { status: 204 });
	}
	async function handleNodeUpgrade(req, res) {
		if (!_isWsUpgrade(req.method, req.headers.upgrade)) return false;
		const upgrade = _getVercelUpgrade();
		if (!upgrade) return false;
		await wss.handleUpgrade(upgrade.req, upgrade.socket, upgrade.head, new NodeRequest({
			req,
			res
		}));
		if (!res.headersSent && !res.writableEnded) {
			res.statusCode = 204;
			res.end();
		}
		return true;
	}
	const { handleUpgrade: _, ...rest } = wss;
	return {
		...rest,
		handleWebUpgrade,
		handleNodeUpgrade
	};
};
function _isWsUpgrade(method, upgradeHeader) {
	return method === "GET" && upgradeHeader?.toLowerCase?.() === "websocket";
}
function _getVercelUpgrade() {
	const upgrade = _getVercelRequestContext()?.upgradeWebSocket?.();
	return upgrade?.req && upgrade?.socket && upgrade?.head ? upgrade : void 0;
}
function _getVercelRequestContext() {
	const store = globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL];
	if (typeof store?.get !== "function") return;
	const context = store.get();
	if (!context || typeof context !== "object") return;
	return context;
}
export { vercelAdapter as default };
