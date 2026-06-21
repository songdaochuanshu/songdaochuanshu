import { C as wordBoundary, S as word, _ as maybe, a as sticky, b as tab, c as anyOf, d as charIn, f as charNotIn, g as linefeed, h as letter, i as multiline, l as carriageReturn, m as exactly, n as dotAll, o as unicode, p as digit, r as global, s as withIndices, t as caseInsensitive, u as char, v as not, w as wordChar, x as whitespace, y as oneOrMore } from "./flags-BP1_fHjc.mjs";
import { spreadRegExpIterator, spreadRegExpMatchArray } from "type-level-regexp/regexp";

//#region src/further-magic.ts
const createRegExp = (...inputs) => {
	const flags = inputs.length > 1 && (Array.isArray(inputs[inputs.length - 1]) || inputs[inputs.length - 1] instanceof Set) ? inputs.pop() : void 0;
	return new RegExp(exactly(...inputs).toString(), [...flags || ""].join(""));
};

//#endregion
export { anyOf, carriageReturn, caseInsensitive, char, charIn, charNotIn, createRegExp, digit, dotAll, exactly, global, letter, linefeed, maybe, multiline, not, oneOrMore, spreadRegExpIterator, spreadRegExpMatchArray, sticky, tab, unicode, whitespace, withIndices, word, wordBoundary, wordChar };