import { BunResponse } from "./response";

import { MiddlewareManager } from "./middleware";
import type { Middleware } from "./middleware";

type Handler = (req: Request, res : BunResponse) => Response | Promise<Response>;

export class Bunpress {
  private routes: Record<string, Handler> = {};

  private middlewares = new MiddlewareManager();

  use(mw:  Middleware){
    this.middlewares.use(mw);
  }

  get(path: string, handler: Handler) {
    this.routes[`GET ${path}`] = handler;
  }

  post(path: string, handler: Handler) {
    this.routes[`POST ${path}`] = handler;
  }

  async listen(port: number) {
    console.log(`🚀 Bunpress running on http://localhost:${port}`);

    return Bun.serve({
      port,
      fetch: async (req) => {
        const url = new URL(req.url);
        const routeKey = `${req.method} ${url.pathname}`;
        const handler = this.routes[routeKey];

        const res = new BunResponse();

        if (!handler)
          return new Response("Not Found", { status: 404 });

        try {
          return await handler(req,res);
        } catch (err: any) {
          console.error("Error:", err);
          return new Response("Internal Server Error", { status: 500 });
        }
      },
    });
  }
}
