'use server'

import { serverFetch } from "@/lib/serverFetch";
import { headers } from "next/headers";

// create trip participant
export const createTripParticipant = async (tripId: string) => {
  try {
    const res = await serverFetch.post(
      `/trip-participant`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripId }),
    }
    );
    const result = await res.json();
    return result || null;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong"
        }`,
    };
  }
};

// Get all my Participant join request (Incoming to my trips)
export const myParticipantRequest = async () => {
  try {
    const res = await serverFetch.get(
      `/trip-participant`
    );
    const result = await res.json();
    return result?.data || [];
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

// Get all requests sent by this user to join other trips (Outgoing)
export const getMyOutgoingTripRequests = async () => {
  try {
    const res = await serverFetch.get(
      `/trip-participant/outgoing`
    );
    const result = await res.json();
    return result?.data || [];
  } catch (error: any) {
    console.log(error);
    return [];
  }
};


// Get all approved participation of an user for join room conversation
export const getAllParticipationsOfAnUser = async () => {
  try {
    const res = await serverFetch.get(
      `/trip-participant/joined`
    );
    const result = await res.json();
    return result?.data || [];
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong"
        }`,
    };
  }
};


// Get trip participant by id
export const getTripParticipantById
  = async (id: string) => {
    try {
      const res = await serverFetch.get(
        `/trip-participant/${id}`
      );
      const result = await res.json();
      return result?.data || null;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: `${process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
          }`,
      };
    }
  };


// Get participants for specific trip
export const getParticipantsForSpecificTrip
  = async (tripId: string) => {
    try {
      const res = await serverFetch.get(
        `/trip-participant/participants/${tripId}`
      );
      const result = await res.json();
      return result?.data || [];
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: `${process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
          }`,
      };
    }
  };


// Get users participation for a trip
export const getUserParticipationForTrip
  = async (tripId: string) => {
    try {
      const res = await serverFetch.get(
        `/trip-participant/participation-status/${tripId}`
      );
      const result = await res.json();
      return result?.data || null;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: `${process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
          }`,
      };
    }
  };

// Update participant request
export const updateParticipantRequest
  = async (id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REMOVED') => {
    try {
      const res = await serverFetch.patch(
        `/trip-participant/${id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        }
      );
      const result = await res.json();
      return result || null;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: `${process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
          }`,
      };
    }
  };