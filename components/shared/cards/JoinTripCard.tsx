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

const JoinTripCard = ({ trip, className = '' }: any) => {

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