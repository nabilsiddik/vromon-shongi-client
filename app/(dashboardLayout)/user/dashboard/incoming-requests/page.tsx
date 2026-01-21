import TripRequestTable from "@/components/modules/trips/trip-request/TripRequestTable";
import { myParticipantRequest } from "@/services/trip-participant/tripParticipantManagement"

const IncommingRequests = async() => {

  const participantRequsts = await myParticipantRequest() || []
  return (
    <div>
      <TripRequestTable participantReq = {participantRequsts}/>
    </div>
  )
}

export default IncommingRequests