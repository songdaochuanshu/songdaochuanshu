import { AdapterHookable, adapterUtils, getPeers } from "../_chunks/adapter.mjs";
import { Message, Peer, toBufferLike } from "../_chunks/peer.mjs";
import { WSError } from "../_chunks/error.mjs";
import { StubRequest } from "../_chunks/_request.mjs";
import { env } from "cloudflare:workers";
const cloudflareAdapter = (opts = {}) => {
	const hooks = new AdapterHookable(opts);
	const globalPeers = /* @__PURE__ */ new Map();
	const resolveDurableStub = opts.resolveDurableStub || ((_req, env$1, _context) => {
		const bindingName = opts.bindingName || "$DurableObject";
		const binding = (env$1 || env)[bindingName];
		if (binding) {
			const instanceId = binding.idFromName(opts.instanceName || "crossws");
			return binding.get(instanceId);
		}
	});
	const { publish: durablePublish, ...utils } = adapterUtils(globalPeers);
	return {
		...utils,
		handleUpgrade: async (request, cfEnv, cfCtx) => {
			const stub = await resolveDurableStub(request, cfEnv, cfCtx);
			if (stub) return stub.fetch(request);
			const { upgradeHeaders, endResponse, context, namespace } = await hooks.upgrade(request);
			if (endResponse) return endResponse;
			const peers = getPeers(globalPeers, namespace);
			const pair = new WebSocketPair();
			const client = pair[0];
			const server = pair[1];
			const peer = new CloudflareFallbackPeer({
				ws: client,
				peers,
				wsServer: server,
				request,
				cfEnv,
				cfCtx,
				context,
				namespace
			});
			peers.add(peer);
			server.accept();
			hooks.callHook("open", peer);
			server.addEventListener("message", (event) => {
				hooks.callHook("message", peer, new Message(event.data, peer, event));
			});
			server.addEventListener("error", (event) => {
				peers.delete(peer);
				hooks.callHook("error", peer, new WSError(event.error));
			});
			server.addEventListener("close", (event) => {
				peers.delete(peer);
				hooks.callHook("close", peer, event);
				server.close();
			});
			return new Response(null, {
				status: 101,
				webSocket: client,
				headers: upgradeHeaders
			});
		},
		handleDurableInit: async (_obj, _state, _env) => {},
		handleDurableUpgrade: async (obj, request) => {
			const { upgradeHeaders, endResponse, namespace } = await hooks.upgrade(request);
			if (endResponse) return endResponse;
			const peers = getPeers(globalPeers, namespace);
			const pair = new WebSocketPair();
			const client = pair[0];
			const server = pair[1];
			const peer = CloudflareDurablePeer._restore(obj, server, request, namespace);
			peers.add(peer);
			obj.ctx.acceptWebSocket(server);
			await hooks.callHook("open", peer);
			return new Response(null, {
				status: 101,
				webSocket: client,
				headers: upgradeHeaders
			});
		},
		handleDurableMessage: async (obj, ws, message) => {
			const peer = CloudflareDurablePeer._restore(obj, ws);
			await hooks.callHook("message", peer, new Message(message, peer));
		},
		handleDurableClose: async (obj, ws, code, reason, wasClean) => {
			const peer = CloudflareDurablePeer._restore(obj, ws);
			getPeers(globalPeers, peer.namespace).delete(peer);
			const details = {
				code,
				reason,
				wasClean
			};
			await hooks.callHook("close", peer, details);
		},
		handleDurablePublish: async (_obj, topic, data, opts) => {
			return durablePublish(topic, data, opts);
		},
		publish: async (topic, data, opts) => {
			const stub = await resolveDurableStub(void 0, env, void 0);
			if (!stub) throw new Error("[crossws] Durable Object binding cannot be resolved.");
			try {
				return await stub.webSocketPublish(topic, data, opts);
			} catch (error) {
				console.error(error);
				throw error;
			}
		}
	};
};
var CloudflareDurablePeer = class CloudflareDurablePeer extends Peer {
	get peers() {
		return new Set(this.#getwebsockets().map((ws) => CloudflareDurablePeer._restore(this._internal.durable, ws)));
	}
	#getwebsockets() {
		return this._internal.durable.ctx.getWebSockets();
	}
	send(data) {
		return this._internal.ws.send(toBufferLike(data));
	}
	subscribe(topic) {
		super.subscribe(topic);
		const state = getAttachedState(this._internal.ws);
		if (!state.t) state.t = /* @__PURE__ */ new Set();
		state.t.add(topic);
		setAttachedState(this._internal.ws, state);
	}
	publish(topic, data) {
		const websockets = this.#getwebsockets();
		if (websockets.length < 2) return;
		const dataBuff = toBufferLike(data);
		for (const ws of websockets) {
			if (ws === this._internal.ws) continue;
			if (getAttachedState(ws).t?.has(topic)) ws.send(dataBuff);
		}
	}
	close(code, reason) {
		this._internal.ws.close(code, reason);
	}
	static _restore(durable, ws, request, namespace) {
		let peer = ws._crosswsPeer;
		if (peer) return peer;
		const state = ws.deserializeAttachment() || {};
		peer = ws._crosswsPeer = new CloudflareDurablePeer({
			ws,
			request: request || new StubRequest(state.u || ""),
			namespace: namespace || state.n || "",
			durable
		});
		if (state.i) peer._id = state.i;
		if (request?.url) state.u = request.url;
		state.i = peer.id;
		state.n = peer.namespace;
		setAttachedState(ws, state);
		return peer;
	}
};
var CloudflareFallbackPeer = class extends Peer {
	send(data) {
		this._internal.wsServer.send(toBufferLike(data));
		return 0;
	}
	publish(_topic, _message) {
		console.warn("[crossws] [cloudflare] pub/sub support requires Durable Objects.");
	}
	close(code, reason) {
		this._internal.ws.close(code, reason);
	}
};
function getAttachedState(ws) {
	let state = ws._crosswsState;
	if (state) return state;
	state = ws.deserializeAttachment() || {};
	ws._crosswsState = state;
	return state;
}
function setAttachedState(ws, state) {
	ws._crosswsState = state;
	ws.serializeAttachment(state);
}
export { cloudflareAdapter as default };
