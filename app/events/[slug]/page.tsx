import Heading from '@/components/heading';
import { BASE_URL } from '@/constants/base-url'
import { IEvent } from '@/database';
import { notFound } from 'next/navigation';
import React from 'react'

const getEvent = async (slug: string) => {
    const res = await fetch(`${BASE_URL}/api/events/${slug}`);
    return ((await res.json()) as { data?: { event: IEvent | null} }).data?.event;
}

interface EventDetailsPageProps {
  params: Promise<{ slug: string }>
}

const EventDetailsPage = async ({
  params
}: EventDetailsPageProps) => {
  const { slug } = await params;
  const event = await getEvent(slug);

  if(!event) return notFound();

  return (
    <section id="event">
      <Heading>
        Event slug {event.slug}
      </Heading>
    </section>
  )
}

export default EventDetailsPage