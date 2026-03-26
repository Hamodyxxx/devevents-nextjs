import React, { useRef, useState } from "react"

interface BookEventFormProps {
    onSubmit?: () => void
}

const BookEventForm = ({
    onSubmit
}: BookEventFormProps) => {
    const email = useRef("");

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        onSubmit?.();
    }


    return (
        <form onSubmit={handleSubmit} >
            <div>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    value={email.current}
                    onChange={(e) => email.current = e.target.value}
                    id="email"
                    placeholder="Enter your email address"
                    required
                />
            </div>

            <button type="submit" className="button-submit">Submit</button>
        </form>
    )
}

export default BookEventForm