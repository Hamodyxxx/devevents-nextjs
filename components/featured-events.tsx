import GridView from './grid-view';
import { BASE_URL } from '@/constants/base-url';
import { IResponse } from '@/types/response';
import { IEvent } from '@/database';
import { notFound } from 'next/navigation';
import EventCard from './event-card';
import { cacheLife, cacheTag } from 'next/cache';
import { wait } from '@/lib/wait';


const getEvents = async () => {
    const res = await fetch(`${BASE_URL}/api/events`);

    const data = await res.json();
    return data as IResponse<{
        events: IEvent[]
    }>
}

const FeaturedEvents = async () => {
    "use cache";
    cacheLife("hours");
    cacheTag("featured events")

    const { data } = await getEvents();
    if(!data) return notFound();

    const { events } = data;

    return (
        <div className="mt-20 space-y-7">
            <h3>Featured Events</h3>

            <GridView num={3} className="gap-10">
                {events.map((event) => (
                    <EventCard event={event} key={event.title}/>
                ))}
            </GridView>
        </div>
    )
}

export default FeaturedEvents