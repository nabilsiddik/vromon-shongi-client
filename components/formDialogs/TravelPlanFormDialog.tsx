"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { updateTravelPlan } from "@/services/travelPlan/travelPlanManagement";
import TravelPlanImageUploader from "../travelPlanImageUploader";
import { formatDate } from "@/utils/dateManagement";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  travelPlan: ITravelPlan | null;
}

export default function UpdateTravelPlanFormDialog({
  open,
  setOpen,
  travelPlan,
}: Props) {
  const [state, formAction, isPending] = useActionState(
    updateTravelPlan.bind(null, travelPlan?.id as string),
    null
  );

  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const prevSuccessRef = useRef<boolean | null>(null);
  const [travelPlanImage, setTravelPlanImage] = useState<File | null>(null);

  const [openStartDate, setOpenStartDate] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)


  const [startDate, setStartDate] = useState<Date | undefined>(
    travelPlan ? new Date(travelPlan.startDate) : undefined
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    travelPlan ? new Date(travelPlan.endDate) : undefined
  )

  useEffect(() => {
    if (state?.success && prevSuccessRef.current !== true) {
      startTransition(async () => {
        router.refresh()
      })
      toast.success("Travel plan updated successfully");
      setOpen(false);
    }

    if (state && !state.success && state.message) {
      toast.error(state.message);
    }

    prevSuccessRef.current = state?.success ?? null;
  }, [state, setOpen]);

  if (!travelPlan) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Update Travel Plan</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {/* hidden image input */}
          <input
            type="file"
            name="travelPlanImage"
            ref={(el) => {
              if (el && travelPlanImage) {
                const dt = new DataTransfer();
                dt.items.add(travelPlanImage);
                el.files = dt.files;
              }
            }}
            hidden
          />

          <FieldGroup>
            {/* Title */}
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                name="title"
                defaultValue={travelPlan.title}
                required
              />
            </Field>

            {/* Destination */}
            <Field>
              <FieldLabel>Destination</FieldLabel>
              <Input
                name="destination"
                defaultValue={travelPlan.destination}
                required
              />
            </Field>

            {/* Dates */}
            <input
              type="hidden"
              name="startDate"
              value={startDate ? startDate?.toISOString() : new Date(travelPlan.startDate).toISOString()}
            />

            <input
              type="hidden"
              name="endDate"
              value={endDate ? endDate?.toISOString() : new Date(travelPlan.endDate).toISOString()}
            />

            <div className="flex items-center gap-5">
              {/* start date  */}
              <div className="flex-1">
                <Field>
                  <FieldLabel htmlFor="date" className="px-1">
                    Start Date
                  </FieldLabel>
                  <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                    <PopoverTrigger asChild>
                      <Button
                        type='button'
                        variant="outline"
                        id="startDate"
                        className="w-full justify-between font-medium bg-gray-50 py-5 text-md"
                      >
                        {/* {travelPlan?.startDate ? formatDate(travelPlan.startDate) : "Select Start Date"} */}
                        {startDate ? formatDate(startDate) : formatDate(travelPlan?.startDate)}
                        {/* {startDate?.toISOString()} */}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setStartDate(date)
                          setOpenStartDate(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              </div>


              {/* End date  */}
              <div className="flex-1">
                <Field>
                  <FieldLabel htmlFor="date" className="px-1">
                  </FieldLabel>
                  <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                    <PopoverTrigger asChild>
                      <Button
                        type='button'
                        variant="outline"
                        id="endDate"
                        className="w-full justify-between font-medium bg-gray-50 py-5 text-md"
                      >
                        {/* {travelPlan?.endDate ? formatDate(travelPlan?.endDate) : "Select End Date"} */}
                        {endDate ? formatDate(endDate) : formatDate(travelPlan?.endDate)}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setEndDate(date)
                          setOpenEndDate(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              </div>
            </div>

            {/* Budget range */}
            <div className="flex items-center gap-5">
              <Field className="flex-1">
                <FieldLabel>Budget From</FieldLabel>
                <Input
                  name="budgetFrom"
                  defaultValue={travelPlan.budgetFrom}
                />
              </Field>

              <Field className="flex-1">
                <FieldLabel>Budget To</FieldLabel>
                <Input
                  name="budgetTo"
                  defaultValue={travelPlan.budgetTo}
                />
              </Field>
            </div>

            {/* Travel Type */}
            <Field>
              <FieldLabel>Travel Type</FieldLabel>
              <Select
                name="travelType"
                defaultValue={travelPlan.travelType}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOLO">SOLO</SelectItem>
                  <SelectItem value="FAMILY">FAMILY</SelectItem>
                  <SelectItem value="FRIENDS">FRIENDS</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                name="description"
                defaultValue={travelPlan.description}
              />
            </Field>

            {/* Image */}
            <TravelPlanImageUploader
              travelPlanImage={travelPlanImage}
              setTravelPlanImage={setTravelPlanImage}
            />

            <Button type='submit' disabled={isPending}>
              {isPending ? "Updating..." : "Update Plan"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
