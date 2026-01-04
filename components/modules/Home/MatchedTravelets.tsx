import NoMatchingTravelerFound from "@/components/NoMathingTravelerFound";
import TravelerCard from "@/components/TravelerCard";
import { getMatchedTravelers } from "@/services/traveler/travelerManagement";
import { IUser } from "@/types/user.interface";

type Traveler = {
  id: string;
  name: string;
  bio?: string;
  profileImage?: string;
  currentLocation?: string;
  interests: string[];
  verifiedBadge: boolean;
};

export default async function MatchedTravelersSection() {
  const matchedTravelers = await getMatchedTravelers();

  console.log(matchedTravelers, "matched");

  if (!matchedTravelers.length) {
    return <NoMatchingTravelerFound />;
  }

  return (
    <section className="max-w-7xl mx-auto px-5 my-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Matched Travelers for you
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchedTravelers.map((traveler: Traveler) => (
          <TravelerCard key={traveler.id} traveler={traveler} />
        ))}
      </div>
    </section>
  );
}
