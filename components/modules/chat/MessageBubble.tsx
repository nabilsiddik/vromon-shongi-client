import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface MessageBubbleProps {
  message: any;
  currentUserId: string;
  tripHostId?: string;
}

export default function MessageBubble({ message, currentUserId, tripHostId }: MessageBubbleProps) {
  const senderId = message.senderId || message.sender?.id;
  const isMe = senderId === currentUserId;
  const isHost = senderId === tripHostId;
  const sender = message.sender;

  const senderName = sender
    ? `${sender.firstName || ""} ${sender.lastName || ""}`.trim()
    : "Traveler";

  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className={`flex items-end gap-2.5 my-3 ${isMe ? "justify-end" : "justify-start"}`}>
      {!isMe && (
        <Avatar className="w-8 h-8 rounded-full border shrink-0">
          {sender?.profileImage ? (
            <AvatarImage
              src={sender.profileImage}
              alt={senderName}
              className="object-cover w-full h-full"
            />
          ) : null}
          <AvatarFallback className="w-full h-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs">
            {sender?.firstName ? sender.firstName[0].toUpperCase() : <User className="size-3.5" />}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col max-w-[82%] sm:max-w-md ${isMe ? "items-end" : "items-start"}`}>
        {!isMe && (
          <span className="text-[11px] font-semibold text-gray-600 mb-1 flex items-center gap-1">
            {senderName}
            {isHost && (
              <span className="bg-amber-100 text-amber-900 text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                Host 👑
              </span>
            )}
          </span>
        )}

        <div
          className={`rounded-2xl px-4 py-2.5 text-sm shadow-2xs leading-relaxed break-words max-w-full ${
            isMe
              ? "bg-primary text-white rounded-br-xs"
              : "bg-slate-100 text-slate-900 border border-slate-200/80 rounded-bl-xs"
          }`}
        >
          {message?.content}
        </div>

        {formattedTime && (
          <span className="text-[10px] text-muted-foreground mt-0.5 px-1">
            {formattedTime}
          </span>
        )}
      </div>
    </div>
  );
}