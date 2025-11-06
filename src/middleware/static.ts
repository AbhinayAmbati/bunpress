import { statSync, existsSync } from "fs";
import { join, normalize } from "path";

export function staticFiles(root: string) {
  // normalize once
  const base = normalize(root);

  return async (req: Request, next: () => Promise<Response>) => {
    const url = new URL(req.url);
    const filePath = normalize(join(base, decodeURIComponent(url.pathname)));

    // security: prevent escaping the base folder
    if (!filePath.startsWith(base)) return await next();

    try {
      if (existsSync(filePath)) {
        const stats = statSync(filePath);
        if (stats.isFile()) {
          const file = Bun.file(filePath);
          return new Response(file, {
            headers: {
              "Cache-Control": "public, max-age=3600",
            },
          });
        }
      }
    } catch {
      // ignore errors and continue to next middleware
    }

    return await next();
  };
}
