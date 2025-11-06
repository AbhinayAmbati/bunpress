export async function notFound(req: Request) {
  return new Response("404 - Not Found", {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
