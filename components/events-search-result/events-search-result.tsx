import { useDebounce } from '@/hooks/use-debounce'
import { useGetEventsQuery } from '@/hooks/use-get-events-query'
import React from 'react'
import { SearchResults } from '../search-results/search-results'
import { Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface EventsSearchResultProps {
    query: string
    isVisible: boolean
}

export const EventsSearchResult = ({
    query,
    isVisible = false
}: EventsSearchResultProps) => {
    const debouncedValue = useDebounce(query);

    const { data } = useGetEventsQuery({
        query: debouncedValue,
        limit: 10
    });
    const events = data?.data?.events || [];

    return (
        <SearchResults
            isVisible={isVisible}
            items={events}
            className=""
            renderItem={(event) => (
                <Link href={`/events/${event.slug}?full=true`} className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 group hover:bg-[#5dfeca]/10 border border-transparent hover:border-[#5dfeca]/20">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#5dfeca] group-hover:bg-[#5dfeca] group-hover:text-black transition-colors duration-300">
                        <Calendar size={18} />
                    </div>
            
                    <div className="flex-1">
                        <h4 className="font-semibold text-zinc-100 group-hover:text-[#5dfeca] transition-colors line-clamp-1">
                            {event.title}
                        </h4>
                        
                        <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors line-clamp-1">
                            {event.location}
                        </p>
                    </div>
            
                    <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#5dfeca]">
                        <ChevronRight size={16} />
                    </div>
                </Link>
            )}
        />
    )
}

