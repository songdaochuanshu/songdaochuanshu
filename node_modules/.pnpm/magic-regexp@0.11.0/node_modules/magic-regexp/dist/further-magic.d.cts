import { A as caseInsensitive, C as whitespace, D as Join, E as wordChar, F as unicode, I as withIndices, M as global, N as multiline, O as UnionToTuple, P as sticky, S as tab, T as wordBoundary, _ as letter, a as InputSource, b as not, c as MapToValues, d as carriageReturn, f as char, g as exactly, h as digit, i as StringCapturedBy, j as dotAll, k as Flag, l as Input$1, m as charNotIn, n as MagicRegExpMatchArray, p as charIn, r as MapToStringCapturedBy, s as MapToGroups, u as anyOf, v as linefeed, w as word, x as oneOrMore, y as maybe } from "./magic-regexp-C9H8I7PR.cjs";
import { MatchAllRegExp, MatchRegExp, ParseRegExp, RegExpMatchResult, ReplaceWithRegExp, spreadRegExpIterator, spreadRegExpMatchArray } from "type-level-regexp/regexp";

//#region src/further-magic.d.ts
declare const NamedGroupsS: unique symbol;
declare const ValueS: unique symbol;
declare const FlagsS: unique symbol;
type MagicRegExp<Value extends string, NamedGroups extends string | never = never, Flags extends Flag[] | never = never> = RegExp & {
  [NamedGroupsS]: NamedGroups;
  [ValueS]: Value;
  [FlagsS]: Flags;
};
declare const createRegExp: {
  /** Create Magic RegExp from Input helpers and string (string will be sanitized) */<Inputs extends InputSource[]>(...inputs: Inputs): MagicRegExp<`/${Join<MapToValues<Inputs>, '', ''>}/`, MapToGroups<Inputs>, []>;
  <Inputs extends InputSource[], FlagUnion extends Flag | undefined = undefined, CloneFlagUnion extends Flag | undefined = FlagUnion, Flags extends Flag[] = (CloneFlagUnion extends undefined ? [] : UnionToTuple<FlagUnion> extends infer F extends Flag[] ? F : never)>(...inputs: [...Inputs, [...Flags] | string | Set<FlagUnion>]): MagicRegExp<`/${Join<MapToValues<Inputs>, '', ''>}/${Join<Flags, '', ''>}`, MapToGroups<Inputs>, Flags>;
};
declare global {
  interface String {
    match<InputString extends string, RegExpPattern extends string, Flags extends Flag[]>(this: InputString, regexp: MagicRegExp<`/${RegExpPattern}/${Join<Flags, '', ''>}`, string, Flags>): MatchRegExp<InputString, ParseRegExp<RegExpPattern>, Flag[] extends Flags ? never : Flags[number]>;
    /** @deprecated String.matchAll requires global flag to be set. */
    matchAll<R extends MagicRegExp<string, string, Exclude<Flag, 'g'>[]>>(regexp: R): never;
    matchAll<InputString extends string, RegExpPattern extends string, Flags extends Flag[]>(this: InputString, regexp: MagicRegExp<`/${RegExpPattern}/${Join<Flags, '', ''>}`, string, Flags>): MatchAllRegExp<InputString, ParseRegExp<RegExpPattern>, Flag[] extends Flags ? never : Flags[number]>;
    /** @deprecated String.matchAll requires global flag to be set. */
    matchAll<R extends MagicRegExp<string, string, never>>(regexp: R): never;
    replace<InputString extends string, RegExpPattern extends string, Flags extends Flag[], ReplaceValue extends string, RegExpParsedAST extends any[] = (string extends RegExpPattern ? never : ParseRegExp<RegExpPattern>), MatchResult = MatchRegExp<InputString, RegExpParsedAST, Flags[number]>, Match extends any[] = (MatchResult extends RegExpMatchResult<{
      matched: infer MatchArray extends any[];
      namedCaptures: [string, any];
      input: infer Input extends string;
      restInput: string | undefined;
    }, {
      index: infer Index extends number;
      groups: infer Groups;
      input: string;
      keys: (...arg: any) => any;
    }> ? [...MatchArray, Index, Input, Groups] : never)>(this: InputString, regexp: MagicRegExp<`/${RegExpPattern}/${Join<Flags, '', ''>}`, string, Flags>, replaceValue: ReplaceValue | ((...match: Match) => ReplaceValue)): any[] extends RegExpParsedAST ? never : ReplaceWithRegExp<InputString, RegExpParsedAST, ReplaceValue, Flags[number]>;
    /** @deprecated String.replaceAll requires global flag to be set. */
    replaceAll<R extends MagicRegExp<string, string, never>>(searchValue: R, replaceValue: string | ((substring: string, ...args: any[]) => string)): never;
    /** @deprecated String.replaceAll requires global flag to be set. */
    replaceAll<R extends MagicRegExp<string, string, Exclude<Flag, 'g'>[]>>(searchValue: R, replaceValue: string | ((substring: string, ...args: any[]) => string)): never;
  }
}
//#endregion
export { Flag, Input$1 as Input, MagicRegExp, MagicRegExpMatchArray, MapToStringCapturedBy, StringCapturedBy, anyOf, carriageReturn, caseInsensitive, char, charIn, charNotIn, createRegExp, digit, dotAll, exactly, global, letter, linefeed, maybe, multiline, not, oneOrMore, spreadRegExpIterator, spreadRegExpMatchArray, sticky, tab, unicode, whitespace, withIndices, word, wordBoundary, wordChar };