import GridView from '../grid-view';
import { BASE_URL } from '@/constants/base-url';
import { IResponse } from '@/types/response';
import { IEvent } from '@/server/database';
import { notFound } from 'next/navigation';
import EventCard from '../event-card/event-card';
import { cacheLife, cacheTag } from 'next/cache';
import { orpcClient } from '@/lib/orpc/orpc';

const FeaturedEvents = async () => {
    "use cache";
    cacheLife("hours");
    cacheTag("featured events")

    const { data } = await orpcClient.events.getAll();
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