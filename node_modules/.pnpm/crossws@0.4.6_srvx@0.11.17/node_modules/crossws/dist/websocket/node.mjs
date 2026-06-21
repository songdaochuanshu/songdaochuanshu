import { import_websocket } from "../_chunks/libs/ws.mjs";
const Websocket = globalThis.WebSocket || import_websocket.default;
export { Websocket as default };
