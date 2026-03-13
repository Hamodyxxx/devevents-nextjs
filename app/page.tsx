import EventCard from "@/components/event-card";
import ExploreBtn from "@/components/explore-btn";
import GridView from "@/components/grid-view";
import { events } from "@/lib/constants";

const Page = () => {
  return (
    <section>
      <h1 className="text-center text-gradient max-sm:text-4xl text-6xl">
        The Hub for Every Dev <br/> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All In One Place</p>

      <ExploreBtn/>

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <GridView num={3} className="gap-10">
          {
            events.map((event) => (
              <EventCard event={event} key={event.title}/>
            ))
          }
        </GridView>
      </div>
    </section>
  )
}

export default Page;