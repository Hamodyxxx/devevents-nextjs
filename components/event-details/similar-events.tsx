import { BASE_URL } from '@/constants/base-url'
import { IEvent } from '@/database';
import React from 'react'
import EventCard from '../event-card';
import { cacheLife, cacheTag } from 'next/cache';

const getSimilarEvents = async (slug: string) => {
    const res = await fetch(`${BASE_URL}/api/events/${slug}/similar`);
    if(!res.ok) return [] as IEvent[];
    const data = await res.json();
    return data.data.events as IEvent[];
}

interface SimilarEventsProps {
    slug: string
}

const SimilarEvents = async ({
    slug
}: SimilarEventsProps) => {
    "use cache";
    cacheTag(`similar-events-${slug}`)
    cacheLife("hours");

    const events = await getSimilarEvents(slug);

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