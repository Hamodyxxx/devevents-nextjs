import { QueryClient } from "@tanstack/react-query";

let browserQueryClient: null | QueryClient = null;

function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            }
        }
    })
}

export function getQueryClient() {
    if(typeof window === "undefined") return createQueryClient();
    
    if(!browserQueryClient) browserQueryClient = createQueryClient();
    return browserQueryClient;
}