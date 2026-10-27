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
  const res = await getMatchedTravelers();
  const matchedTravelers = Array.isArray(res) ? res : [];

  if (!matchedTravelers.length) {
    return <NoMatchingTravelerFound />;
  }

  return (
    <section className="max-w-7xl mx-auto px-5 my-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          Matched Travelers for You 🤝
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Based on your shared interests, visited countries, and current destination.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchedTravelers.map((traveler: any) => (
          <TravelerCard key={traveler.id} traveler={traveler} />
        ))}
      </div>
    </section>
  );
}
