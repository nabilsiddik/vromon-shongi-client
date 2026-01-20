'use client'

import { ChevronRight, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Modal from "../modal/Modal"
import TripMetaIconList from "../TripMetaIconList"
import TripDateRange from "../TripDateRange"
import TripPriceRange from "../TripPriceRange"
import { createTripParticipant } from "@/services/trip-participant/tripParticipantManagement"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const JoinTripCard = ({ trip, className = '', participants }: {
    trip: any,
    className: string,
    participants: any
}) => {

    const [open, setOpen] = useState<boolean>(false)

    const handleTripParticipantRequest = async () => {
        const res = await createTripParticipant(trip?.id)

        if (res?.success) {
            toast.success('Join request sent successfully. Please wait for approval from the trip leader.')
        } else if (!res?.success && res?.message === 'You already participated to this trip.') {
            toast.error('You already participated to this trip.')
        } else {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className={`border rounded-lg p-5 my-5 flex-2 h-auto ${className}`}>
            <TripDateRange trip={trip} className="border-b py-4" />

            <div className="py-5">
                {/* price range  */}
                <div className="flex justify-between gap-10">
                    <span className="text-gray-500 font-medium">Budget</span>
                    <TripPriceRange trip={trip} />
                </div>

                <div className="my-6">
                    <h3 className="mb-2 font-bold text-gray-700 text-xl">Already Participated</h3>
                    <div className="flex items-center gap-4 flex-wrap">
                        {participants?.length > 0 && participants?.map((participant: any) => {
                            const { user } = participant
                            return <span key={participant?.id}>
                                <Link target="_blank" href={`/traveler-profile/${user?.id}`}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span>
                                                <Image className="rounded-rull" src={user?.profileImage} width={50} height={50} alt="participant profile" />
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{user?.firstName} {user?.lastName}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </Link>
                            </span>
                        })}
                    </div>
                </div>

                <Button onClick={() => setOpen((o) => !o)} className="bg-primary font-bold uppercase mt-3 w-full py-6 px-8 cursor-pointer">Join Trip <ChevronRight /></Button>

                {/* join trip modal  */}
                <Modal onAction={handleTripParticipantRequest} open={open} setOpen={setOpen} actionButtonText='Join' modalTitle={'You are going to send a join request.'} modalDescription={'This will send a join request to the trip leader and you will join when trip leader approve it.'}>
                    <div className="my-4">
                        <h3 className="mb-4 font-medium text-xl text-primary">Trip Summery</h3>
                        <TripMetaIconList trip={trip} />
                        <TripDateRange trip={trip} className="mt-3" />
                        <TripPriceRange trip={trip} icon={<DollarSign />} className="mt-3" />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default JoinTripCard