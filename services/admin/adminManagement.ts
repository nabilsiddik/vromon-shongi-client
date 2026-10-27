"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getAdminAnalytics = async () => {
  try {
    const res = await serverFetch.get("/admin/analytics");
    const result = await res.json();
    return result?.data || null;
  } catch (error: any) {
    console.error("Error fetching admin analytics:", error);
    return null;
  }
};
