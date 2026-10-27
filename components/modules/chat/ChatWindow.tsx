"use client";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/config/websocket/websocket";

export default function ChatWindow({
  trip,
  participants,
  user,
  messages,
}: {
  trip: any;
  participants: any;
  user: any;
  messages: any;
}) {
  const [messagesList, setMessagesList] = useState<any[]>(messages);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const socket = getSocket();

  useEffect(() => {
    if (Array.isArray(messages)) {
      setMessagesList(messages);
    }
  }, [messages]);

  useEffect(() => {
    socket.connect();

    // send join room event
    socket.emit("join-room", { tripId: trip?.id, userId: user?.id });

    // listen new messages and set message
    socket.on("new-message", (message) => {
      setMessagesList((prev) => [...prev, message]);
    });

    // Listen typing users and set typing users
    socket.on("user-typing", (userName) => {
      setTypingUsers((prev) =>
        prev.includes(userName) ? prev : [...prev, userName],
      );
    });

    socket.on("user-stop-typing", (userName) => {
      setTypingUsers((prev) => prev.filter((user) => user !== userName));
    });

    return () => {
      socket.off("new-message");
      socket.off("user-typing");
      socket.off("user-stop-typing");
      socket.emit("leave-room", { tripId: trip?.id });
      socket.disconnect();
    };
  }, [trip?.id, user?.id]);

  // send message
  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("send-message", {
      tripId: trip?.id,
      senderId: user?.id,
      content: input,
    });

    setInput("");
    socket.emit("stop-typing", { tripId: trip?.id });
  };

  const handleTyping = (value: string) => {
    setInput(value);
    socket.emit("typing", { tripId: trip?.id, userName: user?.firstName });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stop-typing", {
        tripId: trip?.id,
        userName: user?.firstName,
      });
    }, 1000);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);

  return (
    <div className="flex flex-col flex-1 justify-between relative bg-white overflow-hidden h-full w-full">
      <div className="sticky top-0 bg-white z-10 border-b">
        <ChatHeader trip={trip} participants={participants} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <MessageList
          messages={messagesList}
          typingUsers={typingUsers}
          currentUserId={user?.id}
          tripHostId={trip?.userId}
        />
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-white z-10 border-t p-3 sm:p-4">
        <MessageInput value={input} onTyping={handleTyping} onSend={sendMessage} />
      </div>
    </div>
  );
}
