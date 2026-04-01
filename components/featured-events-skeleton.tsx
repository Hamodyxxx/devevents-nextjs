import GridView from "./grid-view";

export const EventCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Image Skeleton */}
      <div className="rounded-lg w-full h-80 sm:h-75 bg-white/5 animate-pulse" />

      {/* Location Skeleton */}
      <div className="flex flex-row gap-2 mt-1">
        <div className="w-3.5 h-3.5 rounded-full bg-white/5 animate-pulse" />
        <div className="w-1/3 h-4 rounded-md bg-white/5 animate-pulse" />
      </div>

      {/* Title Skeleton */}
      <div className="w-3/4 h-6 rounded-md bg-white/5 animate-pulse" />

      {/* Date & Time Skeleton */}
      <div className="flex flex-row flex-wrap items-center gap-4 mt-1">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-white/5 animate-pulse" />
          <div className="w-20 h-4 rounded-md bg-white/5 animate-pulse" />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-white/5 animate-pulse" />
          <div className="w-16 h-4 rounded-md bg-white/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const FeaturedEventsSkeleton = () => {
  return (
    <div className="mt-20 space-y-7">
      <h3>Featured Events</h3>

      <GridView num={3} className="gap-10">
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </GridView>
    </div>
  );
};

export default FeaturedEventsSkeleton;
