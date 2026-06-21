import { AdapterHookable, adapterUtils, getPeers } from "../_chunks/adapter.mjs";
import { Message, Peer, toBufferLike } from "../_chunks/peer.mjs";
const bunAdapter = (options = {}) => {
	if (typeof Bun === "undefined") throw new Error("[crossws] Using Bun adapter in an incompatible environment.");
	const hooks = new AdapterHookable(options);
	const globalPeers = /* @__PURE__ */ new Map();
	return {
		...adapterUtils(globalPeers),
		async handleUpgrade(request, server) {
			const { upgradeHeaders, endResponse, context, namespace } = await hooks.upgrade(request);
			if (endResponse) return endResponse;
			if (!server.upgrade(request, {
				data: {
					server,
					request,
					context,
					namespace
				},
				headers: upgradeHeaders
			})) return new Response("Upgrade failed", { status: 500 });
		},
		websocket: {
			message: (ws, message) => {
				const peer = getPeer(ws, getPeers(globalPeers, ws.data.namespace));
				hooks.callHook("message", peer, new Message(message, peer));
			},
			open: (ws) => {
				const peers = getPeers(globalPeers, ws.data.namespace);
				const peer = getPeer(ws, peers);
				peers.add(peer);
				hooks.callHook("open", peer);
			},
			close: (ws, code, reason) => {
				const peers = getPeers(globalPeers, ws.data.namespace);
				const peer = getPeer(ws, peers);
				peers.delete(peer);
				hooks.callHook("close", peer, {
					code,
					reason
				});
			}
		}
	};
};
function getPeer(ws, peers) {
	if (ws.data.peer) return ws.data.peer;
	const peer = new BunPeer({
		ws,
		request: ws.data.request,
		peers,
		namespace: ws.data.namespace
	});
	ws.data.peer = peer;
	return peer;
}
var BunPeer = class extends Peer {
	get remoteAddress() {
		return this._internal.ws.remoteAddress;
	}
	get context() {
		return this._internal.ws.data.context;
	}
	send(data, options) {
		return this._internal.ws.send(toBufferLike(data), options?.compress);
	}
	publish(topic, data, options) {
		return this._internal.ws.publish(topic, toBufferLike(data), options?.compress);
	}
	subscribe(topic) {
		this._topics.add(topic);
		this._internal.ws.subscribe(topic);
	}
	unsubscribe(topic) {
		this._topics.delete(topic);
		this._internal.ws.unsubscribe(topic);
	}
	close(code, reason) {
		this._internal.ws.close(code, reason);
	}
	terminate() {
		this._internal.ws.terminate();
	}
};
export { bunAdapter as default };
