import EventCardSkeleton from "@/components/event-card/event-card-skeleton";

const SimilarEventsSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4 pt-20">
      <h2>Similar Events</h2>
      <div className="events">
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    </div>
  );
};

export default SimilarEventsSkeleton;
