import ProfileClient from "@/app/(dashboardLayout)/user/dashboard/profile/ProfileClient";
import { getUserById } from "@/services/user/userManagement";

export default async function TravelerProfile({ params }: { params: any }) {
  const { id } = await params;
  const user = await getUserById(id);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-[65px] py-10">
      <ProfileClient user={user?.data} />
    </div>
  );
}
