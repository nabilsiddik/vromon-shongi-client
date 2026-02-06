import ChatSidebar from "@/components/modules/chat/ChatSidebar"
import ChatWindow from "@/components/modules/chat/ChatWindow"

const JoinRoomLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className="min-h-[84vh] flex border rounded-lg text-white ">
      <ChatSidebar />
      {children}
    </div>
  )
}

export default JoinRoomLayout