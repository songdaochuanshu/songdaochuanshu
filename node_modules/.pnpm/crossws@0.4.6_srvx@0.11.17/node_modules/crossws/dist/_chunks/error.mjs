var WSError = class extends Error {
	constructor(...args) {
		super(...args);
		this.name = "WSError";
	}
};
export { WSError };
