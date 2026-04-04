import { useMutation } from "@tanstack/react-query";
import { posthogClient } from "@/instrumation-client";
import { orpc } from "@/lib/orpc/orpc";

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
    return useMutation(orpc.bookings.create.mutationOptions({
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
    }));
}