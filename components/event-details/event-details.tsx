import { IEvent } from "@/server/database"
import Image from "next/image"
import EventDetailItem from "./event-detail-item"
import { cn } from "@/lib/utils"
import EventAgenda from "./event-agenda"
import EventTags from "./event-tags"
import { EventDto } from "@/server/data-access"

interface EventDetailsProps {
    event: EventDto
    className?: string
}

const EventDetails = ({
    event,
    className
}: EventDetailsProps) => {
    return (
        <div className={cn(
            "flex flex-col gap-4 content",
            className
        )}>
            <Image 
                src={event.image} 
                alt="Event Banner" 
                width={800} 
                height={800} 
                className="w-full rounded-xl"
            />

            <section className="flex flex-col gap-2">
                <h2>Overview</h2>
                <p>{event.overview}</p>
            </section>

            <section className="flex flex-col gap-2">
                <h2>Event Details</h2>

                <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={event.date}  />
                <EventDetailItem icon="/icons/clock.svg" alt="clock" label={event.time}  />
                <EventDetailItem icon="/icons/pin.svg" alt="pin" label={event.location}  />
                <EventDetailItem icon="/icons/mode.svg" alt="mode" label={event.mode}  />
                <EventDetailItem icon="/icons/audience.svg" alt="audience" label={event.audience}  />
            </section>   

            <EventAgenda agendaItems={event.agenda}/>

            <section className="flex-col-gap-2">
                <h2>About the Organizer</h2>
                <p>{event.organizer}</p>
            </section>

            
            <EventTags tags={event.tags}/>
        </div>
    )
}

export default EventDetails