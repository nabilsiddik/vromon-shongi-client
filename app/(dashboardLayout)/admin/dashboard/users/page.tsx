import UsersTable from "@/components/modules/admin/userManagement/UsersTable"
import ManagementTable from "@/components/shared/tables/ManagementTable"
import { getAllUsers } from "@/utils/getAllUsers"

const Users = async() => {
  const user = await getAllUsers()
  return (
    <div>
      <UsersTable data = {user?.data}/>
    </div>
  )
}

export default Users
