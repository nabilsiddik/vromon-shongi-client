'use client'
import { Send } from "lucide-react";

export default function MessageInput({onTyping, onSend}: {onTyping: (e: any) => void, onSend: () => void}) {
  return (
    <div className="border-t border-gray-200 p-4 flex items-center gap-3">
      <input
        onChange={(e) => onTyping(e.target.value)}
        placeholder="Type..."
        className="flex-1 rounded-full border border-gray-300 px-4 py-2 outline-none text-sm font-medium text-gray-700"
      />
      <div className="cursor-pointer">
        <Send onClick={() => onSend()} size={30} className="text-gray-700"/>
      </div>
    </div>
  );
}