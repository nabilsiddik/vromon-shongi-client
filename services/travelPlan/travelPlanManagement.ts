"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { travelPlanZodSchema, updateTravelPlanZodSchema } from "@/zod/travelPlan.zodSchema";

// Get all Travel Plans
export const getAllTravelPlans = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(
      `/travel-plan${queryString ? `?${queryString}` : ""}`
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

// Get travel plan by id
export const getTravelPlanById = async (id: string) => {
  try {
    const res = await serverFetch.get(`/travel-plan/${id}`);
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

// Get my travel plan
export const getMyTravelPlan = async (queryString: string = "") => {
  try {
    const res = await serverFetch.get(
      `/travel-plan/my-plans${queryString ? `?${queryString}` : ""}`
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

// Create Travel Plans
export async function createTravelPlan(prevState: any, formData: FormData) {
  try {
    const payload = {
      title: formData.get("title") as string,
      destination: formData.get("destination") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      budgetFrom: formData.get("budgetFrom") as string,
      budgetTo: formData.get("budgetTo") as string,
      minMates: formData.get("minMates") as string,
      maxMates: formData.get("maxMates") as string,
      videoUrl: formData.get("videoUrl") as string,
      includes: formData.get("includes") as string,
      travelType: formData.get("travelType") as string,
      description: formData.get("description") as string,
      visibility: formData.get("visibility") as string,
    };

    if (zodValidator(payload, travelPlanZodSchema).success === false) {
      return zodValidator(payload, travelPlanZodSchema);
    }

    const validatedPayload: any = zodValidator(
      payload,
      travelPlanZodSchema
    )?.data;

    if (!validatedPayload.startDate || String(validatedPayload.startDate).trim() === "") {
      return {
        success: false,
        message: "Please select a start date for your travel plan.",
      };
    }
    if (!validatedPayload.endDate || String(validatedPayload.endDate).trim() === "") {
      return {
        success: false,
        message: "Please select an end date for your travel plan.",
      };
    }

    const start = new Date(validatedPayload.startDate);
    const end = new Date(validatedPayload.endDate);

    if (isNaN(start.getTime())) {
      return {
        success: false,
        message: "Invalid start date. Please select a valid date.",
      };
    }
    if (isNaN(end.getTime())) {
      return {
        success: false,
        message: "Invalid end date. Please select a valid date.",
      };
    }
    if (end <= start) {
      return {
        success: false,
        message: "End date must be greater than start date.",
      };
    }

    const parsedStartDate = start.toISOString();
    const parsedEndDate = end.toISOString();

    const includesArray = validatedPayload?.includes
      ? validatedPayload.includes
          .split(/\r?\n/)
          .map((item: string) => item.trim())
          .filter(Boolean)
      : [];

    const travelPlanData = {
      title: validatedPayload.title,
      destination: validatedPayload.destination,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      budgetFrom: validatedPayload.budgetFrom,
      budgetTo: validatedPayload.budgetTo,
      minMates: validatedPayload.minMates,
      maxMates: validatedPayload.maxMates,
      travelType: validatedPayload.travelType,
      description: validatedPayload.description ?? undefined,
      videoUrl: validatedPayload.videoUrl ?? undefined,
      visibility: validatedPayload.visibility || "PUBLIC",
      includes: includesArray,
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(travelPlanData));

    const travelPlanImage = formData.get("travelPlanImage");
    if (
      travelPlanImage &&
      typeof travelPlanImage === "object" &&
      "size" in travelPlanImage &&
      (travelPlanImage as File).size > 0
    ) {
      newFormData.append("file", travelPlanImage as Blob);
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
      message: `${process.env.NODE_ENV === "development"
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
    title: formData.get("title"),
    destination: formData.get("destination"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    budgetFrom: formData.get("budgetFrom"),
    budgetTo: formData.get("budgetTo"),
    travelType: formData.get("travelType"),
    description: formData.get("description"),
  };

  console.log(payload);

  if (zodValidator(payload, updateTravelPlanZodSchema).success === false) {
    return zodValidator(payload, updateTravelPlanZodSchema);
  }

  const validatedPayload: any = zodValidator(payload, updateTravelPlanZodSchema)?.data;

  let parsedStartDate: string | undefined;
  let parsedEndDate: string | undefined;

  if (validatedPayload.startDate) {
    const start = new Date(validatedPayload.startDate);
    if (!isNaN(start.getTime())) {
      parsedStartDate = start.toISOString();
    }
  }

  if (validatedPayload.endDate) {
    const end = new Date(validatedPayload.endDate);
    if (!isNaN(end.getTime())) {
      parsedEndDate = end.toISOString();
    }
  }

  if (parsedStartDate && parsedEndDate && new Date(parsedEndDate) <= new Date(parsedStartDate)) {
    return {
      success: false,
      message: "End date must be greater than start date.",
    };
  }

  const updatedTravelPlanData = {
    title: validatedPayload.title,
    destination: validatedPayload.destination,
    ...(parsedStartDate ? { startDate: parsedStartDate } : {}),
    ...(parsedEndDate ? { endDate: parsedEndDate } : {}),
    budgetFrom: validatedPayload.budgetFrom ?? undefined,
    budgetTo: validatedPayload.budgetTo ?? undefined,
    travelType: validatedPayload.travelType,
    description: validatedPayload.description ?? undefined,
  };

  console.log(updatedTravelPlanData, 'daaa');

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(updatedTravelPlanData));

  const travelPlanImage = formData.get("travelPlanImage");
  if (
    travelPlanImage &&
    typeof travelPlanImage === "object" &&
    "size" in travelPlanImage &&
    (travelPlanImage as File).size > 0
  ) {
    newFormData.append("file", travelPlanImage as Blob);
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
      message: `${process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
        }`,
    };
  }
};
