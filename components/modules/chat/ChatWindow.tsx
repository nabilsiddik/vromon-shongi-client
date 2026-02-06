import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default async function ChatWindow({trip, participants}: {trip: any, participants: any}) {

  console.log(participants, 'ddf');

  return (
    <div className="flex flex-col flex-1 justify-between relative">
      <div className="sticky top-0 bg-white z-10 h-auto">
        <ChatHeader trip = {trip} participants = {participants}/>
      </div>
      <div className="max-h-[67vh] overflow-y-auto">
        <MessageList />
      </div>
      <div className="sticky bottom-0 bg-white z-10 h-[8vh]">
        <MessageInput />
      </div>
    </div>
  );
}