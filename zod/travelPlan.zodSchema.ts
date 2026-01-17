import { TravelType } from "@/types/travelPlan.interface";
import z from "zod";

export const travelPlanZodSchema = z.object({
  title: z.string('Title is Required').min(3, "Title length must be at least 3"),
  destination: z.string('Destination is Required').min(3, "Destination length must be at least 3"),
  startDate: z.string('Start Date is Required'),
  endDate: z.string('End date is required'),
  budgetFrom: z.string('Budget From is Required'),
  budgetTo: z.string('Budget To is Required'),
  minMates: z.string('Min Number of Mate is Required'),
  maxMates: z.string('Max Number of Mate is Required'),
  travelType: z.nativeEnum(TravelType, "Travel type is required"),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  includes: z.string().optional(),
  visibility: z.string().default('PUBLIC'),
});

export const updateTravelPlanZodSchema = z.object({
  destination: z.string().min(1, "Destination is required").optional(),
  startDate: z.string().min(1, "Start date is required").optional(),
  endDate: z.string().min(1, "End date is required").optional(),
  budgetRange: z.string().optional(),
  travelType: z.enum(["SOLO", "FAMILY", "FRIENDS"]).optional(),
  description: z.string().optional(),
});
