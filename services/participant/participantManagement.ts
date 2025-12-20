"use server";
import { serverFetch } from "@/lib/serverFetch";

// Get all host participant
export const getHostParticipant = async () => {
  try {
    const res = await serverFetch.get(`/participant/my-participants`);
    const result = await res.json();
    return result.data || [];
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

export const handleTravelersJoin = async (planId: string) => {
  try {
    const res = await serverFetch.post(`/join-request/send`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong"
      }`,
    };
  }
};
