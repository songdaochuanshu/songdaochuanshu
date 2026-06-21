import { AdapterHookable, adapterUtils, getPeers } from "../_chunks/adapter.mjs";
import { Message, Peer, toBufferLike } from "../_chunks/peer.mjs";
import { WSError } from "../_chunks/error.mjs";
const bunnyAdapter = (options = {}) => {
	const hooks = new AdapterHookable(options);
	const globalPeers = /* @__PURE__ */ new Map();
	return {
		...adapterUtils(globalPeers),
		handleUpgrade: async (request) => {
			if (!request.upgradeWebSocket || typeof request.upgradeWebSocket !== "function") throw new Error("[crossws] Bunny adapter requires the request to have an upgradeWebSocket method.");
			const { endResponse, context, namespace, upgradeHeaders } = await hooks.upgrade(request);
			if (endResponse) return endResponse;
			const negotiatedProtocol = (upgradeHeaders instanceof Headers ? upgradeHeaders : new Headers(upgradeHeaders)).get("sec-websocket-protocol") ?? options.protocol;
			const upgradeOptions = {};
			if (negotiatedProtocol) upgradeOptions.protocol = negotiatedProtocol;
			if (options.idleTimeout !== void 0) upgradeOptions.idleTimeout = options.idleTimeout;
			const { response, socket } = request.upgradeWebSocket(Object.keys(upgradeOptions).length > 0 ? upgradeOptions : void 0);
			const remoteAddress = request.headers.get("x-real-ip") || void 0;
			const peers = getPeers(globalPeers, namespace);
			const peer = new BunnyPeer({
				ws: socket,
				request,
				namespace,
				remoteAddress,
				peers,
				context
			});
			peers.add(peer);
			socket.addEventListener("open", () => {
				hooks.callHook("open", peer);
			});
			socket.addEventListener("message", (event) => {
				hooks.callHook("message", peer, new Message(event.data, peer, event));
			});
			socket.addEventListener("close", (event) => {
				peers.delete(peer);
				hooks.callHook("close", peer, {
					code: event.code,
					reason: event.reason
				});
			});
			socket.addEventListener("error", (error) => {
				peers.delete(peer);
				hooks.callHook("error", peer, new WSError(error));
			});
			return response;
		}
	};
};
var BunnyPeer = class extends Peer {
	get remoteAddress() {
		return this._internal.remoteAddress;
	}
	send(data) {
		return this._internal.ws.send(toBufferLike(data));
	}
	publish(topic, data) {
		const dataBuff = toBufferLike(data);
		for (const peer of this._internal.peers) if (peer !== this && peer._topics.has(topic)) peer._internal.ws.send(dataBuff);
	}
	close(code, reason) {
		this._internal.ws.close(code, reason);
	}
	terminate() {
		this._internal.ws.close();
	}
};
export { bunnyAdapter as default };
