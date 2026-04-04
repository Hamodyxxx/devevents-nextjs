import { IEvent } from "@/server/database";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
    event: IEvent;
}

const EventCard = ({
    event
}: EventCardProps) => {
  return (
    <Link href={`/events/${event.slug}`} className="flex flex-col gap-3 font-light text-sm text-light-200">
        <Image src={event.image} alt={event.title} width={410} height={300} className="rounded-lg w-full h-80 sm:h-min object-cover"/>

        <div className="flex flex-row gap-2 text-sm ">
          <Image src="/icons/pin.svg" alt="location" width={14} height={14}/>
          <p>{event.location}</p>
        </div>

        <p className="text-xl font-semibold line-clamp-1">
          {event.title}
        </p>

        <div className="text-light-200 flex flex-row flex-wrap items-center gap-4">
          <div className="flex flex-row gap-2">
            <Image src="/icons/calendar.svg" alt="date" width={14} height={14}/>
            <p>{event.date}</p>
          </div>
          <div className="flex flex-row gap-2">
            <Image src="/icons/clock.svg" alt="time" width={14} height={14}/>
            <p>{event.time}</p>
          </div>
        </div>
    </Link>
  )
}

export default EventCard