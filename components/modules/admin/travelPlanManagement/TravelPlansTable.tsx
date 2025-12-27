"use client";

import ManagementTable from "@/components/shared/tables/ManagementTable";
import { travelPlansColumns } from "./travelPlansColumns";
import { ITravelPlan } from "@/types/travelPlan.interface";
import TravelPlanFormDialog from "@/components/formDialogs/TravelPlanFormDialog";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteTravelPlan } from "@/services/travelPlan/travelPlanManagement";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const TravelPlansTable = ({ travelPlans }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedPlan, setSelectedPlan] = useState<ITravelPlan | null>(null);

  // On travel plan view
  const handleTravelPlanView = (travelPlan: ITravelPlan) => {
    router.push(`/admin/dashboard/travel-plans/${travelPlan?.id}`);
  };

  const handleEditTravelPlan = async (travelPlan: ITravelPlan) => {
    setSelectedPlan(travelPlan);
    setOpen(true);
  };

  const openDeleteAlertDialog = (travelPlan: ITravelPlan) => {
    setOpenDeleteModal(true);
    setSelectedPlan(travelPlan);
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
        onDelete={openDeleteAlertDialog}
        onEdit={handleEditTravelPlan}
      />

      {/* my plan deleting alert dialog  */}
      <AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              travel plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                handleTravelPlanDelete(selectedPlan as ITravelPlan)
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TravelPlansTable;
