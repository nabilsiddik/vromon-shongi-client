"use client";

import { cn } from "@/lib/utils";
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

import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IInputErrorState } from "@/utils/getInputFieldError";
import { createTravelPlan } from "@/services/travelPlan/travelPlanManagement";
import TravelPlanImageUploader from "../travelPlanImageUploader";
import { Button } from "../ui/button";

export function TravelPlanForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction, isPending] = useActionState(createTravelPlan, null);
  const [travelPlanImage, setTravelPlanImage] = useState<File | null>(null);
  const travelTypes = ["SOLO", "FAMILY", "FRIENDS"];
  const [resetImage, setResetImage] = useState(false);
  const prevSuccessRef = useRef<boolean | null>(null);

  const [openStartDate, setOpenStartDate] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

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
    <div className="bg-gray-50 px-5 md:px-8 lg:px-12 py-6 md:py-8 lg:py-12 rounded-lg border shadow-md">
      <form
        noValidate
        action={formAction}
        className={cn("flex flex-col", className)}
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

        <input name="startDate" type="text" value={startDate ? startDate.toString() : ''} hidden />
        <input name="endDate" type="text" value={endDate ? endDate.toString() : ''} hidden />

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
              className="font-medium bg-gray-50"
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

          {/* dates  */}
          <div className="flex items-center gap-5">
            {/* start date  */}
            <div className="flex-1">
              <Field>
                <FieldLabel htmlFor="date" className="px-1">
                  Start Date<span className="text-red-500">*</span>
                </FieldLabel>
                <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                  <PopoverTrigger asChild>
                    <Button
                      type='button'
                      variant="outline"
                      id="startDate"
                      className="w-full justify-between font-medium bg-gray-50 py-5 text-md"
                    >
                      {startDate ? startDate.toLocaleDateString() : "Select Start Date"}
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
                <InputFieldError field="birthDate" state={state} />
              </Field>
            </div>
            {/* End date  */}
            <div className="flex-1">
              <Field>
                <FieldLabel htmlFor="date" className="px-1">
                  End Date<span className="text-red-500">*</span>
                </FieldLabel>
                <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                  <PopoverTrigger asChild>
                    <Button
                      type='button'
                      variant="outline"
                      id="endDate"
                      className="w-full justify-between font-medium bg-gray-50 py-5 text-md"
                    >
                      {endDate ? endDate.toLocaleDateString() : "Select End Date"}
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
                <InputFieldError field="birthDate" state={state} />
              </Field>
            </div>
          </div>


          {/* Budget Range */}
          <Field>
            <FieldLabel htmlFor="budgetRange">Budget Range <span className="text-red-500">*</span></FieldLabel>
            <div className="flex items-center gap-5">
              {/* budget from  */}
              <div className="flex-1">
                <Input
                  className="font-medium bg-gray-50"
                  min={1}
                  max={100000}
                  type='number'
                  name="budgetFrom"
                  id="budgetFrom"
                  placeholder="Budget From"
                />
                <InputFieldError
                  field="budgetFrom"
                  state={state as IInputErrorState}
                />
              </div>
              {/* budget to  */}
              <div className="flex-1">
                <Input
                  className="font-medium bg-gray-50"
                  min={1}
                  max={100000}
                  type='number'
                  name="budgetTo"
                  id="budgetTo"
                  placeholder="Budget To"
                />
                <InputFieldError
                  field="budgetTo"
                  state={state as IInputErrorState}
                />
              </div>
            </div>
          </Field>


          {/* Minimum & Maximum Travel mates */}
          <Field>
            <FieldLabel htmlFor="minimum mates">Number of Travel Mates Join<span className="text-red-500">*</span></FieldLabel>
            <div className="flex items-center gap-5">
              {/* Minimum number travel mates  */}
              <div className="flex-1">
                <Input
                  className="font-medium bg-gray-50"
                  min={1}
                  max={50}
                  type='number'
                  name="minMates"
                  id="minMates"
                  placeholder="Min Mates"
                />
                <InputFieldError
                  field="minMates"
                  state={state as IInputErrorState}
                />
              </div>
              {/* Maximum Number of travel mates  */}
              <div className="flex-1">
                <Input
                  className="font-medium bg-gray-50"
                  min={1}
                  max={100000}
                  type='number'
                  name="maxMates"
                  id="maxMates"
                  placeholder="Max Mates"
                />
                <InputFieldError
                  field="maxMates"
                  state={state as IInputErrorState}
                />
              </div>
            </div>
          </Field>

          {/* Travel Type */}
          <Field>
            <FieldLabel>Travel Type <span className="text-red-500">*</span></FieldLabel>
            <Select name="travelType" defaultValue="SOLO">
              <SelectTrigger className="py-5 font-medium bg-gray-50">
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

          {/* video url  */}
          <Field>
            <FieldLabel htmlFor="url">Trips Highlight Video URL</FieldLabel>
            <Input
              className="font-medium bg-gray-50 placeholder:text-md"
              name="videoUrl"
              id="videoUrl"
              type="url"
              placeholder="Past Youtube URL"
            />
            <InputFieldError
              field="destination"
              state={state as IInputErrorState}
            />
          </Field>

          {/* Included */}
          <Field>
            <FieldLabel htmlFor="includes">Trip Included (One per line)</FieldLabel>
            <Textarea
              className="font-medium bg-gray-50 placeholder:text-lg"
              name="includes"
              id="includes"
              placeholder="Trip details, companions, notes..."
            />
            <InputFieldError
              field="description"
              state={state as IInputErrorState}
            />
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description">Description (Optional, You can add later)</FieldLabel>
            <Textarea
              className="font-medium bg-gray-50 placeholder:text-lg"
              name="description"
              id="description"
              placeholder="Add includeds per line"
            />
            <InputFieldError
              field="description"
              state={state as IInputErrorState}
            />
          </Field>

          {/* visibility  */}
          <Field>
            <FieldLabel>Visibility</FieldLabel>
            <Select name="visibility" defaultValue="PUBLIC">
              <SelectTrigger className="py-5 font-medium bg-gray-50">
                <SelectValue placeholder="Public" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'PUBLIC'}>
                  Public
                </SelectItem>
                <SelectItem value={'PRIVET'}>
                  Privet
                </SelectItem>
              </SelectContent>
            </Select>
            <InputFieldError
              field="visibility"
              state={state as IInputErrorState}
            />
          </Field>

          <div>
            <Field>
              <FieldLabel className="mb-3" htmlFor="images">Trip Related Images</FieldLabel>
            </Field>
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
    </div>
  );
}
