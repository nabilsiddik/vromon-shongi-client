"use client";

import ManagementTable from "@/components/shared/tables/ManagementTable";
import { IUser } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserDeletionAlertModal from "@/components/Modals/UserDeletionAlertModal";
import { tripRequestColumns } from "./TripRequestColumns";

const TripRequestTable = ({ participantReq }: {participantReq: any}) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  // Open user deletion confirmation modal
  const openDeleteModal = (user: IUser) => {
    setOpen(true);
    setUser(user);
  };

  return (
    <>
      <UserDeletionAlertModal open={open} setOpen={setOpen} user={user} />
      <ManagementTable
        data={participantReq}
        columns={tripRequestColumns}
        emptyMessage="No Request found"
        getRowKey={(user) => user?.id}
        onDelete={openDeleteModal}
      />
    </>
  );
};

export default TripRequestTable;
