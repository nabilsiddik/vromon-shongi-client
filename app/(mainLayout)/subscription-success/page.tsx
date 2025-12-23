import SubscriptionSuccessClient from "./SubscriptionSuccessClient";
import { serverFetch } from "@/lib/serverFetch";
import { cookies } from "next/headers";

export default async function Page({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  let verifiedSession = false;

  if (sessionId) {
    const res = await serverFetch.get(
      `/subscription/verify-session?session_id=${sessionId}`
    );

    const data = await res.json();
    verifiedSession = !!data?.success;
  }

  return <SubscriptionSuccessClient verifiedSession={verifiedSession} />;
}
