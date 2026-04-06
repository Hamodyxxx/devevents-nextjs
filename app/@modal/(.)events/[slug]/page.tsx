import { Suspense } from "react";
import BookEventModalPageContent from "@/components/modals/book-event-modal/book-event-modal-page-content";
import BookEventModalSkeleton from "@/components/modals/book-event-modal/book-event-modal.sekelton";

interface InterceptedEventPageProps {
  params: Promise<{ slug: string }>;
}

const InterceptedEventPage =  async ({ params }: InterceptedEventPageProps) => {
  return (
    <Suspense fallback={<BookEventModalSkeleton/>}>
      <BookEventModalPageContent slugPromise={params} />
    </Suspense>
  );
};

export default InterceptedEventPage;
