"use client";
import { useRouter } from "next/navigation";
import { IEvent } from "@/database";
import BookEvent from "@/components/book-event/book-event";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BookEventModalProps {
  event: IEvent;
}

const BookEventModal = ({ event }: BookEventModalProps) => {
  const router = useRouter();

  return (
    <Dialog onOpenChange={() => router.back()} open={true}>
      <DialogContent
        id="book-event-modal"
        className="max-w-4xl! w-full! border-[#1f2f38] bg-[#0d161a] text-white p-0 overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row w-full">

          <div className="relative w-1/2 shrink-0">
            <div className="relative h-56 lg:h-full lg:min-h-105 w-full">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent sm:bg-linear-to-r sm:from-black/80 sm:to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] text-[#59deca] uppercase tracking-widest font-semibold mb-2">
                About
              </p>
              <p className="text-sm text-white/75 line-clamp-3 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 flex-1 p-7 pt-9">
            <DialogHeader className="gap-2">
              <p className="text-[10px] uppercase tracking-widest text-[#59deca] font-semibold">
                Book Your Spot
              </p>
              <DialogTitle className="text-lg font-bold text-white leading-snug">
                {event.title}
              </DialogTitle>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-[#bdbdbd]">
                  <Image src="/icons/calendar.svg" alt="date" width={12} height={12} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#bdbdbd]">
                  <Image src="/icons/pin.svg" alt="location" width={12} height={12} />
                  <span>{event.location}</span>
                </div>
              </div>

              <DialogDescription asChild>
                <p className="text-xs text-[#bdbdbd] leading-relaxed pt-1">
                  {event.bookingCount > 0 ? (
                    <>
                      Join{" "}
                      <span className="font-semibold text-[#59deca]">
                        {event.bookingCount}
                      </span>{" "}
                      people already booked.
                    </>
                  ) : (
                    "Be the first to book your spot!"
                  )}
                </p>
              </DialogDescription>
            </DialogHeader>

            <BookEvent event={event} />

            <div className="h-px w-full bg-[#1f2f38]" />

            <Link
              id="modal-view-full-page-link"
              href={`/events/${event.slug}`}
              className="flex items-center justify-center gap-1.5 text-xs text-[#bdbdbd] hover:text-[#59deca] transition-colors group pb-1"
            >
              View full event details
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookEventModal;
