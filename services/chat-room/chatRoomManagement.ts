"use server";
import { serverFetch } from "@/lib/serverFetch";

// Get chat room
export const getChatRoom = async (tripId: string) => {
  try {
    const res = await serverFetch.get(`/chat-room/${tripId}`);
    const result = await res.json();
    return result?.data || null;
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