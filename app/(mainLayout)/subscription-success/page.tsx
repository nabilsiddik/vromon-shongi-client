import getLogedInUser from "@/services/user/userManagement";
import SubscriptionSuccessClient from "./SubscriptionSuccessClient";

export default async function Page({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  // const sessionId = searchParams?.session_id;

  const user = await getLogedInUser();
  const isPremium = Boolean(user?.verifiedBadge);

  return <SubscriptionSuccessClient isPremium={isPremium} />;
}
