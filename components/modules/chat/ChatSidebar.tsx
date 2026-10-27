import { getAllParticipationsOfAnUser } from "@/services/trip-participant/tripParticipantManagement";
import ChatSidebarList from "./ChatSidebarList";

export default async function ChatSidebar() {
  const allParticipations = await getAllParticipationsOfAnUser();
  const safeList = Array.isArray(allParticipations) ? allParticipations : [];

  return (
    <div className="w-full h-full">
      <ChatSidebarList participations={safeList} />
    </div>
  );
}