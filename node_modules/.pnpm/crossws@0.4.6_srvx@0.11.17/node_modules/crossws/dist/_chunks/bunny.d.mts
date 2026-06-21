import { Adapter, AdapterInstance, AdapterOptions } from "./adapter.mjs";
interface BunnyAdapter extends AdapterInstance {
  handleUpgrade(req: Request): Promise<Response>;
}
interface BunnyOptions extends AdapterOptions {
  /**
   * The WebSocket subprotocol to use for the connection.
   */
  protocol?: string;
  /**
   * The number of seconds to wait for a pong response before closing the connection.
   * If the client does not respond within this timeout, the connection is deemed
   * unhealthy and closed, emitting the close and error events.
   * If no data is transmitted from the client for 2 minutes, the connection
   * will be closed regardless of this configuration.
   *
   * @default 30
   */
  idleTimeout?: number;
}
declare const bunnyAdapter: Adapter<BunnyAdapter, BunnyOptions>;
export { BunnyAdapter, BunnyOptions, bunnyAdapter };