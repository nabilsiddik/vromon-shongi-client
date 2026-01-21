import SlideUp from "@/animations/Slide/SlideUp"
import TripCard from "@/components/shared/cards/TripCard";
import { getAllTravelPlans } from "@/services/travelPlan/travelPlanManagement"

const FeaturedTrips = async() => {

    const allTrips = await getAllTravelPlans().then(data => data?.data)

    return (
        <section className='max-w-7xl mx-auto px-5 my-20'>
            <SlideUp className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                    Featured Trips
                </h2>
            </SlideUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {allTrips?.length > 0 && allTrips.map((trip: any) => {
                    return <SlideUp key={trip?.id}>
                        <TripCard trip={trip} titleLength={70}/>
                    </SlideUp>
                })}
            </div>
        </section>
    )
}

export default FeaturedTrips