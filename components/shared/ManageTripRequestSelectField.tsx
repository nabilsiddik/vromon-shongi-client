'use client'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { useState } from "react"
import { updateParticipantRequest } from "@/services/trip-participant/tripParticipantManagement"
import { toast } from "sonner"

const ManageTripRequestSelectField = ({ participantReq }: { participantReq: any }) => {

    const [reqStatus, setReqStatus] = useState<string>(participantReq?.status || 'PENDING')


    const handleUpdateParticipantReqStatus = async (reqStatus: string) => {

        const res = await updateParticipantRequest(participantReq?.id, reqStatus as 'PENDING' | 'APPROVED' | 'REJECTED' | 'REMOVED')

        console.log(res);

        if (res?.success) {
            toast.success('Trip Participant Request Status Updated.')
        } else {
            toast.error('Something went wrong while updating status.')
        }
    }

    return (
        <div className="flex items-center gap-3">
            <Select defaultValue={reqStatus as string} onValueChange={setReqStatus}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="APPROVED">APPROVED</SelectItem>
                        <SelectItem value="REJECTED">REJECTED</SelectItem>
                        <SelectItem value="REMOVED">REMOVED</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button onClick={() => handleUpdateParticipantReqStatus(reqStatus)} className="bg-green-600">Update</Button>
        </div>
    )
}

export default ManageTripRequestSelectField