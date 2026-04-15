import { notFound } from "next/navigation";
import BookEventModal from "@/components/modals/book-event-modal/book-event-modal";
import { cacheLife } from "next/cache";
import { orpcClient } from "@/lib/orpc/orpc";

interface BookEventModalPageContentProps {
  slugPromise: Promise<{ slug: string }>;
}

const BookEventModalPageContent = async ({
  slugPromise,
}: BookEventModalPageContentProps) => {  
  "use cache";
  cacheLife("hours");
  const { slug } = await slugPromise;
  const event = await orpcClient.event.getBySlug({ slug });

  if (!event) return notFound();


  return <BookEventModal event={event} />;
};

export default BookEventModalPageContent;
