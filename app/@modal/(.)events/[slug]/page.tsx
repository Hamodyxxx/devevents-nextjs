import { Suspense } from "react";
import BookEventModalPageContent from "@/components/modals/book-event-modal-page-content";

interface InterceptedEventPageProps {
  params: Promise<{ slug: string }>;
}

const InterceptedEventPage =  ({ params}: InterceptedEventPageProps) => {

  return (
    <Suspense fallback={null}>
      <BookEventModalPageContent slugPromise={params} />
    </Suspense>
  );
};

export default InterceptedEventPage;
