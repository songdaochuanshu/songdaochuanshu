import { hash } from "ohash";
export function filterIslandProps(props) {
  if (!props) {
    return {};
  }
  const out = {};
  for (const key in props) {
    if (!key.startsWith("data-v-")) {
      out[key] = props[key];
    }
  }
  return out;
}
export function computeIslandHash(name, filteredProps, context, source) {
  return hash([name, filteredProps, context, source]).replace(/[-_]/g, "");
}
