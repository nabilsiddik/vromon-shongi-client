'use server'
import { deleteCookie } from "@/services/auth/tokenHandler"
import { redirect } from "next/navigation"

  export const userLogout = async () => {
    await deleteCookie('accessToken')
    await deleteCookie('refreshToken')
    redirect('/login')
  }