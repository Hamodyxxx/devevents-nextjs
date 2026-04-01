"use client";
import { useState } from "react";
import BookEventForm from "./book-event-form";

interface BookEventProps {
    event: any;
}

const BookEvent = ({ event }: BookEventProps) => {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div id="book-event">
            {
                submitted ? (
                    <p>Thank You for signing up</p>
                ) : (
                    <BookEventForm event={event} onSubmit={() => setSubmitted(true)}/>
                )
            }
        </div>
    )
}

export default BookEvent;