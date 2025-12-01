import { serverFetch } from "@/lib/serverFetch"

const getLogedInUser = async() => {
    const res = await serverFetch.get('/auth/me')
    const user = await res.json()
    return user?.data || null
}

export default getLogedInUser