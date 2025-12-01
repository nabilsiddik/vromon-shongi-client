'use client'
import { Button } from './ui/button'
import { deleteCookie } from '@/utils/tokenHandler'

const LogoutUserButton = () => {

  // handle user logout
  const handleUserLogout = async () => {
    await deleteCookie('accessToken')
    await deleteCookie('refreshToken')
  }

  return (
    <>
      <Button onClick={handleUserLogout} className="w-full cursor-pointer">Logout</Button>
    </>
  )
}

export default LogoutUserButton
