import { Adapter, AdapterInstance, AdapterOptions, Peer, PeerContext } from "./adapter.mjs";
import { Server, ServerWebSocket, WebSocketHandler } from "bun";
interface BunAdapter extends AdapterInstance {
  websocket: WebSocketHandler<ContextData>;
  handleUpgrade(req: Request, server: Server<ContextData>): Promise<Response | undefined>;
}
interface BunOptions extends AdapterOptions {}
type ContextData = {
  peer?: BunPeer;
  namespace: string;
  request: Request;
  server?: Server<ContextData>;
  context: PeerContext;
};
declare const bunAdapter: Adapter<BunAdapter, BunOptions>;
declare class BunPeer extends Peer<{
  ws: ServerWebSocket<ContextData>;
  namespace: string;
  request: Request;
  peers: Set<BunPeer>;
}> {
  get remoteAddress(): string;
  get context(): PeerContext;
  send(data: unknown, options?: {
    compress?: boolean;
  }): number;
  publish(topic: string, data: unknown, options?: {
    compress?: boolean;
  }): number;
  subscribe(topic: string): void;
  unsubscribe(topic: string): void;
  close(code?: number, reason?: string): void;
  terminate(): void;
}
export { BunAdapter, BunOptions, bunAdapter };