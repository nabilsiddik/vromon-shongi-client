"use client";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import InputFieldError from "@/components/InputFieldError";
import { changeUserPassword, updateUserProfile } from "@/services/user/userProfileManagement";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileClient({ user }: { user: any }) {
    const [edit, setEdit] = useState(false);

    const [profileState, profileAction, isProfileUpdating] =
        useActionState(updateUserProfile, null);

    useEffect(() => {
        if (profileState?.message && !profileState.success) {
            toast.error(profileState.message);
        } else if (profileState?.success) {
            toast.success("Profile updated successfully!");
            setEdit(false);
        }
    }, [profileState]);

    // ---- PASSWORD CHANGE ----
    const [passState, passAction, isPassUpdating] =
        useActionState(changeUserPassword, null);

    useEffect(() => {
        if (passState?.message && !passState.success) {
            toast.error(passState.message);
        } else if (passState?.success) {
            toast.success("Password updated successfully!");
        }
    }, [passState]);

    return (
        <div className="space-y-10">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">My Profile</h2>
                <Button variant="ghost" onClick={() => setEdit(!edit)}>
                    {edit ? "Cancel" : "Edit Profile"}
                </Button>
            </div>

            {/* TOP SECTION */}
            <div className="flex flex-col md:flex-row gap-10 border rounded-xl p-6 bg-white shadow-sm">

                {/* PROFILE IMAGE */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border shadow">
                        <Image
                            src={user.profileImage || "/placeholder-user.jpg"}
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {user.verifiedBadge && (
                        <span className="flex items-center gap-1 text-blue-600 font-medium">
                            <BadgeCheck className="w-5 h-5" />
                            Verified User
                        </span>
                    )}
                </div>

                {/* BASIC INFORMATION */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-500">Name</p>
                        <p className="font-semibold">{user.name}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-semibold">{user.email}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Gender</p>
                        <p className="font-semibold capitalize">{user.gender}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Current Location</p>
                        <p className="font-semibold">{user.currentLocation || "N/A"}</p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="text-gray-500">Bio</p>
                        <p className="font-semibold">{user.bio || "No bio added"}</p>
                    </div>
                </div>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl border shadow-sm bg-white">
                    <p className="text-gray-500">Interests</p>
                    <p className="font-semibold">{user.interests?.length} items</p>
                </div>

                <div className="p-5 rounded-xl border shadow-sm bg-white">
                    <p className="text-gray-500">Visited Countries</p>
                    <p className="font-semibold">{user.visitedCountries?.length} countries</p>
                </div>

                <div className="p-5 rounded-xl border shadow-sm bg-white">
                    <p className="text-gray-500">Created Travel Plans</p>
                    <p className="font-semibold">{user.createdTravelPlans?.length} plans</p>
                </div>
            </div>

            {/* EDITABLE PROFILE FORM */}
            {edit && (
                <div className="border rounded-xl p-6 shadow-sm bg-white">
                    <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

                    <form noValidate action={profileAction} className="space-y-6 max-w-2xl">

                        <FieldGroup>
                            <Field>
                                <FieldLabel>Name</FieldLabel>
                                <Input name="name" defaultValue={user.name} />
                                <InputFieldError field="name" state={profileState as any} />
                            </Field>

                            <Field>
                                <FieldLabel>Bio</FieldLabel>
                                <Textarea name="bio" defaultValue={user.bio} />
                            </Field>

                            <Field>
                                <FieldLabel>Current Location</FieldLabel>
                                <Input name="currentLocation" defaultValue={user.currentLocation} />
                            </Field>

                            <Field>
                                <FieldLabel>Gender</FieldLabel>
                                <select name="gender" className="border rounded-md p-2 w-full">
                                    <option value="MALE" selected={user.gender === "MALE"}>Male</option>
                                    <option value="FEMALE" selected={user.gender === "FEMALE"}>Female</option>
                                    <option value="OTHER" selected={user.gender === "OTHER"}>Other</option>
                                </select>
                            </Field>

                            <Field>
                                <FieldLabel>Interests (comma separated)</FieldLabel>
                                <Input
                                    name="interests"
                                    defaultValue={user.interests?.join(", ")}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Visited Countries (comma separated)</FieldLabel>
                                <Input
                                    name="visitedCountries"
                                    defaultValue={user.visitedCountries?.join(", ")}
                                />
                            </Field>

                            <Button type="submit" disabled={isProfileUpdating}>
                                {isProfileUpdating ? "Saving..." : "Save Changes"}
                            </Button>
                        </FieldGroup>
                    </form>
                </div>
            )}

            {/* PASSWORD CHANGE */}
            {edit && (
                <div className="border rounded-xl p-6 shadow-sm bg-white">
                    <h3 className="text-xl font-semibold mb-4">Change Password</h3>

                    <form noValidate action={passAction} className="space-y-6 max-w-2xl">

                        <FieldGroup>
                            <Field>
                                <FieldLabel>Current Password</FieldLabel>
                                <Input name="currentPassword" type="password" />
                                <InputFieldError field="currentPassword" state={passState as any} />
                            </Field>

                            <Field>
                                <FieldLabel>New Password</FieldLabel>
                                <Input name="newPassword" type="password" />
                            </Field>

                            <Field>
                                <FieldLabel>Confirm Password</FieldLabel>
                                <Input name="confirmPassword" type="password" />
                            </Field>

                            <Button type="submit" disabled={isPassUpdating}>
                                {isPassUpdating ? "Updating..." : "Update Password"}
                            </Button>
                        </FieldGroup>
                    </form>
                </div>
            )}
        </div>
    );
}
