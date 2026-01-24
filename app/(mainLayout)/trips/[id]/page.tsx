import TripDetails from "@/components/modules/trips/TripDetails";
import { connectWS } from "@/config/websocket/websocket";
import { serverFetch } from "@/lib/serverFetch";
import { getParticipantsForSpecificTrip } from "@/services/trip-participant/tripParticipantManagement";
import getLogedInUser from "@/services/user/userManagement";

interface Props {
  params: { id: string };
}

export default async function TripDetailsPage({ params }: Props) {
  const { id } = await params;
  const logedInUser = await getLogedInUser();

  const socket = await connectWS()

  console.log(socket);

  const res = await serverFetch.get(`/travel-plan/${id}`, {
    cache: "no-store",
  });
  const trip = await res.json().then((data) => data?.data);

  if (!trip) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h2 className="text-xl font-semibold">Travel Plan Not Found</h2>
        <p className="text-gray-500">This travel plan may have been deleted.</p>
      </div>
    );
  }

  const allParticipants = await getParticipantsForSpecificTrip(trip?.id)


  return <TripDetails trip={trip} participants = {allParticipants} logedInUser = {logedInUser} />;
}
