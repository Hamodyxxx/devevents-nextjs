import BookEvent from '@/components/book-event/book-event';
import EventDetails from '@/components/event-details/event-details';
import SimilarEvents from '@/components/event-details/similar-events';
import Heading from '@/components/heading';
import { BASE_URL } from '@/constants/base-url'
import { IEvent } from '@/database';
import { notFound } from 'next/navigation';

const getEventBy = async (slug: string) => {
    const res = await fetch(`${BASE_URL}/api/events/${slug}`);
    if (!res.ok) return null;
    return ((await res.json()) as { data?: { event: IEvent | null} }).data?.event;
}

interface EventDetailsPageProps {
  params: Promise<{ slug: string }>
}

const EventDetailsPage = async ({
  params
}: EventDetailsPageProps) => {
  const { slug } = await params;
  const event = await getEventBy(slug);

  if(!event) return notFound();

  const bookings = 10;

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
              bookings > 0 ? (
                <p className='text-sm'>
                  Join {bookings} people who have already booked their spot
                </p>
              ) : (
                <p className='text-sm'>Be the first to book your spot</p>
              )
            }
            <BookEvent/>
          </div>
        </aside>
      </div>
      <SimilarEvents slug={event.slug}/>
    </section>
  )
}

export default EventDetailsPage