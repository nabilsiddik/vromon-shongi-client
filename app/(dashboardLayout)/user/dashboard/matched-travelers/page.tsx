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

export default async function MatchedTravelers() {
  const matchedTravelers = await getMatchedTravelers();

  if (!matchedTravelers.length) {
    return <NoMatchingTravelerFound />;
  }

  return (
    <section className="px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchedTravelers.map((traveler: Traveler) => (
          <TravelerCard key={traveler.id} traveler={traveler} />
        ))}
      </div>
    </section>
  );
}
