import getLogedInUser from "@/services/user/userManagement"
import RoomInbox from "./RoomInbox"

const JoinRoomPage = async({ params }: { params: { tripId: string } }) => {
    const { tripId } = await params
    const user = await getLogedInUser() || null

    return (
        <>
            <RoomInbox tripId = {tripId} senderId = {user?.id}/>
        </>
    )
}

export default JoinRoomPage