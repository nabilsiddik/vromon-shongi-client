"use client";

import ManagementTable, { Column } from "@/components/shared/tables/ManagementTable";
import { formatDate } from "@/utils/dateManagement";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare, MapPin, ExternalLink, Calendar } from "lucide-react";
import Image from "next/image";

interface OutgoingRequestsTableProps {
  requests: any[];
}

export default function OutgoingRequestsTable({ requests }: OutgoingRequestsTableProps) {
  const columns: Column<any>[] = [
    {
      header: "Trip",
      accessor: (req) => {
        const trip = req?.trip;
        return (
          <div className="flex items-center gap-3">
            {trip?.planImages?.[0] ? (
              <Image
                src={trip.planImages[0]}
                alt={trip.title || "trip"}
                width={48}
                height={48}
                className="w-12 h-12 rounded-lg object-cover border"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                Trip
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-sm line-clamp-1">{trip?.title || "Untitled Trip"}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-primary" /> {trip?.destination || "Unknown"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Host",
      accessor: (req) => {
        const host = req?.trip?.user;
        return (
          <UserInfoCell
            userId={host?.id}
            name={`${host?.firstName || ""} ${host?.lastName || ""}`.trim() || "Host"}
            email={host?.email || ""}
            photo={host?.profileImage}
          />
        );
      },
    },
    {
      header: "Dates",
      accessor: (req) => {
        const trip = req?.trip;
        if (!trip?.startDate) return <span className="text-xs text-muted-foreground">N/A</span>;
        return (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
          </div>
        );
      },
    },
    {
      header: "Requested On",
      accessor: (req) => (
        <span className="text-xs text-muted-foreground">{formatDate(req.createdAt)}</span>
      ),
    },
    {
      header: "Status",
      accessor: (req) => {
        const status = req.status;
        if (status === "APPROVED") {
          return (
            <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 border-emerald-300">
              Approved
            </Badge>
          );
        }
        if (status === "PENDING") {
          return (
            <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/20 border-amber-300">
              Pending
            </Badge>
          );
        }
        if (status === "REJECTED") {
          return (
            <Badge className="bg-rose-500/15 text-rose-700 hover:bg-rose-500/20 border-rose-300">
              Rejected
            </Badge>
          );
        }
        return <Badge variant="outline">{status}</Badge>;
      },
    },
    {
      header: "Action",
      accessor: (req) => {
        const isApproved = req.status === "APPROVED";
        return (
          <div className="flex items-center gap-2">
            {isApproved ? (
              <Link href={`/user/dashboard/join-room/${req?.trip?.id}`}>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs flex items-center gap-1.5 h-8">
                  <MessageSquare className="w-3.5 h-3.5" /> Chat Room
                </Button>
              </Link>
            ) : (
              <span className="text-xs text-muted-foreground italic">Awaiting Approval</span>
            )}
            <Link target="_blank" href={`/trips/${req?.trip?.id}`}>
              <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground">
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <ManagementTable
      data={requests}
      columns={columns}
      emptyMessage="No outgoing trip requests yet. Start exploring trips and click 'Join Trip' to connect with buddies!"
      getRowKey={(req) => req.id}
    />
  );
}
