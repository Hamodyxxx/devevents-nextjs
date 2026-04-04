import { BASE_URL } from '@/constants/base-url';
import { IEvent } from '@/server/database';
import { Suspense } from 'react'
import { notFound } from 'next/navigation';
import { cacheLife } from 'next/cache';
import BookEvent from '../book-event/book-event';
import EventDetails from '../event-details/event-details';
import SimilarEvents from '../event-details/similar-events/similar-events';
import SimilarEventsSkeleton from '../event-details/similar-events/similar-events-skeleton';
import Heading from '../heading';
import { orpcClient } from '@/lib/orpc/orpc';
interface EventDetailsContentProps {
    slugPromise: Promise<{slug: string}>
}

const EventDetailsContent = async({
    slugPromise
}: EventDetailsContentProps) => {
    "use cache";
    cacheLife("hours");

    const { slug } = await slugPromise;
    const data = await orpcClient.events.getBySlug({ slug });
    const event = data?.data?.event;
    
    if(!event) return notFound();


    return (
        <section id="event">
            <div className='header'>
                <Heading>{event.title}</Heading>
                <p>{event.description}</p>
            </div>

            <div className='details'>
                <EventDetails event={event} className='content'/>

                <aside className='booking'>
                    <div className='signup-card'>
                        <h2>Book Your Spot</h2>
                        {
                            event.bookingCount > 0 ? (
                                <p className='text-sm'>
                                    Join {event.bookingCount} people who have already booked their spot
                                </p>
                            ) : (
                                <p className='text-sm'>Be the first to book your spot</p>
                            )
                        }
                        <BookEvent event={event}/>
                    </div>
                </aside>
            </div>

            <Suspense fallback={<SimilarEventsSkeleton />}>
                <SimilarEvents slug={event.slug}/>
            </Suspense>
        </section>  
    )
}

export default EventDetailsContent