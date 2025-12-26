export const dynamic = "force-dynamic";

import { getMyProfile } from "@/services/user/userManagement";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const user = await getMyProfile();

  return (
    <div className="mx-auto py-2 px-4">
      <ProfileClient user={user?.data} />
    </div>
  );
}
