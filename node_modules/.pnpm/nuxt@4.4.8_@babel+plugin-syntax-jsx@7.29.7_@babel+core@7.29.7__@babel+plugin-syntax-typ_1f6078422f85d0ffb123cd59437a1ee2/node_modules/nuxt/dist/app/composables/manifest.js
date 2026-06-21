import { useRuntimeConfig } from "../nuxt.js";
import { appManifest as isAppManifestEnabled } from "#build/nuxt.config.mjs";
import { buildAssetsURL } from "#internal/nuxt/paths";
import _routeRulesMatcher from "#build/route-rules.mjs";
const routeRulesMatcher = _routeRulesMatcher;
let manifest;
function fetchManifest() {
  if (!isAppManifestEnabled) {
    throw new Error("[nuxt] app manifest should be enabled with `experimental.appManifest`");
  }
  let _manifest;
  if (import.meta.server) {
    _manifest = import(
      /* webpackIgnore: true */
      /* @vite-ignore */
      "#app-manifest"
    );
  } else {
    _manifest = $fetch(buildAssetsURL(`builds/meta/${useRuntimeConfig().app.buildId}.json`), {
      responseType: "json"
    }).then((res) => {
      if (!res || typeof res !== "object" || !Array.isArray(res.prerendered)) {
        throw new Error("[nuxt] Received malformed app manifest. Ensure that `builds/meta/*.json` is served as JSON by your hosting/proxy and not rewritten to an HTML fallback.");
      }
      return res;
    });
  }
  manifest = _manifest;
  _manifest.catch((e) => {
    if (manifest === _manifest) {
      manifest = void 0;
    }
    console.error("[nuxt] Error fetching app manifest.", e);
  });
  return _manifest;
}
export function getAppManifest() {
  if (!isAppManifestEnabled) {
    throw new Error("[nuxt] app manifest should be enabled with `experimental.appManifest`");
  }
  return manifest || fetchManifest();
}
export function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher(path.toLowerCase());
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
