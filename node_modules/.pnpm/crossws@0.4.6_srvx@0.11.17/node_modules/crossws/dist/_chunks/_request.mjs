const StubRequest = /* @__PURE__ */ (() => {
	class StubRequest {
		url;
		_abortController;
		_headers;
		_init;
		constructor(url, init = {}) {
			this.url = url;
			this._init = init;
		}
		get headers() {
			if (!this._headers) this._headers = new Headers(this._init?.headers);
			return this._headers;
		}
		clone() {
			return new StubRequest(this.url, this._init);
		}
		get method() {
			return "GET";
		}
		get signal() {
			if (!this._abortController) this._abortController = new AbortController();
			return this._abortController.signal;
		}
		get cache() {
			return "default";
		}
		get credentials() {
			return "same-origin";
		}
		get destination() {
			return "";
		}
		get integrity() {
			return "";
		}
		get keepalive() {
			return false;
		}
		get redirect() {
			return "follow";
		}
		get mode() {
			return "cors";
		}
		get referrer() {
			return "about:client";
		}
		get referrerPolicy() {
			return "";
		}
		get body() {
			return null;
		}
		get bodyUsed() {
			return false;
		}
		arrayBuffer() {
			return Promise.resolve(/* @__PURE__ */ new ArrayBuffer(0));
		}
		blob() {
			return Promise.resolve(new Blob());
		}
		bytes() {
			return Promise.resolve(new Uint8Array());
		}
		formData() {
			return Promise.resolve(new FormData());
		}
		json() {
			return Promise.resolve(JSON.parse(""));
		}
		text() {
			return Promise.resolve("");
		}
	}
	Object.setPrototypeOf(StubRequest.prototype, globalThis.Request.prototype);
	return StubRequest;
})();
export { StubRequest };
