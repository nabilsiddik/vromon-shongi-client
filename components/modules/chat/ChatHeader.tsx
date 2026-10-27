'use client'

import { shortText } from "@/utils/shortText";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, ArrowLeft, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatHeader({
  participants,
  trip,
}: {
  participants: any;
  trip: any;
}) {
  const allParticipants = Array.isArray(participants) ? participants : [];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 px-4 sm:px-6 py-3 bg-white gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile back button */}
        <Link
          href="/user/dashboard/join-room"
          className="md:hidden p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 shrink-0"
          title="Back to conversations"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <div
          className="h-11 w-11 rounded-xl border shrink-0 shadow-xs bg-gray-100"
          style={{
            backgroundImage: `url(${trip?.planImages?.[0] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight truncate">
              {shortText(trip?.title || "Trip Chat Room", 36)}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 flex-wrap">
            <span className="flex items-center gap-1 truncate max-w-[140px] sm:max-w-none">
              <MapPin className="w-3 h-3 text-primary shrink-0" /> {trip?.destination}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium text-emerald-600 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" /> Live Room
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
        {/* Participants Avatars */}
        {allParticipants.length > 0 && (
          <div className="flex items-center -space-x-2 overflow-hidden" title={`${allParticipants.length} Joined Mates`}>
            {allParticipants.slice(0, 4).map((p: any) => (
              <Avatar key={p.id} className="inline-block h-7 w-7 rounded-full ring-2 ring-white shadow-2xs">
                {p.user?.profileImage && (
                  <AvatarImage
                    src={p.user.profileImage}
                    alt={p.user?.firstName || "Mate"}
                    className="object-cover w-full h-full"
                  />
                )}
                <AvatarFallback className="w-full h-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {p.user?.firstName ? p.user.firstName[0].toUpperCase() : <User className="size-3" />}
                </AvatarFallback>
              </Avatar>
            ))}
            {allParticipants.length > 4 && (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700 ring-2 ring-white">
                +{allParticipants.length - 4}
              </span>
            )}
          </div>
        )}

        <Link target="_blank" href={`/trips/${trip?.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs font-semibold flex items-center gap-1.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-primary shadow-2xs"
          >
            <span>Trip Details</span> <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
