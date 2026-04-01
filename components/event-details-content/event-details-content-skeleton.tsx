import React from 'react';
import SimilarEventsSkeleton from '../event-details/similar-events/similar-events-skeleton';

const EventDetailsContentSkeleton = () => {
    return (
        <section id="event">
            <div className='header'>
                <div className="w-3/4 lg:w-1/2 h-8 sm:h-12 bg-white/5 rounded-md animate-pulse mt-4 mb-2"></div>
                <div className="w-full sm:w-2/3 h-5 bg-white/5 rounded-md animate-pulse mb-6"></div>
            </div>

            <div className='details'>
                <div className='content flex flex-col gap-4 w-full'>
                    <div className="w-full aspect-video sm:h-100 bg-white/5 rounded-xl animate-pulse"></div>

                    <section className="flex flex-col gap-2 mt-8">
                        <div className="w-1/3 h-7 bg-white/5 rounded-md animate-pulse mb-2"></div>
                        <div className="w-full h-4 bg-white/5 rounded-md animate-pulse"></div>
                        <div className="w-full h-4 bg-white/5 rounded-md animate-pulse"></div>
                        <div className="w-5/6 h-4 bg-white/5 rounded-md animate-pulse"></div>
                    </section>

                    <section className="flex flex-col gap-3 mt-8">
                        <div className="w-1/3 h-7 bg-white/5 rounded-md animate-pulse mb-2"></div>
                        <div className="w-2/3 h-5 bg-white/5 rounded-md animate-pulse"></div>
                        <div className="w-2/3 h-5 bg-white/5 rounded-md animate-pulse"></div>
                        <div className="w-2/3 h-5 bg-white/5 rounded-md animate-pulse"></div>
                        <div className="w-2/3 h-5 bg-white/5 rounded-md animate-pulse"></div>
                    </section>
                </div>

                <aside className='booking'>
                    <div className='signup-card flex flex-col gap-4'>
                        <div className="w-2/3 h-8 bg-white/5 rounded-md animate-pulse mb-2"></div>
                        <div className="w-full h-4 bg-white/5 rounded-md animate-pulse"></div>
                        <div className="w-full h-12 bg-white/5 rounded-md animate-pulse mt-2"></div>
                    </div>
                </aside>
            </div>

            <SimilarEventsSkeleton />
        </section>
    )
}

export default EventDetailsContentSkeleton;
