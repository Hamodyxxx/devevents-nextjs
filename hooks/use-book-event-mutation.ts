import { useMutation } from "@tanstack/react-query";
import { bookEventByEmail } from "@/api/bookings/book-event-by-email";
import { posthogClient } from "@/instrumation-client";

interface UseBookEventMutationArgs {
    eventId: string,
    eventSlug: string,    
    onSuccess?: () => void,
}

export const useBookEventMutation = ({
    eventId,
    eventSlug,    
    onSuccess,
}: UseBookEventMutationArgs) => {
    return useMutation({
        mutationFn: (email: string) => bookEventByEmail(eventId, email),
        onSuccess: (_, email) => {
            onSuccess?.()

            posthogClient.capture('event-booked', {
                eventId,
                slug: eventSlug,
                email
            })
        },
        onError: () => {
            posthogClient.captureException("Booking Creation Failed");
        }
    });
}