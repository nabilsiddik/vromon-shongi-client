'use client'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { useState, useTransition } from "react"
import { updateParticipantRequest } from "@/services/trip-participant/tripParticipantManagement"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MessageSquare, Loader2 } from "lucide-react"

const ManageTripRequestSelectField = ({ participantReq }: { participantReq: any }) => {
    const [reqStatus, setReqStatus] = useState<string>(participantReq?.status || 'PENDING')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [, startTransition] = useTransition()

    const handleUpdateParticipantReqStatus = async (status: string) => {
        setLoading(true)
        try {
            const res = await updateParticipantRequest(participantReq?.id, status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'REMOVED')

            if (res?.success) {
                toast.success(`Request status updated to ${status}`)
                startTransition(() => {
                    router.refresh()
                })
            } else {
                toast.error(res?.message || 'Something went wrong while updating status.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <Select defaultValue={reqStatus as string} onValueChange={setReqStatus}>
                <SelectTrigger className="w-[140px] h-9 text-xs">
                    <SelectValue placeholder="Status" />
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

            <Button 
                disabled={loading || reqStatus === participantReq?.status}
                onClick={() => handleUpdateParticipantReqStatus(reqStatus)} 
                className="bg-emerald-600 hover:bg-emerald-700 h-9 px-3 text-xs flex items-center gap-1.5"
            >
                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {loading ? 'Saving...' : 'Update'}
            </Button>

            {participantReq?.status === 'APPROVED' && participantReq?.tripId && (
                <Link href={`/user/dashboard/join-room/${participantReq?.tripId}`}>
                    <Button variant="outline" size="sm" className="h-9 text-xs flex items-center gap-1 border-primary text-primary hover:bg-primary/10">
                        <MessageSquare className="w-3.5 h-3.5" /> Chat
                    </Button>
                </Link>
            )}
        </div>
    )
}

export default ManageTripRequestSelectField