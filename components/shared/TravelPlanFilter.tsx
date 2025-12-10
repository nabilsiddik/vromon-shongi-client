"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select"
import { Filter } from "lucide-react"

export default function TravelPlanFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [searchTerm, setSearchTerm] = useState(searchParams.get("destination") || "")
    const [date, setDate] = useState(searchParams.get("date") || "")
    const [travelType, setTravelType] = useState(searchParams.get("travelType") || "")

    useEffect(() => {
        const applyFilters = () => {
            const queryString = new URLSearchParams()

            if (searchTerm) queryString.set("searchTerm", searchTerm)
            if (date) queryString.set("date", date)
            if (travelType) queryString.set("travelType", travelType)

            router.push(`/travel-plans/?${queryString.toString()}`)
        }
        applyFilters()
    }, [searchTerm, date, travelType])

    return (
        <div className="flex items-center justify-between gap-20">
            <h2 className="font-bold text-xl flex items-center gap-3 flex-5"><Filter/> Filter & Match</h2>
            <div className="flex gap-4 items-center flex-7">
                <Input
                    placeholder="Destination"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <Select value={travelType} onValueChange={setTravelType}>
                    <SelectTrigger>
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
    )
}
