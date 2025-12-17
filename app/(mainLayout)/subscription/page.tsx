import SubscriptionButton from "@/components/shared/SubscriptionButton";
import { handleSubscription } from "@/services/subscription";

const Subscription = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <SubscriptionButton action={handleSubscription} />
    </div>
  );
};

export default Subscription;
