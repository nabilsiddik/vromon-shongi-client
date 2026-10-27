import ChatSidebar from "@/components/modules/chat/ChatSidebar";
import JoinRoomResponsiveWrapper from "@/components/modules/chat/JoinRoomResponsiveWrapper";

export const dynamic = "force-dynamic";

export default function JoinRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JoinRoomResponsiveWrapper sidebar={<ChatSidebar />}>
      {children}
    </JoinRoomResponsiveWrapper>
  );
}