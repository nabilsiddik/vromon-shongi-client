import MessageBubble from "./MessageBubble";
import { MessageSquareDashed } from "lucide-react";

interface MessageListProps {
  messages: any[];
  typingUsers: string[];
  currentUserId: string;
  tripHostId?: string;
}

export default function MessageList({
  messages,
  typingUsers,
  currentUserId,
  tripHostId,
}: MessageListProps) {
  return (
    <div className="relative flex-1 px-4 sm:px-6 py-6 min-h-[45vh]">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <MessageSquareDashed className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-gray-800">No messages in this trip room yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Start the conversation! Coordinate dates, packing, or meeting spots with your fellow travel companions.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {messages.map((msg: any) => (
            <MessageBubble
              key={msg.id || Math.random().toString()}
              message={msg}
              currentUserId={currentUserId}
              tripHostId={tripHostId}
            />
          ))}
        </div>
      )}

      {typingUsers?.length > 0 && (
        <div className="sticky bottom-2 left-2 bg-white/90 backdrop-blur-sm border px-3 py-1 rounded-full text-xs text-muted-foreground shadow-sm inline-flex items-center gap-1.5 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-medium text-gray-700">
            {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
          </span>
        </div>
      )}
    </div>
  );
}
