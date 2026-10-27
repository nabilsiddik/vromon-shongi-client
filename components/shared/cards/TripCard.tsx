import { Badge } from "@/components/ui/badge";
import { dayDifference, formatDate } from "@/utils/dateManagement";
import { shortText } from "@/utils/shortText";
import Image from "next/image";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TripCardProps {
  trip: any;
  className?: string;
  titleLength?: number;
}

const TripCard = ({ trip, className = "", titleLength }: TripCardProps) => {
  const { user } = trip || {};
  const thumbnail =
    trip?.planImages?.[0] ||
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

  return (
    <div
      className={`group bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-gray-100 overflow-hidden ${className}`}
    >
      {/* Thumbnail area with uniform fixed aspect ratio for all plans */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
        <Link href={`/trips/${trip?.id}`} className="block w-full h-full relative">
          <Image
            src={thumbnail}
            alt={trip?.title || "Trip Image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* User profile avatar - sibling link, NOT nested inside any other link */}
        {user?.id && (
          <Link
            href={`/traveler-profile/${user.id}`}
            className="absolute bottom-3 left-3 z-10 block transition-transform hover:scale-105"
            title={`View ${user?.firstName || "Host"}'s profile`}
          >
            <div className="relative">
              <Avatar className="w-12 h-12 rounded-xl border-2 border-white shadow-md overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
                {user?.profileImage && (
                  <AvatarImage
                    src={user.profileImage}
                    alt={user.firstName || "Host"}
                    className="object-cover w-full h-full"
                  />
                )}
                <AvatarFallback className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                  <User className="size-6 text-white" />
                </AvatarFallback>
              </Avatar>
              {user?.verifiedBadge && (
                <span className="absolute -bottom-1 -right-1 z-20 bg-white rounded-full p-0.5 shadow">
                  <MdVerified className="text-sky-500 text-base" />
                </span>
              )}
            </div>
          </Link>
        )}
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-medium text-gray-500">
              host{" "}
              {user?.id ? (
                <Link
                  href={`/traveler-profile/${user.id}`}
                  className="font-semibold text-gray-800 hover:text-primary transition-colors hover:underline"
                >
                  {user?.firstName || "Traveler"}
                </Link>
              ) : (
                <span className="font-semibold text-gray-800">Traveler</span>
              )}
            </span>
            <Badge variant="secondary" className="text-xs capitalize font-medium text-white">
              {trip?.travelType?.toLowerCase() || "solo"}
            </Badge>
          </div>

          <Link href={`/trips/${trip?.id}`} className="group/title block">
            <h3 className="font-bold text-base text-gray-900 group-hover/title:text-primary line-clamp-2 transition-colors mb-1">
              {shortText(trip?.title || "Untitled Trip", titleLength || 55)}
            </h3>
          </Link>
        </div>

        <div className="pt-3 border-t border-gray-100 mt-2">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>From {formatDate(trip?.startDate)}</span>
            <span className="font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
              {dayDifference(trip?.startDate, trip?.endDate)} Days
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-primary">
              ${trip?.budgetFrom} - ${trip?.budgetTo}
            </span>
            <Link
              href={`/trips/${trip?.id}`}
              className="text-xs font-semibold text-gray-600 hover:text-primary transition-colors flex items-center gap-1"
            >
              View Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;