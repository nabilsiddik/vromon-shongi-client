export default function MessageBubble({ message }: any) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md rounded-2xl px-4 py-3 text-md ${
          isMe
            ? "bg-blue-600 text-white"
            : "bg-neutral-800 text-neutral-200"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}