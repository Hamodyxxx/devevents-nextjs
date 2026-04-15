import EventCardSkeleton from "../event-card/event-card-skeleton";

export const EventsSearchResultsContentSkeleton = () => {
  return (
    <div className="space-y-8 mt-10">
      {/* Search Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 rounded bg-muted animate-pulse" />
        <div className="h-4 w-40 rounded bg-muted/60 animate-pulse" />
      </div>

      {/* Grid Skeleton (Matching your GridView 3-column layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Create 6 placeholder cards */}
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
