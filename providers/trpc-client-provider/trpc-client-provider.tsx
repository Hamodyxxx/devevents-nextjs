"use client";
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'
import { getQueryClient } from './get-query-client'
import { AppRouter } from '@/server/trpc/root';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { TRPCProvider } from '@/lib/trpc/trpc-client';

interface TrpcClientProviderProps extends PropsWithChildren {}

const TrpcClientProvider = ({
    children
}: TrpcClientProviderProps) => {
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>({
            links: [
                httpBatchLink({
                    url: "/api/trpc",
                })
            ]
        }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                {children}
            </TRPCProvider>
        </QueryClientProvider>
    )
}

export default TrpcClientProvider;