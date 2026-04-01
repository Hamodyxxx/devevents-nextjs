import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'
import { getQueryClient } from './get-query-client'

interface TanstackQueryClientProviderProps extends PropsWithChildren {}

const TanstackQueryClientProvider = ({
    children
}: TanstackQueryClientProviderProps) => {
    const queryClient = getQueryClient();
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

export default TanstackQueryClientProvider;