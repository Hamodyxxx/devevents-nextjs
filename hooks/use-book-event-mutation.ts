import { useMutation } from "@tanstack/react-query";
import { bookEventByEmail } from "@/api/bookings/book-event-by-email";

interface UseBookEventMutation {
    eventId: string
    onSuccess?: () => void
}

export const useBookEventMutation = ({
    eventId,
    onSuccess
}: UseBookEventMutation) => {
    return useMutation({
        mutationFn: (email: string) => bookEventByEmail(eventId, email),
        onSuccess: () => onSuccess?.(),
    });
}