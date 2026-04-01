import React, { useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"

interface BookEventFormProps {
    event: any;
    onSubmit?: () => void
}

const BookEventForm = ({
    event,
    onSubmit
}: BookEventFormProps) => {
    const emailRef = useRef<HTMLInputElement>(null);

    const {error, mutate, isPending} = useMutation({
        mutationFn: async (email: string) => {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventId: event._id, email }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || data.error || "Failed to book event");
            }
            return data;
        },
        onSuccess: () => {
            onSubmit?.();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        if (email) {
            mutate(email);
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