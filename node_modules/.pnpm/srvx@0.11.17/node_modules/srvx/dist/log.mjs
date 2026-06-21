import { blue, bold, gray, green, red, yellow } from "./_chunks/_utils.mjs";
const statusColors = {
	1: blue,
	2: green,
	3: yellow
};
const log = (_options = {}) => {
	return async (req, next) => {
		const start = performance.now();
		const res = await next();
		const duration = performance.now() - start;
		const statusColor = statusColors[Math.floor(res.status / 100)] || red;
		console.log(`${gray(`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}]`)} ${bold(req.method)} ${blue(req.url)} [${statusColor(res.status + "")}] ${gray(`(${duration.toFixed(2)}ms)`)}`);
		return res;
	};
};
export { log };
