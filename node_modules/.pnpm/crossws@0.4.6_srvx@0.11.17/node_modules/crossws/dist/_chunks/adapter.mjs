var AdapterHookable = class {
	options;
	constructor(options) {
		this.options = options || {};
	}
	callHook(name, arg1, arg2) {
		const globalHook = this.options.hooks?.[name];
		const globalPromise = globalHook?.(arg1, arg2);
		const request = arg1.request || arg1;
		const resolveHooksPromise = this.options.resolve?.(request);
		if (!resolveHooksPromise) return globalPromise;
		const resolvePromise = resolveHooksPromise instanceof Promise ? resolveHooksPromise.then((hooks) => hooks?.[name]) : resolveHooksPromise?.[name];
		return Promise.all([globalPromise, resolvePromise]).then(([globalRes, hook]) => {
			const hookResPromise = hook?.(arg1, arg2);
			return hookResPromise instanceof Promise ? hookResPromise.then((hookRes) => hookRes || globalRes) : hookResPromise || globalRes;
		});
	}
	async upgrade(request) {
		let namespace = this.options.getNamespace?.(request) ?? new URL(request.url).pathname;
		const context = request.context || {};
		try {
			const res = await this.callHook("upgrade", request);
			if (!res) return {
				context,
				namespace
			};
			if (res.namespace) namespace = res.namespace;
			if (res.context) Object.assign(context, res.context);
			if (res instanceof Response) return {
				context,
				namespace,
				endResponse: res
			};
			if (res.handled) return {
				context,
				namespace,
				handled: true
			};
			if (res.headers) return {
				context,
				namespace,
				upgradeHeaders: res.headers
			};
		} catch (error) {
			const errResponse = error.response || error;
			if (errResponse instanceof Response) return {
				context,
				namespace,
				endResponse: errResponse
			};
			throw error;
		}
		return {
			context,
			namespace
		};
	}
};
function defineHooks(hooks) {
	return hooks;
}
function adapterUtils(globalPeers) {
	return {
		peers: globalPeers,
		publish(topic, message, options) {
			for (const peers of options?.namespace ? [globalPeers.get(options.namespace) || []] : globalPeers.values()) {
				let firstPeerWithTopic;
				for (const peer of peers) if (peer.topics.has(topic)) {
					firstPeerWithTopic = peer;
					break;
				}
				if (firstPeerWithTopic) {
					firstPeerWithTopic.send(message, options);
					firstPeerWithTopic.publish(topic, message, options);
				}
			}
		}
	};
}
function getPeers(globalPeers, namespace) {
	if (!namespace) throw new Error("Websocket publish namespace missing.");
	let peers = globalPeers.get(namespace);
	if (!peers) {
		peers = /* @__PURE__ */ new Set();
		globalPeers.set(namespace, peers);
	}
	return peers;
}
function defineWebSocketAdapter(factory) {
	return factory;
}
export { AdapterHookable, adapterUtils, defineHooks, defineWebSocketAdapter, getPeers };
