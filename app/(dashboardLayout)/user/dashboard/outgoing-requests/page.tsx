import { getMyOutgoingTripRequests } from "@/services/trip-participant/tripParticipantManagement";
import OutgoingRequestsTable from "./OutgoingRequestsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Send } from "lucide-react";

export const dynamic = "force-dynamic";

const OutgoingRequestsPage = async () => {
  const requests = (await getMyOutgoingTripRequests()) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Send className="w-6 h-6 text-primary" /> My Outgoing Trip Requests
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track all the travel plans you have requested to join and their approval status.
          </p>
        </div>
        <Link href="/trips">
          <Button className="flex items-center gap-2 cursor-pointer">
            <Compass className="w-4 h-4" /> Explore Trips
          </Button>
        </Link>
      </div>

      <OutgoingRequestsTable requests={requests} />
    </div>
  );
};

export default OutgoingRequestsPage;
