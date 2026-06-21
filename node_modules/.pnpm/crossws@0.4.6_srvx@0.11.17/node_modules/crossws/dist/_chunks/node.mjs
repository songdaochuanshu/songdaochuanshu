import { AdapterHookable, adapterUtils, getPeers } from "./adapter.mjs";
import { import_websocket_server } from "./libs/ws.mjs";
import { Message, Peer, toBufferLike } from "./peer.mjs";
import { WSError } from "./error.mjs";
import { StubRequest } from "./_request.mjs";
function fromNodeUpgradeHandler(handler) {
	return { async upgrade(request) {
		const node = request.runtime?.node;
		if (!node?.upgrade) throw new Error("[crossws] `fromNodeUpgradeHandler` must be mounted via `crossws/server/node`.");
		await handler(node.req, node.upgrade.socket, node.upgrade.head);
		return { handled: true };
	} };
}
const nodeAdapter = (options = {}) => {
	if ("Deno" in globalThis || "Bun" in globalThis) throw new Error("[crossws] Using Node.js adapter in an incompatible environment.");
	const hooks = new AdapterHookable(options);
	const globalPeers = /* @__PURE__ */ new Map();
	const wss = options.wss || new import_websocket_server.default({
		noServer: true,
		handleProtocols: () => false,
		...options.serverOptions
	});
	wss.on("connection", (ws, nodeReq) => {
		const request = new NodeReqProxy(nodeReq);
		const peers = getPeers(globalPeers, nodeReq._namespace);
		const peer = new NodePeer({
			ws,
			request,
			peers,
			nodeReq,
			namespace: nodeReq._namespace
		});
		peers.add(peer);
		hooks.callHook("open", peer);
		ws.on("message", (data, isBinary) => {
			if (Array.isArray(data)) data = Buffer.concat(data);
			if (!isBinary && Buffer.isBuffer(data)) data = data.toString("utf8");
			hooks.callHook("message", peer, new Message(data, peer));
		});
		ws.on("error", (error) => {
			peers.delete(peer);
			hooks.callHook("error", peer, new WSError(error));
		});
		ws.on("close", (code, reason) => {
			peers.delete(peer);
			hooks.callHook("close", peer, {
				code,
				reason: reason?.toString()
			});
		});
	});
	wss.on("headers", (outgoingHeaders, req) => {
		const upgradeHeaders = req._upgradeHeaders;
		if (upgradeHeaders) for (const [key, value] of new Headers(upgradeHeaders)) outgoingHeaders.push(`${key}: ${value}`);
	});
	return {
		...adapterUtils(globalPeers),
		handleUpgrade: async (nodeReq, socket, head, webRequest) => {
			const request = webRequest || new NodeReqProxy(nodeReq);
			const { upgradeHeaders, endResponse, handled, context, namespace } = await hooks.upgrade(request);
			if (endResponse) return sendResponse(socket, endResponse);
			if (handled) return;
			nodeReq._request = request;
			nodeReq._upgradeHeaders = upgradeHeaders;
			nodeReq._context = context;
			nodeReq._namespace = namespace;
			wss.handleUpgrade(nodeReq, socket, head, (ws) => {
				wss.emit("connection", ws, nodeReq);
			});
		},
		closeAll: (code, data, force) => {
			for (const client of wss.clients) if (force) client.terminate();
			else client.close(code, data);
		}
	};
};
var NodePeer = class extends Peer {
	get remoteAddress() {
		return this._internal.nodeReq.socket?.remoteAddress;
	}
	get context() {
		return this._internal.nodeReq._context;
	}
	send(data, options) {
		const dataBuff = toBufferLike(data);
		const isBinary = typeof dataBuff !== "string";
		this._internal.ws.send(dataBuff, {
			compress: options?.compress,
			binary: isBinary,
			...options
		});
		return 0;
	}
	publish(topic, data, options) {
		const dataBuff = toBufferLike(data);
		const isBinary = typeof data !== "string";
		const sendOptions = {
			compress: options?.compress,
			binary: isBinary,
			...options
		};
		for (const peer of this._internal.peers) if (peer !== this && peer._topics.has(topic)) peer._internal.ws.send(dataBuff, sendOptions);
	}
	close(code, data) {
		this._internal.ws.close(code, data);
	}
	terminate() {
		this._internal.ws.terminate();
	}
};
var NodeReqProxy = class extends StubRequest {
	constructor(req) {
		const host = req.headers["host"] || "localhost";
		const url = `${req.socket?.encrypted ?? req.headers["x-forwarded-proto"] === "https" ? "https" : "http"}://${host}${req.url}`;
		super(url, { headers: req.headers });
	}
};
async function sendResponse(socket, res) {
	const head = [`HTTP/1.1 ${res.status || 200} ${res.statusText || ""}`, ...[...res.headers.entries()].map(([key, value]) => `${key}: ${value}`)];
	socket.write(head.join("\r\n") + "\r\n\r\n");
	if (res.body) for await (const chunk of res.body) socket.write(chunk);
	return new Promise((resolve) => {
		socket.end(() => {
			socket.destroy();
			resolve();
		});
	});
}
export { fromNodeUpgradeHandler, nodeAdapter };
