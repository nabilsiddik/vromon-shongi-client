'use client'

import React from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  value: string;
  onTyping: (val: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function MessageInput({
  value,
  onTyping,
  onSend,
  disabled = false,
}: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      className="flex items-center gap-2 sm:gap-3 w-full"
    >
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onTyping(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message... (Press Enter to send)"
        className="flex-1 rounded-full border border-gray-200 bg-gray-50/80 px-4 py-2.5 outline-none text-sm font-normal text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-xs"
      />
      <button
        type="submit"
        disabled={disabled || !value?.trim()}
        className="p-2.5 rounded-full bg-primary text-white hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs shrink-0 flex items-center justify-center"
        title="Send message (Enter)"
      >
        <Send size={18} />
      </button>
    </form>
  );
}