const TripPriceRange = ({ trip, className = '', icon }: { trip: any, className?: string, icon?: React.ReactNode }) => {
    return (
        <div className={`flex items-center font-bold text-gray-500 gap-3 ${className}`}>
            {icon && <span>{icon}</span>}
            <span>${trip?.budgetFrom} - ${trip?.budgetTo}</span>
        </div>
    )
}

export default TripPriceRange