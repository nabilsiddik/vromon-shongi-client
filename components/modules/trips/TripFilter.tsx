"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import { ChevronDownIcon, Filter } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Field, FieldLabel } from "@/components/ui/field";
import { useDebounce } from "use-debounce";
import { formatDate, formatDateForQuery } from "@/utils/dateManagement";

export default function TripFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [openStartDate, setOpenStartDate] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [travelType, setTravelType] = useState(
    searchParams.get("travelType") || ""
  );

  const [debouncedSearch] = useDebounce(searchTerm, 400)

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("searchTerm", searchTerm);
    if (startDate) params.set("startDate", formatDateForQuery(startDate));
    if (endDate) params.set("endDate", formatDateForQuery(endDate));
    if (travelType) params.set("travelType", travelType);

    router.replace(`${pathName}?${params.toString()}`, { scroll: false });

  }, [debouncedSearch, startDate, endDate, travelType]);

  const resetFilters = () => {
    router.replace(pathName);
    setStartDate(undefined)
    setEndDate(undefined)
  };


  return (
    <div className="flex items-center justify-between gap-5 md:gap-5 flex-col bg-gray-200 py-5 px-3 rounded-lg shadow-lg border border-blue-100 h-full">
      <div className="w-full">
        <Button onClick={resetFilters} className="w-full cursor-pointer">Reset</Button>
      </div>

      <div className="flex gap-4 items-center flex-7 flex-col w-full">
        {/* search  */}
        <Input
          placeholder="Where do you want to go?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white shadow-md border border-blue-100 placeholder:text-sm"
        />

        {/* dates Filter  */}
        {/* dates  */}
        <div className="flex items-center gap-5 w-full">
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
                    {startDate ? formatDate(startDate) : "Select Start Date"}
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
                End Date
              </FieldLabel>
              <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                <PopoverTrigger asChild>
                  <Button
                    type='button'
                    variant="outline"
                    id="endDate"
                    className="w-full justify-between font-medium bg-gray-50 py-5 text-md"
                  >
                    {endDate ? formatDate(endDate) : "Select End Date"}
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

        <Field>
          <FieldLabel htmlFor="select" className="px-1">
            Trip Type
          </FieldLabel>
          <Select value={travelType} onValueChange={setTravelType}>
            <SelectTrigger className="w-full bg-white shadow-md border border-blue-100">
              <SelectValue placeholder="Travel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">ALL</SelectItem>
              <SelectItem value="SOLO">SOLO</SelectItem>
              <SelectItem value="FAMILY">FAMILY</SelectItem>
              <SelectItem value="FRIENDS">FRIENDS</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </div>
  );
}
