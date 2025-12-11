'use client'
import { redirect, usePathname } from "next/navigation";
export const dynamic = "force-dynamic";
const UserDashboard = () => {
  const path = usePathname()

  if(path === '/user/dashboard'){
    redirect('/user/dashboard/create-plan')
  }
  return (
    <div>
      
    </div>
  )
}

export default UserDashboard
