"use server";

import { zodValidator } from "@/lib/zodValidator";
import { serverFetch } from "@/lib/serverFetch";
import { updateUserProfileZodSchema } from "@/zod/auth.zodSchema";

export const updateUserProfile = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        const payload = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            bio: formData.get("bio"),
            currentLocation: formData.get("currentLocation"),
            interests: formData.get("interests") || '',
            visitedCountries: formData.get("visitedCountries") || '',
        };

        if (zodValidator(payload, updateUserProfileZodSchema).success === false) {
            return zodValidator(payload, updateUserProfileZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, updateUserProfileZodSchema)?.data;

        const updateUserData = {
            firstName: validatedPayload.firstName,
            lastName: validatedPayload.lastName,
            bio: validatedPayload.bio,
            currentLocation: validatedPayload.currentLocation,
            interests: validatedPayload.interests,
            visitedCountries: validatedPayload.visitedCountries
        }

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(updateUserData));

        if (formData.get("profileImage")) {
            newFormData.append("file", formData.get("profileImage") as Blob);
        }

        // Send request to backend
        const res = await serverFetch.patch("/user/update-user", {
            body: newFormData,
        });

        const result = await res.json();

        return result;
    } catch (error: any) {
        console.error("Error updating profile:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to update profile. Please try again.",
        };
    }
};
