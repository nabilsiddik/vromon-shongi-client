import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const NoMatchingTravelerFound = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 my-20 flex flex-col items-center justify-center rounded-2xl border bg-background py-16 text-center shadow-sm">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Users className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-2xl font-semibold">
        No Matching Travelers Found
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-md text-muted-foreground">
        We couldn’t find any travelers matching your interests, visited
        countries, or current location yet. Updating your profile can help you
        discover better matches.
      </p>

      {/* CTA */}
      <Link href="/user/dashboard/profile">
        <Button className="mt-6 rounded-full">
          Update Your Profile
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>

      {/* Sub hint */}
      <p className="mt-4 text-md text-muted-foreground">
        Tip: Add more interests or update your location to increase matches.
      </p>
    </div>
  );
};

export default NoMatchingTravelerFound;
