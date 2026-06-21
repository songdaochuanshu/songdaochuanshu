import { isScriptProtocol } from "ufo";
import { useNuxtApp } from "../nuxt.js";
export function reloadNuxtApp(options = {}) {
  if (import.meta.server) {
    return;
  }
  const path = options.path || window.location.pathname;
  const url = new URL(path, window.location.href);
  if (url.host !== window.location.host) {
    throw new Error(`Cannot navigate to a URL with a different host: '${path}'.`);
  }
  if (url.protocol && isScriptProtocol(url.protocol)) {
    throw new Error(`Cannot navigate to a URL with '${url.protocol}' protocol.`);
  }
  let handledPath = {};
  try {
    handledPath = JSON.parse(sessionStorage.getItem("nuxt:reload") || "{}");
  } catch {
  }
  if (options.force || handledPath?.path !== path || handledPath?.expires < Date.now()) {
    try {
      sessionStorage.setItem("nuxt:reload", JSON.stringify({ path, expires: Date.now() + (options.ttl ?? 1e4) }));
    } catch {
    }
    if (options.persistState) {
      try {
        sessionStorage.setItem("nuxt:reload:state", JSON.stringify({ state: useNuxtApp().payload.state }));
      } catch {
      }
    }
    if (window.location.pathname !== path) {
      window.location.href = path;
    } else {
      window.location.reload();
    }
  }
}
