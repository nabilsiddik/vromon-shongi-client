import { messages } from "@/data/messages";
import MessageBubble from "./MessageBubble";

export default function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.map(msg => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}