import { A as caseInsensitive, C as whitespace, D as Join, E as wordChar, F as unicode, I as withIndices, M as global, N as multiline, O as UnionToTuple, P as sticky, S as tab, T as wordBoundary, _ as letter, a as InputSource, b as not, c as MapToValues, d as carriageReturn, f as char, g as exactly, h as digit, i as StringCapturedBy, j as dotAll, k as Flag, l as Input, m as charNotIn, n as MagicRegExpMatchArray, o as MapToCapturedGroupsArr, p as charIn, r as MapToStringCapturedBy, s as MapToGroups, t as MagicRegExp, u as anyOf, v as linefeed, w as word, x as oneOrMore, y as maybe } from "./magic-regexp-C9H8I7PR.cjs";

//#region src/index.d.ts
declare const createRegExp: {
  /** Create Magic RegExp from Input helpers and string (string will be sanitized) */<Inputs extends InputSource[]>(...inputs: Inputs): MagicRegExp<`/${Join<MapToValues<Inputs>, '', ''>}/`, MapToGroups<Inputs>, MapToCapturedGroupsArr<Inputs>, never>;
  <Inputs extends InputSource[], Flags extends Flag[] = never[]>(...inputs: [...Inputs, [...Flags]]): MagicRegExp<`/${Join<MapToValues<Inputs>, '', ''>}/${Join<Flags, '', ''>}`, MapToGroups<Inputs>, MapToCapturedGroupsArr<Inputs>, Flags[number]>;
  <Inputs extends InputSource[], FlagUnion extends Flag = never, Flags extends Flag[] = (UnionToTuple<FlagUnion> extends infer F extends Flag[] ? F : never)>(...inputs: [...Inputs, Set<FlagUnion>]): MagicRegExp<`/${Join<MapToValues<Inputs>, '', ''>}/${Join<Flags, '', ''>}`, MapToGroups<Inputs>, MapToCapturedGroupsArr<Inputs>, Flags[number]>;
};
declare global {
  interface String {
    match<R extends MagicRegExp<string, string, (string | undefined)[], Exclude<Flag, 'g'>>>(regexp: R): MagicRegExpMatchArray<R> | null;
    match<R extends MagicRegExp<string, string, (string | undefined)[], 'g'>>(regexp: R): string[] | null;
    /** @deprecated String.matchAll requires global flag to be set. */
    matchAll<R extends MagicRegExp<string, string, (string | undefined)[], never>>(regexp: R): never;
    /** @deprecated String.matchAll requires global flag to be set. */
    matchAll<R extends MagicRegExp<string, string, (string | undefined)[], Exclude<Flag, 'g'>>>(regexp: R): never;
    matchAll<R extends MagicRegExp<string, string, (string | undefined)[], string>>(regexp: R): IterableIterator<MagicRegExpMatchArray<R>>;
    /** @deprecated String.replaceAll requires global flag to be set. */
    replaceAll<R extends MagicRegExp<string, string, (string | undefined)[], never>>(searchValue: R, replaceValue: string | ((substring: string, ...args: any[]) => string)): never;
    /** @deprecated String.replaceAll requires global flag to be set. */
    replaceAll<R extends MagicRegExp<string, string, (string | undefined)[], Exclude<Flag, 'g'>>>(searchValue: R, replaceValue: string | ((substring: string, ...args: any[]) => string)): never;
  }
}
//#endregion
export { Flag, Input, MagicRegExp, MagicRegExpMatchArray, MapToStringCapturedBy, StringCapturedBy, anyOf, carriageReturn, caseInsensitive, char, charIn, charNotIn, createRegExp, digit, dotAll, exactly, global, letter, linefeed, maybe, multiline, not, oneOrMore, sticky, tab, unicode, whitespace, withIndices, word, wordBoundary, wordChar };