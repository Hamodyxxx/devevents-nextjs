import EventCard from "@/components/event-card";
import ExploreBtn from "@/components/explore-btn";
import GridView from "@/components/grid-view";
import Heading from "@/components/heading";
import { BASE_URL } from "@/constants/base-url";
import { IEvent } from "@/database";
import { IResponse } from "@/types/response";
import { notFound } from "next/navigation";

const getEvents = async () => {
  const res = await fetch(`${BASE_URL}/api/events`);
  const data = await res.json();
  return data as IResponse<{
    events: IEvent[]
  }>
}

const Page = async () => {
  const { data } = await getEvents();

  if(!data) return notFound();

  const { events } = data;

  return (
    <section>
      <Heading className="text-center">
        The Hub for Every Dev <br/> Event You Can't Miss
      </Heading>
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