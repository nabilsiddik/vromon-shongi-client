import { CalendarDays } from "lucide-react"
import IconList from "./IconList"
import { formatDate } from "@/utils/dateManagement"

const TripDateRange = ({trip, className = ''}: {trip: any, className?: string}) => {
    return (
        <div className={`${className}`}>
            <IconList icon={<CalendarDays />} text={`${formatDate(trip?.startDate)} - ${formatDate(trip?.endDate)}`} textClass="font-medium text-gray-500" iconClass="text-gray-500" />
        </div>
    )
}

export default TripDateRange