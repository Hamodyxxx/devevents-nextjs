import dbConnect from "@/lib/mongo";
import { os } from "@orpc/server";

export const withDbProviderMiddleware = os.middleware(async ({ next }) => {
    const db = await dbConnect();
    return await next({
        context: {
            db
        }
    });
})