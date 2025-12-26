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
import { Filter } from "lucide-react";
import { Label } from "../ui/label";

export default function TravelPlanFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("destination") || ""
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [travelType, setTravelType] = useState(
    searchParams.get("travelType") || ""
  );

  useEffect(() => {
    const applyFilters = () => {
      const queryString = new URLSearchParams();

      if (searchTerm) queryString.set("searchTerm", searchTerm);
      if (startDate) queryString.set("startDate", startDate);
      if (endDate) queryString.set("endDate", endDate);
      if (travelType) queryString.set("travelType", travelType);

      router.push(`/travel-plans/?${queryString.toString()}`);
    };
    applyFilters();
  }, [searchTerm, startDate, endDate, travelType]);

  // reset filter
  const handleResetFilter = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setTravelType("");

    router.push(pathName);
  };

  return (
    <div className="flex items-center justify-between gap-5 md:gap-10 flex-col md:flex-row">
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="font-bold text-xl flex items-center gap-3 flex-5">
          <Filter /> Filter & Match
        </h2>
        <Button onClick={handleResetFilter}>Reset</Button>
      </div>
      <div className="flex gap-4 items-center flex-7 flex-col md:flex-row w-full">
        <Input
          placeholder="Destination"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <Select value={travelType} onValueChange={setTravelType}>
          <SelectTrigger className="w-full md:w-auto">
            <SelectValue placeholder="Travel Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL</SelectItem>
            <SelectItem value="SOLO">Solo</SelectItem>
            <SelectItem value="FAMILY">FAMILY</SelectItem>
            <SelectItem value="FRIENDS">FRIENDS</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
