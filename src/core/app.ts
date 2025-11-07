import { BunResponse } from "./response";
import { MiddlewareManager } from "./middleware";
import type { Middleware } from "./middleware";
import { Router } from "./router";
import { ErrorManager } from "./errorHandler";

interface BunRequest extends Request {
  params?: Record<string, string>;
}

type Handler = (req: BunRequest, res: BunResponse) => Response | Promise<Response>;

export class Bunpress {
  private router = new Router(); 
  private middlewares = new MiddlewareManager();
  private errorManager = new ErrorManager();

  use(mw: Middleware) {
    this.middlewares.use(mw);
  }

  useError(handler: (err: any, req: Request, res: BunResponse) => Response | Promise<Response>) {
    this.errorManager.set(handler);
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
      fetch: async (req) => {
        const url = new URL(req.url);
        console.log("\n--- Incoming request ---");
        console.log("Method:", req.method);
        console.log("Path:", url.pathname);
        console.log("Registered routes:", this.router);

        try {
          const result = await this.middlewares.run(req, async () => {
            const route = this.router.match(req.method, url.pathname);

            const res = new BunResponse();

            if (!route) {
              return undefined;
            }

            const reqWithParams = Object.assign(req, {
              params: route.params,
            }) as BunRequest;

            const r = await route.handler(reqWithParams, res);
            return r;
          });

          return result ?? new Response("404 - Not Found", { status: 404 });
        } catch (err) {
          console.error("❌ Caught error in fetch:", err);
          return await this.errorManager.handle(err, req);
        }
      },
    });
  }
}
