"use server";
import { getInputFieldError } from "@/utils/getInputFieldError";

export async function updateUserProfile(prev: any, formData: FormData) {
  try {
    

    return { success: true };
  } catch (err) {
    return { success: false, message: "Update failed" };
  }
}


export async function changeUserPassword(prev: any, formData: FormData) {
  try {
    

    return { success: true };
  } catch (err) {
    return { success: false, message: "Password update failed" };
  }
}
