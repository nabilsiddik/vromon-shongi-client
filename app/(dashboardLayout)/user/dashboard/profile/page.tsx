export const dynamic = "force-dynamic";

import { getMyProfile } from "@/services/user/userManagement";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const user = await getMyProfile();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <ProfileClient user={user?.data} />
    </div>
  );
}
