import { orpc, orpcClient } from '@/lib/orpc/orpc';
import { getQueryClient } from '@/providers/tanstack-query-client-provider/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { connection } from 'next/server';
import { SearchResults } from '@/components/search-results/search-results';

export const SearchResultsContent = async ({ 
    searchParams 
}: { 
    searchParams: Promise<{ q: string }> 
}) => {
    await connection(); 
    const { q } = await searchParams;
    
    const queryClient = getQueryClient();

    const data = await orpcClient.events.getAll({ q });
    const key = orpc.events.getAll.key({ input: { q } });

    queryClient.setQueryData(key, data);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SearchResults />
        </HydrationBoundary>
    );
};