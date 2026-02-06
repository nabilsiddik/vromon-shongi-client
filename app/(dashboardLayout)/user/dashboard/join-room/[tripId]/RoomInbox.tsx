'use client'

import { getSocket } from "@/config/websocket/websocket"
import { useEffect, useRef, useState } from "react"

const RoomInbox = ({tripId, senderId}: {tripId: string, senderId: string}) => {

    const [messages, setMessages] = useState<any[]>([])
    const [typingUsers, setTypingUsers] = useState<string[]>([])
    const [input, setInput] = useState("")

    const typingTimeout = useRef<NodeJS.Timeout | null>(null)
    const socket = getSocket()

    useEffect(() => {
        socket.connect()

        // send join room event 
        socket.emit('join-room', { tripId })

        // listen new messages and set message
        socket.on('new-message', (message) => {
            setMessages((prev) => [...prev, message])
        })

        // Listen typing users and set typing users
        socket.on('user-typing', (userName) => {
            setTypingUsers((prev) =>
                prev.includes(userName) ? prev : [...prev, userName]
            )
        })

        socket.on('user-stop-typing', (userName) => {
            setTypingUsers((prev) => prev.filter((user) => user !== userName))
        })

        return () => {
            socket.emit("leave-room", { tripId })
            socket.disconnect()
        }

    }, [tripId])

    // send message
    const sendMessage = () => {
        if (!input.trim()) return

        socket.emit("send-message", {
            tripId,
            content: input,
        })

        setInput("")
        socket.emit("stop-typing", { tripId })
    }

    const handleTyping = (value: string) => {
        setInput(value)
        socket.emit("typing", { tripId })

        if (typingTimeout.current) clearTimeout(typingTimeout.current)

        typingTimeout.current = setTimeout(() => {
            socket.emit("stop-typing", { tripId })
        }, 1000)
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Trip Chat Room</h1>

            <div className="border rounded p-3 h-[400px] overflow-y-auto mb-2">
                {messages.map((msg, i) => (
                    <div key={i}>
                        <strong>{msg.sender.name}:</strong> {msg.content}
                    </div>
                ))}
            </div>

            {typingUsers.length > 0 && (
                <p className="text-sm text-gray-500 mb-1">
                    {typingUsers.join(", ")} typing...
                </p>
            )}

            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => handleTyping(e.target.value)}
                    className="border flex-1 p-2 rounded"
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default RoomInbox