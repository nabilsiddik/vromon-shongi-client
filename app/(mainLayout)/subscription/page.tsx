import SubscriptionButton from "@/components/shared/SubscriptionButton";
import { serverFetch } from "@/lib/serverFetch";

export async function handleSubscription(planType: "monthly" | "yearly") {
  const res = await serverFetch.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/subscription/create-session`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan: planType }),
    }
  );

  const data = await res.json();

  console.log(data);

  return data;
}

const Subscription = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <SubscriptionButton action={handleSubscription} />
    </div>
  );
};

export default Subscription;
