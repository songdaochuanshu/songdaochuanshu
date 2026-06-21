import { Adapter, AdapterInstance, AdapterOptions } from "./adapter.mjs";
interface DenoAdapter extends AdapterInstance {
  handleUpgrade(req: Request, info: ServeHandlerInfo): Promise<Response>;
}
interface DenoOptions extends AdapterOptions {}
type ServeHandlerInfo = {
  remoteAddr?: {
    transport: string;
    hostname: string;
    port: number;
  };
};
declare const denoAdapter: Adapter<DenoAdapter, DenoOptions>;
export { DenoAdapter, DenoOptions, denoAdapter };