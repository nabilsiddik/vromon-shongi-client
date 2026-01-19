import IconList from './IconList'
import { Clock4, MapPin, User } from 'lucide-react'
import { dayDifference } from '@/utils/dateManagement'

const TripMetaIconList = ({trip}: {trip: any}) => {
    return (
        <div className="flex items-center gap-5">
            <IconList icon={<Clock4 />} text={`${dayDifference(trip?.startDate, trip?.endDate)} Days`} />

            <IconList icon={<User />} text={`${trip?.minMates} - ${trip?.maxMates} Mates`} />

            <IconList icon={<MapPin />} text={`${trip?.destination} Days`} />
        </div>
    )
}

export default TripMetaIconList