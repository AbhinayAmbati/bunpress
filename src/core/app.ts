import { BunResponse } from "./response";

import { MiddlewareManager } from "./middleware";
import type { Middleware } from "./middleware";

import { Router } from "./router";

interface BunRequest extends Request {
  params?: Record<string, string>;
}


type Handler = (req: BunRequest, res : BunResponse) => Response | Promise<Response>;

export class Bunpress {
  private routes: Record<string, Handler> = {};

  private router = new Router();

  private middlewares = new MiddlewareManager();

  use(mw:  Middleware){
    this.middlewares.use(mw);
  }

  get(path: string, handler: Handler) {
    this.router.add("GET", path, handler);
  }

  post(path: string, handler: Handler) {
    this.router.add("POST", path, handler);
  }

  async listen(port: number) {
    console.log(`🚀 Bunpress running on http://localhost:${port}`);

    return Bun.serve({
      port,
      fetch: (req) =>
        this.middlewares.run(req, async () => {
          const url = new URL(req.url);
          const route = this.router.match(req.method, url.pathname);
          const res = new BunResponse();

          if (!route) {
            console.log("No route matched for:", req.method, url.pathname);
            return res.send("Not Found", 404);
          }

          try {
            // Attach params
            const reqWithParams = Object.assign(req, { params: route.params }) as BunRequest;
            return await route.handler(reqWithParams, res);
          } catch (err: any) {
            console.error("Error:", err);
            return res.send("Internal Server Error", 500);
          }
        }),
    });
  }
}
