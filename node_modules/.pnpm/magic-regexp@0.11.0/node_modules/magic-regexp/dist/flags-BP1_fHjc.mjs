//#region src/core/wrap.ts
const NO_WRAP_RE = /^(?:\(.*\)|\\?.)$/;
function wrap(s) {
	const v = s.toString();
	return NO_WRAP_RE.test(v) ? v : `(?:${v})`;
}

//#endregion
//#region src/core/internal.ts
const GROUPED_AS_REPLACE_RE = /^(?:\(\?:(.+)\)|(.+))$/;
const GROUPED_REPLACE_RE = /^(?:\(\?:(.+)\)([?+*]|\{[\d,]+\})?|(.+))$/;
function createInput(s) {
	const groupedAsFn = (key) => createInput(`(?<${key}>${`${s}`.replace(GROUPED_AS_REPLACE_RE, "$1$2")})`);
	return {
		toString: () => s.toString(),
		and: Object.assign((...inputs) => createInput(`${s}${exactly(...inputs)}`), { referenceTo: (groupName) => createInput(`${s}\\k<${groupName}>`) }),
		or: (...inputs) => createInput(`(?:${s}|${inputs.map((v) => exactly(v)).join("|")})`),
		after: (...input) => createInput(`(?<=${exactly(...input)})${s}`),
		before: (...input) => createInput(`${s}(?=${exactly(...input)})`),
		notAfter: (...input) => createInput(`(?<!${exactly(...input)})${s}`),
		notBefore: (...input) => createInput(`${s}(?!${exactly(...input)})`),
		times: Object.assign((number) => createInput(`${wrap(s)}{${number}}`), {
			any: () => createInput(`${wrap(s)}*`),
			atLeast: (min) => createInput(`${wrap(s)}{${min},}`),
			atMost: (max) => createInput(`${wrap(s)}{0,${max}}`),
			between: (min, max) => createInput(`${wrap(s)}{${min},${max}}`)
		}),
		optionally: () => createInput(`${wrap(s)}?`),
		as: groupedAsFn,
		groupedAs: groupedAsFn,
		grouped: () => createInput(`${s}`.replace(GROUPED_REPLACE_RE, "($1$3)$2")),
		at: {
			lineStart: () => createInput(`^${s}`),
			lineEnd: () => createInput(`${s}$`)
		}
	};
}

//#endregion
//#region src/core/inputs.ts
const ESCAPE_REPLACE_RE = /[.*+?^${}()|[\]\\/]/g;
function createCharInput(raw) {
	const input = createInput(`[${raw}]`);
	const from = (charFrom, charTo) => createCharInput(`${raw}${escapeCharInput(charFrom)}-${escapeCharInput(charTo)}`);
	const orChar = Object.assign((chars) => createCharInput(`${raw}${escapeCharInput(chars)}`), { from });
	return Object.assign(input, {
		orChar,
		from
	});
}
function escapeCharInput(raw) {
	return raw.replace(/[-\\^\]]/g, "\\$&");
}
/** This matches any character in the string provided */
const charIn = Object.assign((chars) => {
	return createCharInput(escapeCharInput(chars));
}, createCharInput(""));
/** This matches any character that is not in the string provided */
const charNotIn = Object.assign((chars) => {
	return createCharInput(`^${escapeCharInput(chars)}`);
}, createCharInput("^"));
/**
* This takes a variable number of inputs and matches any of them
* @example
* anyOf('foo', maybe('bar'), 'baz') // => /(?:foo|(?:bar)?|baz)/
* @argument inputs - arbitrary number of `string` or `Input`, where `string` will be escaped
*/
function anyOf(...inputs) {
	return createInput(`(?:${inputs.map((a) => exactly(a)).join("|")})`);
}
const char = createInput(".");
const word = createInput("\\b\\w+\\b");
const wordChar = createInput("\\w");
const wordBoundary = createInput("\\b");
const digit = createInput("\\d");
const whitespace = createInput("\\s");
const letter = Object.assign(createInput("[a-zA-Z]"), {
	lowercase: createInput("[a-z]"),
	uppercase: createInput("[A-Z]")
});
const tab = createInput("\\t");
const linefeed = createInput("\\n");
const carriageReturn = createInput("\\r");
const not = {
	word: createInput("\\W+"),
	wordChar: createInput("\\W"),
	wordBoundary: createInput("\\B"),
	digit: createInput("\\D"),
	whitespace: createInput("\\S"),
	letter: Object.assign(createInput("[^a-zA-Z]"), {
		lowercase: createInput("[^a-z]"),
		uppercase: createInput("[^A-Z]")
	}),
	tab: createInput("[^\\t]"),
	linefeed: createInput("[^\\n]"),
	carriageReturn: createInput("[^\\r]")
};
/**
* Equivalent to `?` - takes a variable number of inputs and marks them as optional
* @example
* maybe('foo', exactly('ba?r')) // => /(?:fooba\?r)?/
* @argument inputs - arbitrary number of `string` or `Input`, where `string` will be escaped
*/
function maybe(...inputs) {
	return createInput(`${wrap(exactly(...inputs))}?`);
}
/**
* This takes a variable number of inputs and concatenate their patterns, and escapes string inputs to match it exactly
* @example
* exactly('fo?o', maybe('bar')) // => /fo\?o(?:bar)?/
* @argument inputs - arbitrary number of `string` or `Input`, where `string` will be escaped
*/
function exactly(...inputs) {
	return createInput(inputs.map((input) => typeof input === "string" ? input.replace(ESCAPE_REPLACE_RE, "\\$&") : input).join(""));
}
/**
* Equivalent to `+` - this takes a variable number of inputs and marks them as repeatable, any number of times but at least once
* @example
* oneOrMore('foo', maybe('bar')) // => /(?:foo(?:bar)?)+/
* @argument inputs - arbitrary number of `string` or `Input`, where `string` will be escaped
*/
function oneOrMore(...inputs) {
	return createInput(`${wrap(exactly(...inputs))}+`);
}

//#endregion
//#region src/core/flags.ts
/** Generate indices for substring matches */
const withIndices = "d";
/** Case-insensitive search */
const caseInsensitive = "i";
/** Global search */
const global = "g";
/** Multi-line search */
const multiline = "m";
/** Allows `.` to match newline characters */
const dotAll = "s";
/** Treat a pattern as a sequence of unicode code points */
const unicode = "u";
/** Perform a "sticky" search that matches starting at the current position in the target string */
const sticky = "y";

//#endregion
export { wordBoundary as C, word as S, maybe as _, sticky as a, tab as b, anyOf as c, charIn as d, charNotIn as f, linefeed as g, letter as h, multiline as i, carriageReturn as l, exactly as m, dotAll as n, unicode as o, digit as p, global as r, withIndices as s, caseInsensitive as t, char as u, not as v, wordChar as w, whitespace as x, oneOrMore as y };