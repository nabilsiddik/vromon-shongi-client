import { CheckCircle, MapPin, Verified } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

type Traveler = {
  id: string;
  name: string;
  bio?: string;
  profileImage?: string;
  currentLocation?: string;
  interests: string[];
  verifiedBadge: boolean;
};

export default function TravelerCard({ traveler }: { traveler: Traveler }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-background p-4 transition-all hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-start gap-4">
        <img
          src={traveler?.profileImage || "/avatar.png"}
          alt={traveler?.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-muted"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold leading-none">
              {traveler?.name}
            </h3>

            {traveler?.verifiedBadge && (
              <Verified width={15} className="text-blue-500 mt-1" />
            )}
          </div>

          {traveler?.currentLocation && (
            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {traveler?.currentLocation}
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      {traveler?.bio && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {traveler?.bio}
        </p>
      )}

      {/* Interests */}
      <div className="mt-4 flex flex-wrap gap-2">
        {traveler?.interests.slice(0, 5).map((interest) => (
          <Badge
            key={interest}
            variant="secondary"
            className="rounded-full px-3 py-1 text-xs"
          >
            {interest}
          </Badge>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-md text-muted-foreground">Matched with you</span>

        <Link href={`/traveler-profile/${traveler?.id}`}>
          <Button size="sm" className="rounded-full cursor-pointer">
            View Profile
          </Button>
        </Link>
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-primary/30" />
    </div>
  );
}
