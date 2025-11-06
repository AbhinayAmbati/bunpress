import { statSync, existsSync } from "fs";
import { join, normalize, resolve } from "path";

/**
 * Serves static files from a given root directory.
 * Compatible with Bunpress middleware pipeline.
 */
export function staticFiles(root: string) {
  const base = resolve(normalize(root));

  return async (
    req: Request,
    next: () => Promise<Response | undefined>
  ): Promise<Response | undefined> => {
    const url = new URL(req.url);
    const filePath = normalize(join(base, decodeURIComponent(url.pathname)));

    if (!filePath.startsWith(base)) return await next();

    try {
      if (existsSync(filePath)) {
        const stats = statSync(filePath);
        if (stats.isFile()) {
          console.log("Serving static file:", filePath);

          const file = Bun.file(filePath);
          return new Response(file, {
            headers: {
              "Content-Type": getMimeType(filePath),
              "Cache-Control": "public, max-age=3600",
            },
          });
        }
      }
    } catch (err) {
      console.error("Static middleware error:", err);
    }

    return await next();
  };
}

function getMimeType(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "html":
    case "htm":
      return "text/html; charset=utf-8";
    case "css":
      return "text/css; charset=utf-8";
    case "js":
      return "application/javascript; charset=utf-8";
    case "json":
      return "application/json; charset=utf-8";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "txt":
      return "text/plain; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}
