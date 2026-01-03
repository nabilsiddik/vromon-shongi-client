import SubscriptionButton from "@/components/shared/SubscriptionButton";
import getLogedInUser from "@/services/user/userManagement";

const Subscription = async () => {
  const user = await getLogedInUser();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <SubscriptionButton user={user} />
    </div>
  );
};

export default Subscription;
