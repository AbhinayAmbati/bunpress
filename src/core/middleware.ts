export type Middleware = (
  req: Request,
  next: () => Promise<Response>
) => Promise<Response> | Response;

export class MiddlewareManager {
  private stack: Middleware[] = [];

  use(mw: Middleware) {
    this.stack.push(mw);
  }

  async run(req: Request, handler: () => Promise<Response>): Promise<Response> {
    let i = -1;
    const dispatch = async (index: number): Promise<Response> => {
      if (index <= i) throw new Error("next() called multiple times");
      i = index;
      const mw = this.stack[index];
      if (mw) return await mw(req, () => dispatch(index + 1));
      return await handler();
    };
    return dispatch(0);
  }
}
