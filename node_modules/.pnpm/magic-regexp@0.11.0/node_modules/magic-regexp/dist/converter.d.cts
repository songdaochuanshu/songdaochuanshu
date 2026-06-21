//#region src/converter.d.ts
declare function convert(regex: RegExp, {
  argsOnly
}?: {
  argsOnly?: boolean | undefined;
}): string;
//#endregion
export { convert };