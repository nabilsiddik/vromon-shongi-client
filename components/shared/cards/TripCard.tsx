import { dayDifference, formatDate } from "@/utils/dateManagement";
import { VerifiedIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MdVerified } from "react-icons/md";


const TripCard = ({ trip }: { trip: any }) => {
    const { user } = trip
    return (
        <Link href={`/trips/${trip?.id}`}>
            <div className="bg-white rounded-lg shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all ease-in-out duration-300">
                <div className="relative">
                    <Image className="rounded-tl-lg rounded-tr-lg w-full" src={trip?.planImages[0]} width={500} height={500} alt="Trip image" />

                    {/* user profile  */}
                    <Link href={`/traveler-profile/${user?.id}`}>
                        <div className="absolute bottom-5 left-5 w-15 h-15 z-10 bg-white rounded-lg border-3 border-white"
                            style={{
                                backgroundImage: `url(${user?.profileImage})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >

                            <span className="absolute bottom-0 right-0"><MdVerified className="text-sky-400 text-2xl" />
                            </span>

                        </div>
                    </Link>
                </div>

                <div className="py-3 px-5 flex flex-col">
                    <div>
                        <p className="font-medium text-gray-600">host <Link className="underline" href={`/traveler-profile/${user?.id}`}>{user?.firstName}</Link></p>
                    </div>
                    <Link href={'/'}>
                        <h3 className="font-bold text-lg text-gray-800 hover:text-primary">{trip?.title}</h3>
                    </Link>

                    <div className="flex items-center gap-2 mt-2 mb-1 font-medium text-gray-500">
                        <span>From {formatDate(trip?.startDate)}</span>
                        <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                        <span>{dayDifference(trip?.startDate, trip?.endDate)} Days</span>
                    </div>

                    <h3 className="font-medium text-primary">${trip?.budgetFrom} - ${trip?.budgetTo}</h3>
                </div>

            </div>
        </Link>
    )
}

export default TripCard