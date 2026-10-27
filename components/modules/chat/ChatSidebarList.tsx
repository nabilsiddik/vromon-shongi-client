'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MapPin, MessageSquare, X, Compass } from "lucide-react";
import { shortText } from "@/utils/shortText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatSidebarListProps {
  participations: any[];
}

export default function ChatSidebarList({ participations }: ChatSidebarListProps) {
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const allItems = Array.isArray(participations) ? participations : [];

  const filtered = allItems.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    const title = item?.trip?.title?.toLowerCase() || "";
    const destination = item?.trip?.destination?.toLowerCase() || "";
    return title.includes(q) || destination.includes(q);
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header & Search Bar */}
      <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" /> Conversations
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {allItems.length}
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversation..."
            className="w-full rounded-lg bg-gray-50 border border-gray-200 pl-9 pr-8 py-2 text-xs outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y-0">
        {allItems.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-2">
              <Compass className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-800">No active trip chats</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto">
              Join a trip or create one to coordinate with fellow travelers!
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-10 px-4 text-center text-xs text-muted-foreground">
            No conversations matching &ldquo;{search}&rdquo;
          </div>
        ) : (
          filtered.map((item: any) => {
            const trip = item?.trip;
            const tripId = trip?.id || item?.tripId;
            const isHost = item?.isHost || trip?.userId === item?.userId;
            const isActive = pathname.includes(`/join-room/${tripId}`);
            const thumbnail = trip?.planImages?.[0];

            return (
              <Link key={item.id || tripId} href={`/user/dashboard/join-room/${tripId}`} className="block">
                <div
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer border ${
                    isActive
                      ? "bg-primary/10 border-primary/30 shadow-xs"
                      : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <Avatar className="h-12 w-12 rounded-xl shrink-0 border border-gray-200 shadow-2xs">
                    {thumbnail && (
                      <AvatarImage src={thumbnail} alt={trip?.title || "Trip"} className="object-cover w-full h-full" />
                    )}
                    <AvatarFallback className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      {trip?.title ? trip.title.slice(0, 2).toUpperCase() : <Compass className="w-5 h-5 text-white" />}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className={`font-semibold text-xs leading-snug truncate ${isActive ? "text-primary" : "text-gray-900"}`}>
                        {shortText(trip?.title || "Untitled Trip", 28)}
                      </p>
                      {isHost ? (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 shrink-0">
                          Host 👑
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 shrink-0">
                          Member
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground truncate">
                      <MapPin className="w-3 h-3 text-primary shrink-0" />
                      <span className="truncate">{trip?.destination || "Destination"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
