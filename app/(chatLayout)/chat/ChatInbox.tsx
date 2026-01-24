'use client'

import { connectWS } from "@/config/websocket/websocket"
import { useEffect, useRef } from "react"

const ChatInbox = () => {

    const socketRef = useRef<any>(null)

    useEffect(() => {
        socketRef.current = connectWS()
    }, [])

  return (
    <div>ChatInbox</div>
  )
}

export default ChatInbox