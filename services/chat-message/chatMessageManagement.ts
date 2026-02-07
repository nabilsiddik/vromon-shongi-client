"use server";
import { serverFetch } from "@/lib/serverFetch";

// Get chat messages
export const getChatMessagesForSpecificRoom = async (tripId: string) => {
  try {
    const res = await serverFetch.get(`/chat-message/${tripId}`);
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