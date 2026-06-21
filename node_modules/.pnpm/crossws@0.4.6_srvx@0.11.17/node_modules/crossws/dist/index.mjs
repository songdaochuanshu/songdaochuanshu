import { defineHooks, defineWebSocketAdapter } from "./_chunks/adapter.mjs";
const DEFAULT_MAX_BUFFER_SIZE = 1024 * 1024;
const DEFAULT_CONNECT_TIMEOUT = 1e4;
const TOKEN_RE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function createWebSocketProxy(target) {
	const options = typeof target === "string" || target instanceof URL || typeof target === "function" ? { target } : target;
	const WebSocketCtor = options.WebSocket ?? globalThis.WebSocket;
	if (typeof WebSocketCtor !== "function") throw new TypeError("createWebSocketProxy requires a `WebSocket` constructor. Pass one via the `WebSocket` option, or use a runtime that provides a global `WebSocket` (Node.js >= 22, Bun, Deno, Cloudflare Workers, browsers).");
	const upstreams = /* @__PURE__ */ new Map();
	return {
		upgrade(request) {
			const reqProtocol = request.headers.get("sec-websocket-protocol");
			if (options.forwardProtocol === false || !reqProtocol) return;
			const accepted = _splitProtocolHeader(reqProtocol)[0];
			if (!accepted || !TOKEN_RE.test(accepted)) return;
			return { headers: { "sec-websocket-protocol": accepted } };
		},
		open(peer) {
			let ws;
			try {
				const url = _resolveTarget(options.target, peer);
				const protocols = _resolveProtocols(peer, options.forwardProtocol);
				const wsOptions = _resolveWsOptions(options.headers, peer);
				ws = wsOptions ? new WebSocketCtor(url, protocols, wsOptions) : new WebSocketCtor(url, protocols);
				ws.binaryType = "arraybuffer";
			} catch {
				_safeClose(peer, 1011, "Upstream setup failed");
				return;
			}
			const state = {
				ws,
				buffer: [],
				bufferSize: 0,
				open: false,
				timeout: void 0
			};
			upstreams.set(peer.id, state);
			const timeoutMs = options.connectTimeout ?? DEFAULT_CONNECT_TIMEOUT;
			if (timeoutMs > 0) state.timeout = setTimeout(() => {
				if (upstreams.get(peer.id) !== state || state.open) return;
				_cleanupState(upstreams, peer.id, state);
				_safeClose(peer, 1011, "Upstream connect timeout");
			}, timeoutMs);
			ws.addEventListener("open", () => {
				_clearTimeout(state);
				state.open = true;
				for (const data of state.buffer) ws.send(data);
				state.buffer.length = 0;
				state.bufferSize = 0;
			});
			ws.addEventListener("message", (event) => {
				_safeSend(peer, event.data);
			});
			ws.addEventListener("close", (event) => {
				if (upstreams.get(peer.id) !== state) return;
				_cleanupState(upstreams, peer.id, state);
				_safeClose(peer, _remapIncomingCode(event.code), event.reason);
			});
			ws.addEventListener("error", () => {
				if (upstreams.get(peer.id) !== state) return;
				_cleanupState(upstreams, peer.id, state);
				_safeClose(peer, 1011, "Upstream error");
			});
		},
		message(peer, message) {
			const state = upstreams.get(peer.id);
			if (!state) return;
			const raw = typeof message.rawData === "string" ? message.rawData : message.uint8Array();
			if (state.open) {
				try {
					state.ws.send(raw);
				} catch {}
				return;
			}
			const size = typeof raw === "string" ? raw.length * 3 : raw.byteLength;
			const limit = options.maxBufferSize ?? DEFAULT_MAX_BUFFER_SIZE;
			if (limit > 0 && state.bufferSize + size > limit) {
				_cleanupState(upstreams, peer.id, state);
				_safeClose(peer, 1009, "Proxy buffer limit exceeded");
				return;
			}
			state.buffer.push(typeof raw === "string" ? raw : Uint8Array.from(raw));
			state.bufferSize += size;
		},
		close(peer, details) {
			const state = upstreams.get(peer.id);
			if (!state) return;
			_clearTimeout(state);
			upstreams.delete(peer.id);
			try {
				state.ws.close(_normalizeOutgoingCode(details.code), _truncateReason(details.reason));
			} catch {}
		},
		error(peer) {
			const state = upstreams.get(peer.id);
			if (!state) return;
			_clearTimeout(state);
			upstreams.delete(peer.id);
			try {
				state.ws.close(1011, "Peer error");
			} catch {}
		}
	};
}
function _cleanupState(upstreams, id, state) {
	_clearTimeout(state);
	upstreams.delete(id);
	try {
		state.ws.close();
	} catch {}
}
function _clearTimeout(state) {
	if (state.timeout !== void 0) {
		clearTimeout(state.timeout);
		state.timeout = void 0;
	}
}
function _resolveTarget(target, peer) {
	const raw = typeof target === "function" ? target(peer) : target;
	return raw instanceof URL ? raw : new URL(raw);
}
function _resolveWsOptions(headers, peer) {
	if (!headers) return;
	const resolved = typeof headers === "function" ? headers(peer) : headers;
	if (!resolved) return;
	return { headers: resolved };
}
function _resolveProtocols(peer, forwardProtocol) {
	if (forwardProtocol === false) return;
	if (typeof forwardProtocol === "function") return _normalizeProtocols(forwardProtocol(peer));
	if (typeof forwardProtocol === "string" || Array.isArray(forwardProtocol)) return _normalizeProtocols(forwardProtocol);
	const header = peer.request?.headers.get("sec-websocket-protocol");
	if (!header) return;
	const offered = _splitProtocolHeader(header);
	if (forwardProtocol && typeof forwardProtocol === "object") {
		const map = forwardProtocol;
		return _normalizeProtocols(offered.map((p) => Object.prototype.hasOwnProperty.call(map, p) ? map[p] : p));
	}
	return _normalizeProtocols(offered);
}
function _splitProtocolHeader(header) {
	return header.split(",").map((p) => p.trim()).filter(Boolean);
}
function _normalizeProtocols(value) {
	if (value == null) return;
	const list = (Array.isArray(value) ? value : [value]).filter((p) => p != null).map((p) => String(p).trim()).filter(Boolean);
	const deduped = [...new Set(list)];
	return deduped.length > 0 ? deduped : void 0;
}
function _safeClose(peer, code, reason) {
	try {
		peer.close(code, _truncateReason(reason));
	} catch {}
}
function _safeSend(peer, data) {
	try {
		peer.send(data);
	} catch {}
}
function _truncateReason(reason) {
	if (!reason) return reason;
	const bytes = new TextEncoder().encode(reason);
	if (bytes.length <= 123) return reason;
	return new TextDecoder("utf-8", { fatal: false }).decode(bytes.subarray(0, 123));
}
function _remapIncomingCode(code) {
	if (code === void 0) return void 0;
	if (code === 1005) return 1e3;
	if (code === 1006 || code === 1015) return 1011;
	return code;
}
function _normalizeOutgoingCode(code) {
	if (code === void 0) return void 0;
	if (code === 1e3) return 1e3;
	if (code >= 3e3 && code <= 4999) return code;
	return 1e3;
}
export { createWebSocketProxy, defineHooks, defineWebSocketAdapter };
