"use client";
import { useState } from "react";
import BookEventForm from "./book-event-form";

const BookEvent = () => {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div id="book-event">
            {
                submitted ? (
                    <p>Thank You for signing up</p>
                ) : (
                    <BookEventForm onSubmit={() => setSubmitted(true)}/>
                )
            }
        </div>
    )
}

export default BookEvent