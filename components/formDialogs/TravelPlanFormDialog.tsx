"use client";

import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { ITravelPlan } from "@/types/travelPlan.interface";
import { updateTravelPlan } from "@/services/travelPlan/travelPlanManagement";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import TravelPlanImageUploader from "../travelPlanImageUploader";

interface TravelPlanFormDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  travelPlan: ITravelPlan | null;
  dialogTitle: string;
}

export default function TravelPlanFormDialog({
  open,
  setOpen,
  travelPlan,
  dialogTitle,
}: TravelPlanFormDialogProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, formAction, isPending] = useActionState(
    updateTravelPlan.bind(null, travelPlan?.id as string),
    null
  );
  const [travelPlanImage, setTravelPlanImage] = useState<File | null>(null);
  const [travelType, setTravelType] = useState(travelPlan?.travelType);

  useEffect(() => {
    if (travelPlan?.travelType) {
      setTravelType(travelPlan.travelType);
    }
  }, [travelPlan]);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state?.success) {
      toast.success("Travel plan updated successfully.");
      setOpen(false);
      startTransition(() => {
        router.refresh();
      });
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] flex flex-col p-10">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {(dialogTitle && dialogTitle) || "Modal Dialog"}
          </DialogTitle>
        </DialogHeader>

        {travelPlan && (
          <form
            action={formAction}
            className="space-y-4 h-full overflow-y-auto"
          >
            {/* hidden input file for travel plan  */}
            <input
              type="file"
              name="travelPlanImage"
              ref={(el) => {
                if (el && travelPlanImage) {
                  const dataTransfer = new DataTransfer();
                  dataTransfer.items.add(travelPlanImage);
                  el.files = dataTransfer.files;
                }
              }}
              hidden
            />

            {/* hidden input for travel type  */}
            <input type="hidden" name="travelType" value={travelType} />

            {/* Destination */}
            <Input
              name="destination"
              defaultValue={travelPlan?.destination}
              required
            />

            {/* Start Date */}
            <Input
              type="date"
              name="startDate"
              defaultValue={
                new Date(travelPlan.startDate).toISOString().split("T")[0]
              }
              required
            />

            {/* End Date */}
            <Input
              type="date"
              name="endDate"
              defaultValue={
                new Date(travelPlan.endDate).toISOString().split("T")[0]
              }
              required
            />

            {/* Budget */}
            <Input
              name="budgetRange"
              defaultValue={travelPlan?.budgetRange}
              required
            />

            {/* Travel Type */}
            <Select value={travelType} onValueChange={setTravelType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Travel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOLO">Solo</SelectItem>
                <SelectItem value="FAMILY">Family</SelectItem>
                <SelectItem value="FRIENDS">Friends</SelectItem>
              </SelectContent>
            </Select>

            {/* Description */}
            <Textarea
              name="description"
              defaultValue={travelPlan?.description}
            />

            <div>
              <TravelPlanImageUploader
                setTravelPlanImage={setTravelPlanImage}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
