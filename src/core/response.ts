export class BunResponse {
  json(data: any, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  send(text: string, status = 200, contentType = "text/plain") {
    return new Response(text, {
      status,
      headers: { "Content-Type": contentType },
    });
  }
}
