export const dynamic = "force-dynamic";
import DisplayTravelers from "@/components/shared/DisplayTravelers";
import PageHeader from "@/components/shared/PageHeader";
import { getAllUsers } from "@/services/admin/userManagement";
import { getAllTravelers } from "@/services/user/userManagement";

const ExploreTravelers = async () => {
  const travelers = await getAllTravelers();

  return (
    <div>
      <PageHeader
        title="Explore Travelers"
        description="Explore all the travellers"
        backgroundImage="/images/bg-banner/explore-traveler.jpg"
      />
      <DisplayTravelers travelers={travelers} />
    </div>
  );
};

export default ExploreTravelers;
