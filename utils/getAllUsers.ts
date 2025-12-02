import { serverFetch } from "@/lib/serverFetch"

export const getAllUsers = async() => {
    const res = await serverFetch.get('/user')
    const users = await res.json()
    return users?.data || null
}