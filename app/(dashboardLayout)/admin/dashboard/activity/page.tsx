import ActivityCard from "@/components/modules/admin/activityManagement/ActivityCard";
import { getAllUsers } from "@/services/admin/userManagement";
import { getAllReviews } from "@/services/reviews/reviewManagement";
import { getAllTravelPlans } from "@/services/travelPlan/travelPlanManagement";
import { getAllJoinRequest } from "@/services/travelPlan/travelPlanRequest";

const Activity = async () => {
  const users = await getAllUsers();
  const travelPlans = await getAllTravelPlans();
  const reviews = await getAllReviews();
  const joinRequests = await getAllJoinRequest();

  console.log(users, "users");
  console.log(reviews, "travels");
  return (
    <div>
      <div className="grid gap-5 lg:gap-10 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        <ActivityCard
          number={users?.data?.length}
          text="User"
          className="bg-red-500 hover:bg-red-600 text-white"
        />
        <ActivityCard
          number={travelPlans?.data?.length}
          text="Plans"
          className="bg-green-500 hover:bg-green-600 text-white"
        />
        <ActivityCard
          number={reviews?.length}
          text="Reviews"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        />
        <ActivityCard
          number={joinRequests?.length}
          text="Join Request"
          className="bg-yellow-500 hover:bg-yellow-600"
        />
      </div>
    </div>
  );
};

export default Activity;
