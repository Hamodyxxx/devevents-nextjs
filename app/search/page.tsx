import { SearchResultsContent } from '@/components/events-search-results-content/events-search-results-content';
import { EventsSearchResultsContentSkeleton } from '@/components/events-search-results-content/events-search-results-content-skeleton';
import React, { Suspense } from 'react'

interface EventsSearchPageProps {
    searchParams: Promise<{
        q: string
    }>
}

const EventsSearchPage = async ({
    searchParams
}: EventsSearchPageProps) => {
    return (
        <>
            <h1>Search Results</h1>
            <Suspense fallback={<EventsSearchResultsContentSkeleton />}>
                <SearchResultsContent searchParams={searchParams} />
            </Suspense>
        </>
    )
}

export default EventsSearchPage;