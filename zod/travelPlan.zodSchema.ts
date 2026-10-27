import { TravelType } from "@/types/travelPlan.interface";
import z from "zod";

export const travelPlanZodSchema = z.object({
  title: z.string().min(3, "Title length must be at least 3"),
  destination: z.string().min(3, "Destination length must be at least 3"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End date is required"),
  budgetFrom: z.string().min(1, "Budget From is required"),
  budgetTo: z.string().min(1, "Budget To is required"),
  minMates: z.string().min(1, "Min Number of Mates is required"),
  maxMates: z.string().min(1, "Max Number of Mates is required"),
  travelType: z.nativeEnum(TravelType, { message: "Travel type is required" }),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  includes: z.string().optional(),
  visibility: z.string().default('PUBLIC'),
});

export const updateTravelPlanZodSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  destination: z.string().min(1, "Destination is required").optional(),
  startDate: z.string().min(1, "Start date is required").optional(),
  endDate: z.string().min(1, "End date is required").optional(),
  budgetFrom: z.string().optional(),
  budgetTo: z.string().optional(),
  travelType: z.enum(["SOLO", "FAMILY", "FRIENDS"]).optional(),
  description: z.string().optional(),
});
