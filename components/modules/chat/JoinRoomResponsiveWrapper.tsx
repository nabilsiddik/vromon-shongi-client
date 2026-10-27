'use client'

import React from "react";
import { usePathname } from "next/navigation";

export default function JoinRoomResponsiveWrapper({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSpecificRoom = pathname.includes("/join-room/") && pathname.split("/join-room/")[1]?.length > 0;

  return (
    <div className="min-h-[84vh] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row w-full text-foreground">
      {/* Sidebar - visible on desktop always; on mobile only when no specific room is open */}
      <aside
        className={`w-full md:w-80 lg:w-88 md:border-r border-gray-200 shrink-0 h-[84vh] overflow-y-auto ${
          isSpecificRoom ? "hidden md:block" : "block"
        }`}
      >
        {sidebar}
      </aside>

      {/* Main chat window / empty state - on mobile only visible when a specific room is open */}
      <main
        className={`flex-1 flex flex-col min-w-0 h-[84vh] overflow-hidden ${
          isSpecificRoom ? "flex w-full" : "hidden md:flex"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
