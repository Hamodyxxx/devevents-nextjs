import { orpc } from "@/lib/orpc/orpc"
import { useQuery } from "@tanstack/react-query"

interface UseGetEventsQueryArgs {
    query?: string 
    page?: number
    limit?: number
}

export const useGetEventsQuery = ({
    query,
    page,
    limit
}: UseGetEventsQueryArgs) => {
    return useQuery(orpc.event.getAll.queryOptions({
        input: {
            limit,
            page,
            q: query
        }
    }))
}