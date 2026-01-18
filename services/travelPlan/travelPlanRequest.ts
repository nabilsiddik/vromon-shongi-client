"use server";
import { serverFetch } from "@/lib/serverFetch";

// Get all my Travel Plan requests
export const getAllJoinRequest = async () => {
  try {
    const res = await serverFetch.get(`/join-request`);
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

// Get all my Travel Plan requests
export const getMyPlanRequests = async () => {
  try {
    const res = await serverFetch.get(`/join-request/my-request`);
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

// Get all Travel Plan requests that I sent
export const getMySentRequests = async () => {
  try {
    const res = await serverFetch.get(`/join-request/my-sent`);
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

// join request action
export const joinRequestAction = async (endpoint: any, request: any) => {
  try {
    const res = await serverFetch.post(`/join-request/${endpoint}`, {
      body: JSON.stringify({ requestId: request?.id }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    return result;
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

export const completeJoinRequest = async (request: any) => {
  try {
    const res = await serverFetch.patch(
      `/join-request/complete/${request?.id}`,
      {
        body: JSON.stringify({ status: "COMPLETED" }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await res.json();
    return result;
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
