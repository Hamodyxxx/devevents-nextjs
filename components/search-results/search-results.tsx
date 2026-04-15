"use client";

import { useGetEventsQuery } from "@/hooks/use-get-events-query";
import GridView from "../grid-view";
import EventCard from "../event-card/event-card";
import EventCardSkeleton from "../event-card/event-card-skeleton";
import { useSearchParams } from "next/navigation";

export const SearchResults = () => {
    const params = useSearchParams();

    const query = params.get('q') || "";


    const { data, isPending } = useGetEventsQuery({
        query: query
    });

    const events = data?.events || [];

    return (
        <div className="space-y-8">
            {query && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        {isPending ? `Searching for "${query}"...` : `Results for "${query}"`}
                    </h2>
                </div>
            )}

            <GridView num={3} className="gap-10">
                {isPending ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <EventCardSkeleton key={`skeleton-${i}`} />
                    ))
                ) : events.length > 0 ? (
                    events.map((event) => (
                        <EventCard event={event} key={event.id || event.title} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-muted-foreground">
                        No events found matching your search.
                    </div>
                )}
            </GridView>
        </div>
    );
};