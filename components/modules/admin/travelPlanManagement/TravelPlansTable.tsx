"use client";

import ManagementTable from "@/components/shared/tables/ManagementTable";
import { travelPlansColumns } from "./travelPlansColumns";
import { ITravelPlan } from "@/types/travelPlan.interface";
import TravelPlanFormDialog from "@/components/formDialogs/TravelPlanFormDialog";
import { useState } from "react";
import { toast } from "sonner";
import { updateTravelPlan } from "@/services/travelPlan/travelPlanManagement";

const TravelPlansTable = ({ travelPlans }: any) => {

  const [open, setOpen] = useState<boolean>(false)
  const [selectedPlan, setSelectedPlan] = useState<ITravelPlan | null>(null)

  const onSuccess = () => {
    toast.success('Travel plan updated successfully.')
  }

  const onClose = () => {
    setOpen(false)
  }

  // On travel plan view
  const handleTravelPlanView = (travelPlan: ITravelPlan) => {
    console.log(travelPlan, 'hey kkkkk')
  }

  // On travel plan view
  const handleTravelPlanEdit = (travelPlan: ITravelPlan) => {
    setOpen(true)
    setSelectedPlan(travelPlan)
  }

  // On travel plan view
  const handleTravelPlanDelete = () => {

  }

  // Handle travel plan update
  // const handleTravelPlanUpdate = async () => {
  //   if (!selectedPlan) {
  //     return;
  //   }
  //   const result = await updateTravelPlan(selectedPlan.id, selectedPlan)

  //   if (result.success) {
  //     toast.success("Travel plan updated successfully.");
  //     onClose()
  //   } else {
  //     toast.error(result.message || "Failed to update travel plan.")
  //   }
  // }


  return (
    <>
      <TravelPlanFormDialog open={open} setOpen={setOpen} travelPlan={selectedPlan}  onSuccess={onSuccess} onClose={onClose} dialogTitle="Update Travel Plan" />
      <ManagementTable
        data={travelPlans}
        columns={travelPlansColumns}
        emptyMessage="No travel plan found"
        getRowKey={(travelPlan) => travelPlan?.id}
        onView={handleTravelPlanView}
        onEdit={handleTravelPlanEdit}
        onDelete={handleTravelPlanDelete}
      />
    </>
  );
};

export default TravelPlansTable;