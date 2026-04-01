export const bookEventByEmail = async ( 
    eventId: string, 
    email: string
) => {
    const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, email }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || data.error || "Failed to book event");
    
    return data;
};
