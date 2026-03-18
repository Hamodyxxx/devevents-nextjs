import { NextRequest, NextResponse } from "next/server";

export type Handler = (req: NextRequest, ctx?: any) => Promise<NextResponse | void>;
export type Middleware = (handler: Handler) => Handler;

export function compose(...args: [...Middleware[], Handler]): Handler {
  const handler = args[args.length - 1] as Handler;
  const middlewares = args.slice(0, -1) as Middleware[];

  return middlewares.reduceRight((acc, middleware) => {
    return middleware(acc);
  }, handler);
}