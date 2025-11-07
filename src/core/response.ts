type BodyInit = string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null;

export class BunResponse {
  private statusCode = 200;
  private headers = new Headers();

  status(code: number) {
    this.statusCode = code;
    return this;
  }

  setHeader(key: string, value: string) {
    this.headers.set(key, value);
    return this;
  }

  json(data: unknown) {
    this.headers.set("Content-Type", "application/json; charset=utf-8");
    return new Response(JSON.stringify(data), {
      status: this.statusCode,
      headers: this.headers,
    });
  }

  send(body: BodyInit | null = null, status?: number) {
    if (status) this.statusCode = status;
    if (typeof body === "object" && !(body instanceof Blob)) {
      this.headers.set("Content-Type", "application/json; charset=utf-8");
      body = JSON.stringify(body);
    }
    return new Response(body, {
      status: this.statusCode,
      headers: this.headers,
    });
  }

  redirect(url: string, status = 302) {
    return new Response(null, {
      status,
      headers: { Location: url },
    });
  }

  sendFile(path: string) {
    const file = Bun.file(path);
    if (!file.exists()) {
      return new Response("File not found", { status: 404 });
    }
    return new Response(file);
  }
}
