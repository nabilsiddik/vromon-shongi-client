import SlideUp from "@/animations/Slide/SlideUp"
import TripFilter from "@/components/modules/trips/TripFilter";
import TripCard from "@/components/shared/cards/TripCard"
import { queryStringFormatter } from "@/lib/formatter";
import { getAllTravelPlans } from "@/services/travelPlan/travelPlanManagement"

const AllTrips = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const allTrips = await getAllTravelPlans(queryString).then(data => data?.data) || []

    return (
        <div className="bg-[#f5f5f5]">
            <div className="py-20 mt-[63px] border-b relative bg-gradient-to-r from-blue-600 to-purple-600">
                <h1 className="font-bold text-center text-3xl text-white">All Trips</h1>
            </div>

            <div className="flex gap-5 max-w-7xl mx-auto px-5 py-10">
                {/* filter sidebar  */}
                <div className="flex-2">
                    <TripFilter />
                </div>
                <div className="flex-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {allTrips?.length > 0 && allTrips.map((trip: any) => {
                        return <SlideUp key={trip?.id}>
                            <TripCard trip={trip} titleLength={40} className="text-sm" />
                        </SlideUp>
                    })}
                </div>
            </div>
        </div>
    )
}

export default AllTrips