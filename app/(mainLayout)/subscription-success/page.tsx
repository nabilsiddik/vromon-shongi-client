import getLogedInUser from "@/services/user/userManagement";
import SubscriptionSuccessClient from "./SubscriptionSuccessClient";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams?.session_id;

  const user = await getLogedInUser();
  const isPremium = Boolean(user?.verifiedBadge);

  return <SubscriptionSuccessClient isPremium={isPremium} sessionId={sessionId} />;
}
