Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_chunk = require('./chunk-C0xms8kb.cjs');
const require_flags = require('./flags-BFWuevZo.cjs');
let type_level_regexp_regexp = require("type-level-regexp/regexp");

//#region src/further-magic.ts
const createRegExp = (...inputs) => {
	const flags = inputs.length > 1 && (Array.isArray(inputs[inputs.length - 1]) || inputs[inputs.length - 1] instanceof Set) ? inputs.pop() : void 0;
	return new RegExp(require_flags.exactly(...inputs).toString(), [...flags || ""].join(""));
};

//#endregion
exports.anyOf = require_flags.anyOf;
exports.carriageReturn = require_flags.carriageReturn;
exports.caseInsensitive = require_flags.caseInsensitive;
exports.char = require_flags.char;
exports.charIn = require_flags.charIn;
exports.charNotIn = require_flags.charNotIn;
exports.createRegExp = createRegExp;
exports.digit = require_flags.digit;
exports.dotAll = require_flags.dotAll;
exports.exactly = require_flags.exactly;
exports.global = require_flags.global;
exports.letter = require_flags.letter;
exports.linefeed = require_flags.linefeed;
exports.maybe = require_flags.maybe;
exports.multiline = require_flags.multiline;
exports.not = require_flags.not;
exports.oneOrMore = require_flags.oneOrMore;
Object.defineProperty(exports, 'spreadRegExpIterator', {
  enumerable: true,
  get: function () {
    return type_level_regexp_regexp.spreadRegExpIterator;
  }
});
Object.defineProperty(exports, 'spreadRegExpMatchArray', {
  enumerable: true,
  get: function () {
    return type_level_regexp_regexp.spreadRegExpMatchArray;
  }
});
exports.sticky = require_flags.sticky;
exports.tab = require_flags.tab;
exports.unicode = require_flags.unicode;
exports.whitespace = require_flags.whitespace;
exports.withIndices = require_flags.withIndices;
exports.word = require_flags.word;
exports.wordBoundary = require_flags.wordBoundary;
exports.wordChar = require_flags.wordChar;