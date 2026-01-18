"use server";

import { serverFetch } from "@/lib/serverFetch";

// Get top rated travelers
export const getMatchedTravelers = async () => {
  try {
    const res = await serverFetch.get(`/user/travelers/matched-travelers`);
    const result = await res.json();
    return result?.data || [];
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};
