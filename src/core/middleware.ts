export type Middleware = (
  req: Request,
  next: () => Promise<Response | undefined> | Promise<Response>
) => Promise<Response | undefined> | Response | undefined;

export class MiddlewareManager {
  private stack: Middleware[] = [];

  use(mw: Middleware) {
    this.stack.push(mw);
  }

  async run(
    req: Request,
    handler: () => Promise<Response | undefined>
  ): Promise<Response | undefined> {
    let i = -1;

    const dispatch = async (index: number): Promise<Response | undefined> => {
      if (index <= i) throw new Error("next() called multiple times");
      i = index;

      const mw = this.stack[index];
      if (mw) {
        return await mw(req, () => dispatch(index + 1));
      }

      // end of middleware chain → call the route handler
      return await handler();
    };

    return dispatch(0);
  }
}
