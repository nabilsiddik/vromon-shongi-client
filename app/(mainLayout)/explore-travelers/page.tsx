import PageHeader from "@/components/shared/PageHeader"
import { getAllUsers } from "@/services/admin/userManagement"

const ExploreTravelers = async() => {

    const usersData = await getAllUsers()
    const users = usersData?.data

    console.log(users, 'jdkfldkfjkld')

  return (
    <div>
      <PageHeader title="Explore Travelers" description="Explore all the travellers" backgroundImage="/images/bg-banner/explore-traveler.jpg"/>
    </div>
  )
}

export default ExploreTravelers
