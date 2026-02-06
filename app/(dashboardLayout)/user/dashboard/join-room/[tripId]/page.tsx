import getLogedInUser from "@/services/user/userManagement"
import RoomInbox from "./RoomInbox"
import ChatWindow from "@/components/modules/chat/ChatWindow"
import { getParticipantsForSpecificTrip } from "@/services/trip-participant/tripParticipantManagement"
import { getTravelPlanById } from "@/services/travelPlan/travelPlanManagement"

const JoinRoomPage = async({ params }: { params: { tripId: string } }) => {
    const { tripId } = await params
    const user = await getLogedInUser() || null

    const participants = await getParticipantsForSpecificTrip(tripId)
    const trip = await getTravelPlanById(tripId)

    return (
        <>
            {/* <RoomInbox tripId = {tripId} senderId = {user?.id}/> */}
            <ChatWindow trip = {trip} participants = {participants}/>
        </>
    )
}

export default JoinRoomPage