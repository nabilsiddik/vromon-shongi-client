import { MessageSquare, Users } from "lucide-react";

export default function JoinRoomIndexPage() {
  return (
    <div className="flex-1 hidden md:flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 rounded-r-xl min-h-[70vh]">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-3">
        <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <MessageSquare className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Your Trip Conversations</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Select any trip conversation from the sidebar to chat in real-time with your fellow travel companions and hosts.
        </p>
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-primary font-medium">
          <Users className="w-4 h-4" /> Live Group Chat & Coordination
        </div>
      </div>
    </div>
  );
}