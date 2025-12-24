"use client";

import ManagementTable from "@/components/shared/tables/ManagementTable";
import { travelPlansColumns } from "./travelPlansColumns";
import { ITravelPlan } from "@/types/travelPlan.interface";
import TravelPlanFormDialog from "@/components/formDialogs/TravelPlanFormDialog";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { deleteTravelPlan } from "@/services/travelPlan/travelPlanManagement";

const TravelPlansTable = ({ travelPlans }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedPlan, setSelectedPlan] = useState<ITravelPlan | null>(null);

  // On travel plan view
  const handleTravelPlanView = (travelPlan: ITravelPlan) => {
    redirect(`/travel-plans/${travelPlan?.id}`);
  };

  const handleEditTravelPlan = async (travelPlan: ITravelPlan) => {
    setSelectedPlan(travelPlan);
    setOpen(true);
  };

  // On travel plan delete
  const handleTravelPlanDelete = async (travelPlan: ITravelPlan) => {
    try {
      const result = await deleteTravelPlan(travelPlan?.id);

      if (result?.success) {
        toast.success("Travel plan deleted.");
        startTransition(() => {
          router.refresh();
        });
      } else {
        toast.error("Something went wrong while deleting.");
      }
    } catch (error) {
      console.error("Error deleting the travel plan:", error);
      toast.error("Something went wrong while deleting.");
    }
  };

  return (
    <>
      <TravelPlanFormDialog
        open={open}
        setOpen={setOpen}
        travelPlan={selectedPlan}
        dialogTitle="Update Travel Plan"
      />
      <ManagementTable
        data={travelPlans}
        columns={travelPlansColumns}
        emptyMessage="No travel plan found"
        getRowKey={(travelPlan) => travelPlan?.id}
        onView={handleTravelPlanView}
        onDelete={handleTravelPlanDelete}
        onEdit={handleEditTravelPlan}
      />
    </>
  );
};

export default TravelPlansTable;
