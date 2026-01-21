"use client";

import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/tables/ManagementTable";
import { IUser } from "@/types/user.interface";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { DateCell } from "@/components/shared/cell/DateCell";
import { BadgeCell } from "@/components/shared/cell/BadgeCell";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { shortText } from "@/utils/shortText";

export const travelPlansColumns: Column<any>[] = [
  {
    header: "Image",
    accessor: (travelPlan) => (
      <Image
        className="rounded-lg"
        src={travelPlan?.planImages[0] || "https://placehold.net/400x400.png"}
        width={50}
        height={50}
        alt="travel plan image"
      />
    ),
    sortKey: "name",
  },
  {
    header: "Title",
    accessor: (travelPlan) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">{shortText(travelPlan?.title, 18)}</span>
        <span className="text-sm flex items-center gap-1"><MapPin width={15}/> {travelPlan?.destination}</span>
      </div>
    ),
  },
  {
    header: "Start Date",
    accessor: (travelPlan) => <DateCell date={travelPlan.startDate} />,
  },
  {
    header: "End Date",
    accessor: (travelPlan) => <DateCell date={travelPlan.endDate} />,
  },
  {
    header: "Travel Type",
    accessor: (travelPlan) => <BadgeCell badgeText={travelPlan.travelType} />,
  },
  {
    header: "Budget Range",
    accessor: (travelPlan) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">{`$${travelPlan?.budgetFrom} - $${travelPlan?.budgetFrom}`}</span>
      </div>
    ),
    sortKey: "createdAt",
  },
  {
    header: "Created",
    accessor: (travelPlan) => <DateCell date={travelPlan.createdAt} />,
    sortKey: "createdAt",
  },
];
