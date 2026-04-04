import { RPCHandler } from '@orpc/server/fetch'
import { onError } from '@orpc/server'
import { mainRouter } from '@/server/routes'
import { headers as getHeaders} from 'next/headers';

const handler = new RPCHandler(mainRouter, {
  interceptors: [ 
    onError((error) => {
      console.error(error);
    }),
  ],
})

async function handleRequest(request: Request) {
  const { response, matched } = await handler.handle(request, {
    prefix: '/rpc',
    context: {},
  })

  if (matched) {
    return response
  }

  return new Response('Not found', { status: 404 })
}

export const HEAD = handleRequest
export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest