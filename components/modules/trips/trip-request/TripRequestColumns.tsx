/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/tables/ManagementTable";
import { IUser } from "@/types/user.interface";
import { Star } from "lucide-react";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { DateCell } from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateManagement";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ManageTripRequestSelectField from "@/components/shared/ManageTripRequestSelectField";

export const tripRequestColumns: Column<any>[] = [
  {
    header: "Participant",
    accessor: ({user}) => (
      <UserInfoCell
        userId = {user?.id}
        name={`${user?.firstName} ${user?.lastName}`}
        email={user?.email}
        photo={user?.profileImage as string}
        // gender={user?.gender}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Request Date",
    accessor: (request) => (
      <div className="flex flex-col">
        <span className="text-sm">{formatDate(request?.createdAt)}</span>
      </div>
    ),
  },
  {
    header: "Requested Trip",
    accessor: ({trip}) => (
      <div className="flex flex-col">
        <Link target="_blank" href={`/trips/${trip?.id}`}>
          <Button className="cursor-pointer">View Trip</Button>
        </Link>
      </div>
    ),
  },
  {
    header: "Manage",
    accessor: (participantReq) => (
      <ManageTripRequestSelectField participantReq={participantReq}/>
    ),
  }
];
