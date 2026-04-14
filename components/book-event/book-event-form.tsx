import React, { SubmitEventHandler, useRef, useState } from "react"
import { useBookEventMutation } from "@/hooks/use-book-event-mutation";
import { EventDto } from "@/server/data-access";

interface BookEventFormProps {
    event: EventDto;
    onSubmit?: () => void
}

const BookEventForm = ({
    event,
    onSubmit
}: BookEventFormProps) => {
    const emailRef = useRef<HTMLInputElement>(null);

    const {error, mutate, isPending} = useBookEventMutation({
        eventId: event.id, 
        eventSlug: event.slug,
        onSuccess: onSubmit
    });

    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        if (email) {
            mutate({
                email: email,
                eventId: event.id
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <div>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    ref={emailRef}
                    id="email"
                    placeholder="Enter your email address"
                    required
                    disabled={isPending}
                />
            </div>

            {error?.message && <p className="text-sm mt-1 mb-2 text-[#fb3b53]">{error?.message}</p>}

            <button type="submit" className="button-submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
            </button>
        </form>
    )
}

export default BookEventForm