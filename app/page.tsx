import ExploreBtn from "@/components/explore-btn";
import FeaturedEvents from "@/components/featured-events/featured-events";
import Heading from "@/components/heading";

const Page = async () => {

  return (
    <section>
      <Heading className="text-center">
        The Hub for Every Dev <br/> Event You Can't Miss
      </Heading>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All In One Place</p>

      <ExploreBtn/>

      <FeaturedEvents/>
    </section>
  )
}

export default Page;