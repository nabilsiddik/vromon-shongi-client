import { serverFetch } from "@/lib/serverFetch"

export const getAllTravelPlans = async (queryString: string) => {
    try {
        const res = await serverFetch.get(`/travel-plan${queryString ? `?${queryString}` : ''}`)
        const result = await res.json()
        return result.data || null
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }
}