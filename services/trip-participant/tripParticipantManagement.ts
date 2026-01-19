'use server'

import { serverFetch } from "@/lib/serverFetch";

// create trip participant
export const createTripParticipant = async (tripId: string) => {
  try {
    const res = await serverFetch.post(
      `/trip-participant`, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({tripId}),
      }
    );
    const result = await res.json();
    return result || null;
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

// // Get all my Participant join request
export const myParticipantRequest = async () => {
  try {
    const res = await serverFetch.get(
      `/trip-participant`
    );
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