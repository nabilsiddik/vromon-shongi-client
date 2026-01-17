"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useActionState, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "../InputFieldError";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { IInputErrorState } from "@/utils/getInputFieldError";
import { createTravelPlan } from "@/services/travelPlan/travelPlanManagement";
import TravelPlanImageUploader from "../travelPlanImageUploader";

export function TravelPlanForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction, isPending] = useActionState(createTravelPlan, null);
  const [travelPlanImage, setTravelPlanImage] = useState<File | null>(null);
  const travelTypes = ["SOLO", "FAMILY", "FRIENDS"];
  const [resetImage, setResetImage] = useState(false);
  const prevSuccessRef = useRef<boolean | null>(null);

useEffect(() => {
  if (state?.success && prevSuccessRef.current !== true) {
    toast.success("Travel plan created successfully!");
    setTravelPlanImage(null);
    setResetImage((prev) => !prev);
  }

  if (state && !state.success && state.message) {
    toast.error(state.message);
  }

  prevSuccessRef.current = state?.success ?? null;
}, [state]);

  return (
    <form
      noValidate
      action={formAction}
      className={cn("flex flex-col bg-white py-10 px-10 rounded-md max-w-4xl", className)}
      {...props}
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

      <FieldGroup>
        {/* title  */}
        <Field>
          <FieldLabel htmlFor="title">Title <span className="text-red-500">*</span></FieldLabel>
          <Input
            className="font-medium bg-gray-50"
            name="title"
            id="title"
            type="text"
            placeholder="Title of your plan"
          />
          <InputFieldError
            field="destination"
            state={state as IInputErrorState}
          />
        </Field>


        {/* Destination */}
        <Field>
          <FieldLabel htmlFor="destination">Destination <span className="text-red-500">*</span></FieldLabel>
          <Input
            name="destination"
            id="destination"
            type="text"
            placeholder="Destination Location"
          />
          <InputFieldError
            field="destination"
            state={state as IInputErrorState}
          />
        </Field>

        {/* Start Date */}
        <Field>
          <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
          <Input name="startDate" id="startDate" type="date" />
          <InputFieldError
            field="startDate"
            state={state as IInputErrorState}
          />
        </Field>

        {/* End Date */}
        <Field>
          <FieldLabel htmlFor="endDate">End Date</FieldLabel>
          <Input name="endDate" id="endDate" type="date" />
          <InputFieldError field="endDate" state={state as IInputErrorState} />
        </Field>

        {/* Budget Range */}
        <Field>
          <FieldLabel htmlFor="budgetRange">Budget Range (optional)</FieldLabel>
          <Input
            name="budgetRange"
            id="budgetRange"
            placeholder="e.g. 5,000 - 10,000 BDT"
          />
          <InputFieldError
            field="budgetRange"
            state={state as IInputErrorState}
          />
        </Field>

        {/* Travel Type */}
        <Field>
          <FieldLabel>Travel Type</FieldLabel>
          <Select name="travelType">
            <SelectTrigger>
              <SelectValue placeholder="Select travel type" />
            </SelectTrigger>
            <SelectContent>
              {travelTypes.length > 0 &&
                travelTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <InputFieldError
            field="travelType"
            state={state as IInputErrorState}
          />
        </Field>

        {/* Description */}
        <Field>
          <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
          <Textarea
            name="description"
            id="description"
            placeholder="Trip details, companions, notes..."
          />
          <InputFieldError
            field="description"
            state={state as IInputErrorState}
          />
        </Field>

        <div>
          <TravelPlanImageUploader
            travelPlanImage={travelPlanImage}
            setTravelPlanImage={setTravelPlanImage}
            resetTrigger={resetImage}
          />
        </div>

        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Processing..." : "Create Plan"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
