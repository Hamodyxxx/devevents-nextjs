import { notFound } from "next/navigation";
import BookEventModal from "@/components/modals/book-event-modal/book-event-modal";
import { cacheLife } from "next/cache";
import { orpcClient } from "@/lib/orpc/orpc";
import { wait } from "@/lib/wait";

interface BookEventModalPageContentProps {
  slugPromise: Promise<{ slug: string }>;
}

const BookEventModalPageContent = async ({
  slugPromise,
}: BookEventModalPageContentProps) => {  
  const { slug } = await slugPromise;
  const data = await orpcClient.events.getBySlug({ slug });
  const event = data?.data?.event

  if (!event) return notFound();


  return <BookEventModal event={event} />;
};

export default BookEventModalPageContent;
