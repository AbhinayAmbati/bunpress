import { BunResponse } from "./response";

export interface RouteMatch {
  params: Record<string, string>;
  handler: (req: Request, res: BunResponse) => Response | Promise<Response>;
}

export class Router {
  private routes: {
    method: string;
    regex: RegExp;
    keys: string[];
    handler: (req: Request, res: BunResponse) => Response | Promise<Response>;
  }[] = [];

  add(method: string, path: string, handler: (req: Request, res: BunResponse) => Response | Promise<Response>) {
    const keys: string[] = [];

    // ✅ Special case for root "/"
    if (path === "/") {
      this.routes.push({
        method,
        regex: /^\/$/, // Matches exactly "/"
        keys,
        handler,
      });
      return;
    }

    // ✅ Convert /user/:id → ^/user/([^/]+)$
    const pattern =
      "^" +
      path
        .replace(/\/+$/, "") // remove trailing slash
        .replace(/:(\w+)/g, (_, key) => {
          keys.push(key);
          return "([^/]+)";
        }) +
      "/?$"; // allow optional trailing slash

    const regex = new RegExp(pattern);
    this.routes.push({ method, regex, keys, handler });
  }

  match(method: string, pathname: string): RouteMatch | null {
    for (const route of this.routes) {
      if (route.method !== method) continue;
      const match = route.regex.exec(pathname);
      if (match) {
        const params: Record<string, string> = {};
        route.keys.forEach((key, i) => {
          params[key] = match[i + 1] ?? "";
        });
        return { params, handler: route.handler };
      }
    }
    return null;
  }
}
