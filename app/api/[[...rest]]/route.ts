
import { mainRouter } from '@/server/routes';
import { onError } from '@orpc/client';
import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { SmartCoercionPlugin } from "@orpc/json-schema";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";

const openApiHandler = new OpenAPIHandler(mainRouter, {
     interceptors: [
        onError((error) => {
            console.error(error);
        })
     ],
     plugins: [
        new SmartCoercionPlugin({
            schemaConverters: [new ZodToJsonSchemaConverter()]
        }),
        new OpenAPIReferencePlugin({
            schemaConverters: [new ZodToJsonSchemaConverter()],
            specGenerateOptions: {
                info: {
                    title: "Events Playground",
                    version:"1.0.0"
                }
            }
        })
     ]
});

async function handleRequest(request:Request) {

    const { response } = await openApiHandler.handle(request, {
        prefix: "/api",
        context: {}
    })

    return response ?? new Response("Not Found", {status: 404});
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;
export const PATCH = handleRequest;