import EventCard from '../../event-card/event-card';
import { cacheLife, cacheTag } from 'next/cache';
import { orpcClient } from '@/lib/orpc/orpc';


interface SimilarEventsProps {
    slug: string
}

const SimilarEvents = async ({
    slug
}: SimilarEventsProps) => {
    "use cache";
    cacheTag(`similar-events-${slug}`)
    cacheLife("hours");

    const events = await orpcClient.event.getSimilarBySlug({
        slug
    });


    if (events.length === 0) return null;

    return (
        <div className="flex w-full flex-col gap-4 pt-20">
            <h2>Similar Events</h2>
            <div className='events'>
                {events.length > 0 && events.map(e => (
                    <EventCard event={e} key={e.slug}/>
                ))}
            </div>
        </div>
    )
}

export default SimilarEvents