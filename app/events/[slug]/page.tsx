import EventDetailsContent from '@/components/event-details-content';
import EventDetailsContentSkeleton from '@/components/event-details-content-skeleton';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';

interface EventDetailsPageProps {
  params: Promise<{ slug: string }>
}

const EventDetailsPage = async ({
  params
}: EventDetailsPageProps) => {
  return (
    <Suspense fallback={<EventDetailsContentSkeleton />}>
      <EventDetailsContent slugPromise={params}/> 
    </Suspense>
  )
}

export default EventDetailsPage