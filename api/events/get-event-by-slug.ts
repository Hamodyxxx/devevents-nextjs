import { BASE_URL } from "@/constants/base-url";
import { IEvent } from "@/server/database";
import { cacheLife } from "next/cache";

export const getEventBySlug = async (slug: string) => {
    "use cache";
    cacheLife("hours");
    
    const res = await fetch(`${BASE_URL}/api/events/${slug}`);
    if (!res.ok) return null;
    return ((await res.json()) as { data?: { event: IEvent | null } }).data?.event;
};
