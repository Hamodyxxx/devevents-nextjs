import { RouterClient } from "@orpc/server";
import { createORPCClient } from "@orpc/client";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { RPCLink } from "@orpc/client/fetch";
import { mainRouter } from "@/server/routes";
import { BASE_URL } from "@/constants/base-url";

declare global {
    var $client: RouterClient<typeof mainRouter> | undefined;
}

const link = new RPCLink({
    url: () => {
      if (typeof window === 'undefined') {
        throw new Error('RPCLink is not allowed on the server side.')
      } 

      return `${window.location.origin}/rpc`
    },
  })
 
export const orpcClient: RouterClient<typeof mainRouter> = globalThis.$client ?? createORPCClient(link);

export const orpc = createTanstackQueryUtils(orpcClient);