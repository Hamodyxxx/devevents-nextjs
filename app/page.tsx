import ExploreBtn from "@/components/explore-btn";
import FeaturedEvents from "@/components/featured-events/featured-events";
import FeaturedEventsSkeleton from "@/components/featured-events/featured-events-skeleton";
import Heading from "@/components/heading";
import { Suspense } from "react";

const Page = async () => {
  return (
    <section>
      <Heading className="text-center">
        The Hub for Every Dev <br/> Event You Can't Miss
      </Heading>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All In One Place</p>

      <ExploreBtn/>

      <Suspense fallback={<FeaturedEventsSkeleton/>}>
        <FeaturedEvents/>
      </Suspense>
    </section>
  )
}

export default Page;