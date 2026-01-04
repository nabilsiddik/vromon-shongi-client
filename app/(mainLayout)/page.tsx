import FindBuddyCTA from "@/components/modules/Home/FindBuddyCTA";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import MatchedTravelersSection from "@/components/modules/Home/MatchedTravelets";
import PricingSection from "@/components/modules/Home/Pricing";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopDestinations from "@/components/modules/Home/TopDestination";
import TopRatedTravelers from "@/components/modules/Home/TopRatedTravelers";
import getLogedInUser from "@/services/user/userManagement";

export const dynamic = "force-dynamic";
export default async function Home() {
  const user = await getLogedInUser();

  return (
    <div>
      <Hero />
      <TopDestinations />
      <FindBuddyCTA />
      {user && <MatchedTravelersSection />}
      <TopRatedTravelers />
      <HowItWorks />
      <PricingSection />
      <Testimonials />
    </div>
  );
}
