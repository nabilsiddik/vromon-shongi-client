import { Send } from "lucide-react";

export default function MessageInput() {
  return (
    <div className="border-t border-gray-200 p-4 flex items-center gap-3">
      <input
        placeholder="Type..."
        className="flex-1 rounded-full border border-gray-300 px-4 py-2 outline-none text-sm font-medium text-gray-700"
      />
      <div className="cursor-pointer">
        <Send size={30} className="text-gray-700"/>
      </div>
    </div>
  );
}