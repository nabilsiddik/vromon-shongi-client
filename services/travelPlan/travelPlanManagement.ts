"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { travelPlanZodSchema } from "@/zod/travelPlan.zodSchema";

// Get all Travel Plans
export const getAllTravelPlans = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(
      `/travel-plan${queryString ? `?${queryString}` : ""}`
    );
    const result = await res.json();
    return result.data || null;
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

// Get travel plan by id
export const getTravelPlanById = async (id: string) => {
  try {
    const res = await serverFetch.get(`/travel-plan/${id}`);
    const result = await res.json();
    return result.data || null;
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

// Get my travel plan
export const getMyTravelPlan = async (queryString: string) => {
  try {
    const res = await serverFetch.get(
      `/travel-plan/my-plans${queryString ? `?${queryString}` : ""}`
    );
    const result = await res.json();
    return result.data || null;
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

// Create Travel Plans
export async function createTravelPlan(prevState: any, formData: FormData) {
  try {
    const payload = {
      destination: formData.get("destination") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      budgetRange: formData.get("budgetRange") as string,
      travelType: formData.get("travelType") as string,
      description: formData.get("description") as string,
    };

    if (zodValidator(payload, travelPlanZodSchema).success === false) {
      return zodValidator(payload, travelPlanZodSchema);
    }

    const validatedPayload: any = zodValidator(
      payload,
      travelPlanZodSchema
    ).data;

    const travelPlanData = {
      destination: validatedPayload.destination,
      startDate: new Date(validatedPayload.startDate),
      endDate: new Date(validatedPayload.endDate),
      budgetRange: validatedPayload.budgetRange ?? undefined,
      travelType: validatedPayload.travelType,
      description: validatedPayload.description ?? undefined,
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(travelPlanData));

    if (formData.get("travelPlanImage")) {
      newFormData.append("file", formData.get("travelPlanImage") as Blob);
    }

    const res = await serverFetch.post("/travel-plan", {
      body: newFormData,
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log("Error while creating travel plan", error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Travel plan creation failed."
      }`,
    };
  }
}

// Update travel plan
export async function updateTravelPlan(
  id: string,
  _prevState: any,
  formData: any
) {
  const payload = {
    destination: formData.get("destination"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    budgetRange: formData.get("budgetRange"),
    travelType: formData.get("travelType"),
    description: formData.get("description"),
  };

  if (zodValidator(payload, travelPlanZodSchema).success === false) {
    return zodValidator(payload, travelPlanZodSchema);
  }

  const validatedPayload: any = zodValidator(payload, travelPlanZodSchema).data;

  const updatedTravelPlanData = {
    destination: validatedPayload.destination,
    startDate: new Date(validatedPayload.startDate),
    endDate: new Date(validatedPayload.endDate),
    budgetRange: validatedPayload.budgetRange ?? undefined,
    travelType: validatedPayload.travelType,
    description: validatedPayload.description ?? undefined,
  };

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(updatedTravelPlanData));

  if (formData.get("travelPlanImage")) {
    newFormData.append("file", formData.get("travelPlanImage") as Blob);
  }

  try {
    const response = await serverFetch.patch(`/travel-plan/${id}`, {
      body: newFormData,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
      formData: payload,
    };
  }
}

// Get my travel plan
export const deleteTravelPlan = async (planId: string) => {
  try {
    const res = await serverFetch.delete(`/travel-plan/${planId}`);
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
