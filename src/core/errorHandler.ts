import { BunResponse } from "./response";

export type ErrorHandler = (err: any, req: Request, res: BunResponse) => Response | Promise<Response>;

export class ErrorManager {
  private handler?: ErrorHandler;

  set(handler: ErrorHandler) {
    this.handler = handler;
  }

  async handle(err: any, req: Request): Promise<Response> {
    const res = new BunResponse();

    if (this.handler) {
      return await this.handler(err, req, res);
    }

    // default fallback
    console.error("Unhandled error:", err);
    const body = {
      error: "Internal Server Error",
      message: err?.message || "Unknown error",
    };
    return res.status(500).json(body);
  }
}
