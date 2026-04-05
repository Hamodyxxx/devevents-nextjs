import GridView from '../grid-view';
import { notFound } from 'next/navigation';
import EventCard from '../event-card/event-card';
import { cacheLife, cacheTag } from 'next/cache';
import { orpcClient } from '@/lib/orpc/orpc';

const FeaturedEvents = async () => {
    "use cache";
    cacheLife("hours");
    cacheTag("featured events")

    const data = await orpcClient.events.getAll();
    const  events  = data?.data?.events;
    
    if(!events) return notFound();


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