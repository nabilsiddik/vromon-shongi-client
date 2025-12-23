"use server";
import { serverFetch } from "@/lib/serverFetch";

export async function handleSubscription(planType: "monthly" | "yearly") {
  const res = await serverFetch.post(`/subscription/create-session`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan: planType }),
  });

  const data = await res.json();

  return data;
}
