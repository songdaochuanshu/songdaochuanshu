const kNodeInspect = /*#__PURE__*/ Symbol.for("nodejs.util.inspect.custom");
function toBufferLike(val) {
	if (val === void 0 || val === null) return "";
	const type = typeof val;
	if (type === "string") return val;
	if (type === "number" || type === "boolean" || type === "bigint") return val.toString();
	if (type === "function" || type === "symbol") return "{}";
	if (val instanceof Uint8Array || val instanceof ArrayBuffer) return val;
	if (isPlainObject(val)) return JSON.stringify(val);
	return val;
}
function toString(val) {
	if (typeof val === "string") return val;
	const data = toBufferLike(val);
	if (typeof data === "string") return data;
	return `data:application/octet-stream;base64,${btoa(String.fromCharCode(...new Uint8Array(data)))}`;
}
function isPlainObject(value) {
	if (value === null || typeof value !== "object") return false;
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) return false;
	if (Symbol.iterator in value) return false;
	if (Symbol.toStringTag in value) return Object.prototype.toString.call(value) === "[object Module]";
	return true;
}
var Message = class {
	event;
	peer;
	rawData;
	#id;
	#uint8Array;
	#arrayBuffer;
	#blob;
	#text;
	#json;
	constructor(rawData, peer, event) {
		this.rawData = rawData || "";
		this.peer = peer;
		this.event = event;
	}
	get id() {
		if (!this.#id) this.#id = crypto.randomUUID();
		return this.#id;
	}
	uint8Array() {
		const _uint8Array = this.#uint8Array;
		if (_uint8Array) return _uint8Array;
		const rawData = this.rawData;
		if (rawData instanceof Uint8Array) return this.#uint8Array = rawData;
		if (rawData instanceof ArrayBuffer || rawData instanceof SharedArrayBuffer) {
			this.#arrayBuffer = rawData;
			return this.#uint8Array = new Uint8Array(rawData);
		}
		if (typeof rawData === "string") {
			this.#text = rawData;
			return this.#uint8Array = new TextEncoder().encode(this.#text);
		}
		if (Symbol.iterator in rawData) return this.#uint8Array = new Uint8Array(rawData);
		if (typeof rawData?.length === "number") return this.#uint8Array = new Uint8Array(rawData);
		if (rawData instanceof DataView) return this.#uint8Array = new Uint8Array(rawData.buffer, rawData.byteOffset, rawData.byteLength);
		throw new TypeError(`Unsupported message type: ${Object.prototype.toString.call(rawData)}`);
	}
	arrayBuffer() {
		const _arrayBuffer = this.#arrayBuffer;
		if (_arrayBuffer) return _arrayBuffer;
		const rawData = this.rawData;
		if (rawData instanceof ArrayBuffer || rawData instanceof SharedArrayBuffer) return this.#arrayBuffer = rawData;
		return this.#arrayBuffer = this.uint8Array().buffer;
	}
	blob() {
		const _blob = this.#blob;
		if (_blob) return _blob;
		const rawData = this.rawData;
		if (rawData instanceof Blob) return this.#blob = rawData;
		return this.#blob = new Blob([this.uint8Array()]);
	}
	text() {
		const _text = this.#text;
		if (_text) return _text;
		const rawData = this.rawData;
		if (typeof rawData === "string") return this.#text = rawData;
		return this.#text = new TextDecoder().decode(this.uint8Array());
	}
	json() {
		const _json = this.#json;
		if (_json) return _json;
		return this.#json = JSON.parse(this.text());
	}
	get data() {
		switch (this.peer?.websocket?.binaryType) {
			case "arraybuffer": return this.arrayBuffer();
			case "blob": return this.blob();
			case "nodebuffer": return globalThis.Buffer ? Buffer.from(this.uint8Array()) : this.uint8Array();
			case "uint8array": return this.uint8Array();
			case "text": return this.text();
			default: return this.rawData;
		}
	}
	toString() {
		return this.text();
	}
	[Symbol.toPrimitive]() {
		return this.text();
	}
	[kNodeInspect]() {
		return { message: {
			id: this.id,
			peer: this.peer,
			text: this.text()
		} };
	}
};
var Peer = class {
	_internal;
	_topics;
	_id;
	#ws;
	constructor(internal) {
		this._topics = /* @__PURE__ */ new Set();
		this._internal = internal;
	}
	get context() {
		return this._internal.context ??= {};
	}
	get namespace() {
		return this._internal.namespace;
	}
	get id() {
		if (!this._id) this._id = crypto.randomUUID();
		return this._id;
	}
	get remoteAddress() {}
	get request() {
		return this._internal.request;
	}
	get websocket() {
		if (!this.#ws) {
			const _ws = this._internal.ws;
			const _request = this._internal.request;
			this.#ws = _request ? createWsProxy(_ws, _request) : _ws;
		}
		return this.#ws;
	}
	get peers() {
		return this._internal.peers || /* @__PURE__ */ new Set();
	}
	get topics() {
		return this._topics;
	}
	terminate() {
		this.close();
	}
	subscribe(topic) {
		this._topics.add(topic);
	}
	unsubscribe(topic) {
		this._topics.delete(topic);
	}
	toString() {
		return this.id;
	}
	[Symbol.toPrimitive]() {
		return this.id;
	}
	[Symbol.toStringTag]() {
		return "WebSocket";
	}
	[kNodeInspect]() {
		return { peer: {
			id: this.id,
			ip: this.remoteAddress
		} };
	}
};
function createWsProxy(ws, request) {
	return new Proxy(ws, { get: (target, prop) => {
		const value = Reflect.get(target, prop);
		if (!value) switch (prop) {
			case "protocol": return request?.headers?.get("sec-websocket-protocol") || "";
			case "extensions": return request?.headers?.get("sec-websocket-extensions") || "";
			case "url": return request?.url?.replace(/^http/, "ws") || void 0;
		}
		return value;
	} });
}
export { Message, Peer, toBufferLike, toString };
