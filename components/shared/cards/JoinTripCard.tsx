'use client'

import { ChevronRight, DollarSign, MessageSquare, Clock, XCircle, ShieldAlert, Loader2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Modal from "../modal/Modal"
import TripMetaIconList from "../TripMetaIconList"
import TripDateRange from "../TripDateRange"
import TripPriceRange from "../TripPriceRange"
import { createTripParticipant } from "@/services/trip-participant/tripParticipantManagement"
import { toast } from "sonner"
import Link from "next/link"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const JoinTripCard = ({ trip, className = '', participants, logedInUser, userParticipation }: {
    trip: any,
    className: string,
    participants: any,
    logedInUser: any,
    userParticipation: any
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [participation, setParticipation] = useState<any>(userParticipation)
    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        setParticipation(userParticipation)
    }, [userParticipation])

    const handleTripParticipantRequest = async () => {
        setIsSubmitting(true)
        try {
            const res = await createTripParticipant(trip?.id)

            if (res?.success) {
                toast.success('Join request sent successfully! You will enter the chat room once the host approves.')
                setParticipation(res?.data || { status: 'PENDING' })
                setOpen(false)
                router.refresh()
            } else if (!res?.success && res?.message) {
                toast.error(res?.message || 'Something went wrong')
            } else {
                toast.error('Something went wrong')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const isHost = logedInUser && logedInUser?.id === trip?.userId;

    return (
        <div className={`border rounded-lg p-5 my-5 flex-2 h-auto bg-white shadow-xs ${className}`}>
            <TripDateRange trip={trip} className="border-b py-4" />

            <div className="py-5">
                {/* price range  */}
                <div className="flex justify-between gap-10">
                    <span className="text-gray-500 font-medium">Budget</span>
                    <TripPriceRange trip={trip} />
                </div>

                {participants?.length > 0 &&
                    <div className="my-6">
                        <h3 className="mb-3 font-bold text-gray-700 text-lg">Already Participated ({participants.length})</h3>
                        <div className="flex items-center gap-3 flex-wrap">
                            {participants?.map((participant: any) => {
                                const { user } = participant
                                return (
                                    <span key={participant?.id}>
                                        <Link target="_blank" href={`/traveler-profile/${user?.id}`}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="transition-transform hover:scale-105 cursor-pointer">
                                                        <Avatar className="w-10 h-10 rounded-full border-2 border-primary/40 shadow-xs">
                                                            {user?.profileImage && (
                                                                <AvatarImage
                                                                    src={user.profileImage}
                                                                    alt={user?.firstName || "Participant"}
                                                                    className="object-cover w-full h-full"
                                                                />
                                                            )}
                                                            <AvatarFallback className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs">
                                                                {user?.firstName ? user.firstName[0].toUpperCase() : <User className="size-4 text-white" />}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{user?.firstName} {user?.lastName}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </Link>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                }

                {/* Host Controls */}
                {isHost && (
                    <div className="space-y-2.5 mt-4">
                        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold py-1.5 px-3 rounded-full text-center">
                            👑 You are the Host of this Trip
                        </div>
                        <Link href={`/user/dashboard/join-room/${trip?.id}`} className="block">
                            <Button className="bg-primary hover:bg-primary/90 font-bold uppercase w-full py-6 cursor-pointer flex items-center justify-center gap-2 shadow-xs">
                                <MessageSquare className="w-5 h-5" /> Open Group Chat <ChevronRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/user/dashboard/incoming-requests" className="block">
                            <Button variant="outline" className="w-full py-5 cursor-pointer font-medium text-xs">
                                View Incoming Requests
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Logged in member (non-host) */}
                {logedInUser && !isHost && (
                    participation?.status === 'PENDING' ? (
                        <div className="mt-4 space-y-2">
                            <Button disabled className="bg-amber-500/90 text-white font-semibold text-sm w-full py-6 cursor-not-allowed shadow-xs flex items-center justify-center gap-2">
                                <Clock className="w-4 h-4 animate-pulse" /> Request Pending Approval
                            </Button>
                            <p className="text-xs text-center text-muted-foreground leading-relaxed">
                                Your join request has been submitted. Once the host approves, the group chat will unlock.
                            </p>
                        </div>
                    ) : participation?.status === 'APPROVED' ? (
                        <div className="mt-4 space-y-2">
                            <Link href={`/user/dashboard/join-room/${trip?.id}`} className="block">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase w-full py-6 cursor-pointer flex items-center justify-center gap-2 shadow-sm">
                                    <MessageSquare className="w-5 h-5" /> Open Group Chat <ChevronRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <p className="text-xs text-center text-emerald-600 font-medium">
                                ✓ You are an approved mate for this trip!
                            </p>
                        </div>
                    ) : participation?.status === 'REJECTED' ? (
                        <div className="mt-4 space-y-2">
                            <Button disabled className="bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-sm w-full py-6 cursor-not-allowed flex items-center justify-center gap-2">
                                <XCircle className="w-4 h-4 text-rose-600" /> Request Declined
                            </Button>
                            <p className="text-xs text-center text-rose-500 font-medium leading-relaxed">
                                The host has declined your request to join this trip. You cannot submit another request.
                            </p>
                        </div>
                    ) : participation?.status === 'REMOVED' ? (
                        <div className="mt-4 space-y-2">
                            <Button disabled className="bg-gray-100 text-gray-500 border border-gray-300 font-semibold text-sm w-full py-6 cursor-not-allowed flex items-center justify-center gap-2">
                                <ShieldAlert className="w-4 h-4 text-gray-500" /> Participation Removed
                            </Button>
                            <p className="text-xs text-center text-muted-foreground leading-relaxed">
                                You were removed from this trip by the host.
                            </p>
                        </div>
                    ) : (
                        <Button
                            onClick={() => setOpen((o) => !o)}
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-primary/90 font-bold uppercase mt-4 w-full py-6 px-8 cursor-pointer flex items-center justify-center gap-2 shadow-sm transition-all"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                                </>
                            ) : (
                                <>
                                    Join Trip <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    )
                )}

                {/* Not logged in */}
                {!logedInUser && (
                    <Link href={`/login?redirect=${encodeURIComponent(pathName)}`} className="block mt-4">
                        <Button className="bg-primary hover:bg-primary/90 font-bold uppercase w-full py-6 px-8 cursor-pointer flex items-center justify-center gap-2 shadow-sm">
                            Join Trip <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                )}

                {/* join trip modal  */}
                <Modal onAction={handleTripParticipantRequest} open={open} setOpen={setOpen} actionButtonText={isSubmitting ? 'Sending...' : 'Send Request'} modalTitle={'Send Trip Join Request'} modalDescription={'This will send a join request to the trip host. Once approved, you will get access to the trip chat room.'}>
                    <div className="my-4">
                        <h3 className="mb-4 font-semibold text-lg text-primary">Trip Summary</h3>
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