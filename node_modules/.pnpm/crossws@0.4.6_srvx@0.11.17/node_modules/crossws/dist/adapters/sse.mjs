import { AdapterHookable, adapterUtils, getPeers } from "../_chunks/adapter.mjs";
import { Message, Peer, toString } from "../_chunks/peer.mjs";
const sseAdapter = (opts = {}) => {
	const hooks = new AdapterHookable(opts);
	const globalPeers = /* @__PURE__ */ new Map();
	const peersMap = opts.bidir ? /* @__PURE__ */ new Map() : void 0;
	return {
		...adapterUtils(globalPeers),
		fetch: async (request) => {
			const { upgradeHeaders, endResponse, context, namespace } = await hooks.upgrade(request);
			if (endResponse) return endResponse;
			let peer;
			if (opts.bidir && request.body && request.headers.has("x-crossws-id")) {
				const id = request.headers.get("x-crossws-id");
				peer = peersMap?.get(id);
				if (!peer) return new Response("invalid peer id", { status: 400 });
				const stream = request.body.pipeThrough(new TextDecoderStream());
				try {
					for await (const chunk of stream) hooks.callHook("message", peer, new Message(chunk, peer));
				} catch {
					await stream.cancel().catch(() => {});
				}
				return new Response(null, {});
			} else {
				const ws = new SSEWebSocketStub();
				const peers = getPeers(globalPeers, namespace);
				peer = new SSEPeer({
					peers,
					peersMap,
					request,
					hooks,
					ws,
					context,
					namespace
				});
				peers.add(peer);
				if (opts.bidir) {
					peersMap.set(peer.id, peer);
					peer._sendEvent("crossws-id", peer.id);
				}
			}
			let headers = {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive"
			};
			if (opts.bidir) headers["x-crossws-id"] = peer.id;
			if (upgradeHeaders) {
				headers = new Headers(headers);
				for (const [key, value] of new Headers(upgradeHeaders)) headers.set(key, value);
			}
			return new Response(peer._sseStream, { headers });
		}
	};
};
var SSEPeer = class extends Peer {
	_sseStream;
	_sseStreamController;
	constructor(_internal) {
		super(_internal);
		_internal.ws.readyState = 0;
		this._sseStream = new ReadableStream({
			start: (controller) => {
				_internal.ws.readyState = 1;
				this._sseStreamController = controller;
				_internal.hooks.callHook("open", this);
			},
			cancel: () => {
				_internal.ws.readyState = 2;
				_internal.peers.delete(this);
				_internal.peersMap?.delete(this.id);
				Promise.resolve(this._internal.hooks.callHook("close", this)).finally(() => {
					_internal.ws.readyState = 3;
				});
			}
		}).pipeThrough(new TextEncoderStream());
	}
	_sendEvent(event, data) {
		const lines = data.split("\n");
		this._sseStreamController?.enqueue(`event: ${event}\n${lines.map((l) => `data: ${l}`)}\n\n`);
	}
	send(data) {
		this._sendEvent("message", toString(data));
		return 0;
	}
	publish(topic, data) {
		const dataBuff = toString(data);
		for (const peer of this._internal.peers) if (peer !== this && peer._topics.has(topic)) peer._sendEvent("message", dataBuff);
	}
	close() {
		this._sseStreamController?.close();
	}
};
var SSEWebSocketStub = class {
	readyState;
};
export { sseAdapter as default };
