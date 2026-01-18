import IconList from "@/components/shared/IconList";
import { Button } from "@/components/ui/button";
import { dayDifference, formatDate } from "@/utils/dateManagement";
import { formatVideoUrl } from "@/utils/formatVideoUrl";
import { shortText } from "@/utils/shortText";
import { CalendarDays, Check, ChevronRight, Clock4, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TripDescription from "./TripDescription";

const TripDetails = ({ user, trip }: { user: any, trip: any }) => {

    const includesHalfLength = Math.ceil(trip?.includes?.length / 2)

    return (
        <section className="mt-20">
            <div style={{
                backgroundImage: `url(${trip?.planImages[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }} className="w-full h-[500px]">

            </div>

            <div className="max-w-7xl mx-auto px-5 my-10 flex gap-10">
                <div className="flex flex-col gap-3 flex-4">
                    <h2 className="font-bold text-3xl text-gray-700">{trip?.title}</h2>
                    <div className="flex items-center gap-2 font-medium">
                        <span>Hosted by</span>
                        <span>
                            <Image className="rounded-rull" src={user?.profileImage} width={50} height={50} alt="host profile" />
                        </span>
                        <Link target="_blank" href={`/traveler-profile/${user?.id}`}>
                            <span className="font-bold text-black underline">{user?.firstName}</span>
                        </Link>
                        <Button variant={'outline'} className="py-5 px-8">
                            Ask A Question
                        </Button>
                    </div>

                    <div className="flex items-center gap-5">
                        <IconList icon={<Clock4 />} text={`${dayDifference(trip?.startDate, trip?.endDate)} Days`} />

                        <IconList icon={<User />} text={`${trip?.minMates} - ${trip?.maxMates} Mates`} />

                        <IconList icon={<MapPin />} text={`${trip?.destination} Days`} />
                    </div>

                    {/* description  */}
                    <TripDescription description = {trip?.description}/>

                    {/* included  */}
                    <div className="mt-3 p-5 border rounded-lg">
                        <h3 className="font-bold text-xl">What's included:</h3>

                        <div className="mt-2 flex gap-10">
                            <div className="flex flex-col gap-1">
                                {trip?.includes?.length > 0 && trip?.includes?.slice(0, includesHalfLength)?.map((trip: any) => {
                                    return <IconList key={trip?.id} icon={<Check width={18} />} text={trip} />
                                })}
                            </div>
                            <div className="flex flex-col gap-1">
                                {trip?.includes?.length > 0 && trip?.includes?.slice(includesHalfLength, trip?.includes?.length)?.map((trip: any) => {
                                    return <IconList key={trip?.id} icon={<Check width={18} />} text={trip} />
                                })}
                            </div>
                        </div>
                    </div>


                    {/* trip highlights video  */}
                    {trip?.videoUrl &&
                        <div className="mt-3 p-5 border rounded-lg">
                            <h3 className="font-bold text-xl mb-4">Trip Highlights Video:</h3>

                            <div>
                                <iframe className="rounded-lg" width="560" height="315" src={formatVideoUrl(trip?.videoUrl)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>

                        </div>
                    }
                </div>

                {/* Join trip  */}
                <div className="border rounded-lg p-5 flex-2">
                    <div className="py-5 border-b">
                        <IconList icon={<CalendarDays />} text={`${formatDate(trip?.startDate)} - ${formatDate(trip?.endDate)}`} textClass="font-medium text-gray-500" iconClass="text-gray-500" />
                    </div>

                    <div className="py-5">
                        <div className="flex items-center justify-between font-bold text-gray-500">
                            <span>Total Price</span>
                            <span>${trip?.budgetFrom}</span>
                        </div>
                        <Button className="bg-primary font-bold uppercase mt-3 w-full py-6 px-8 cursor-pointer">Join Trip <ChevronRight /></Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TripDetails