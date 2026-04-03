import { notFound } from "next/navigation";
import BookEventModal from "@/components/modals/book-event-modal";
import { cacheLife } from "next/cache";
import { getEventBySlug } from "@/api/events/get-event-by-slug";

interface BookEventModalPageContentProps {
  slugPromise: Promise<{ slug: string }>;
}

const BookEventModalPageContent = async ({
  slugPromise,
}: BookEventModalPageContentProps) => {
  "use cache";
  cacheLife("hours");

  const { slug } = await slugPromise;
  const event = await getEventBySlug(slug);

  if (!event) return notFound();

  return <BookEventModal event={event} />;
};

export default BookEventModalPageContent;
