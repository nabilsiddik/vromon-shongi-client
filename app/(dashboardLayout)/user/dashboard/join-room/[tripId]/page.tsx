import getLogedInUser from "@/services/user/userManagement";
import ChatWindow from "@/components/modules/chat/ChatWindow";
import { getParticipantsForSpecificTrip } from "@/services/trip-participant/tripParticipantManagement";
import { getTravelPlanById } from "@/services/travelPlan/travelPlanManagement";
import { getChatRoom } from "@/services/chat-room/chatRoomManagement";
import { getChatMessagesForSpecificRoom } from "@/services/chat-message/chatMessageManagement";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const JoinRoomPage = async ({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) => {
  const { tripId } = await params;
  const user = (await getLogedInUser()) || null;

  const [participantsRes, tripRes, chatRoomRes, messagesRes] =
    await Promise.allSettled([
      getParticipantsForSpecificTrip(tripId),
      getTravelPlanById(tripId),
      getChatRoom(tripId),
      getChatMessagesForSpecificRoom(tripId),
    ]);

  const trip = tripRes.status === "fulfilled" ? tripRes.value : null;
  const participants = participantsRes.status === "fulfilled" && Array.isArray(participantsRes.value) ? participantsRes.value : [];
  const chatRoom = chatRoomRes.status === "fulfilled" ? chatRoomRes.value : null;
  const messages = messagesRes.status === "fulfilled" && Array.isArray(messagesRes.value) ? messagesRes.value : [];

  // Check if chat room access was denied (e.g. not host and not approved)
  if (!chatRoom || chatRoom?.success === false) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white border rounded-2xl p-8 max-w-md w-full shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Access Restricted</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            You must be the host of this trip or an approved participant to access the live group chat.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <Link href="/user/dashboard/outgoing-requests" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">
                View Request Status
              </Button>
            </Link>
            <Link href="/user/dashboard" className="flex-1">
              <Button size="sm" className="w-full text-xs flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ChatWindow
      trip={trip}
      participants={participants}
      user={user}
      messages={messages}
    />
  );
};

export default JoinRoomPage;
