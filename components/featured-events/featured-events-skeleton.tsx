import EventCardSkeleton from "../event-card/event-card-skeleton";
import GridView from "../grid-view";

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
