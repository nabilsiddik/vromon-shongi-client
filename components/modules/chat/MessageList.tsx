import MessageBubble from "./MessageBubble";

export default function MessageList({messages}: {messages: any}) {

  console.log(messages, 'messages');

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.map((msg: any) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}