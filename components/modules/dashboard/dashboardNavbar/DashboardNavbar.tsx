import { IUserInfo } from "@/types/user.interface";
import DashboardNavbarContent from "./DashboardNavbarContent";
import getLogedInUser from "@/services/user/userManagement";

const DashboardNavbar = async () => {
  const userInfo: IUserInfo | null = await getLogedInUser();

  return (
    <header className="flex h-20 py-2 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="w-full">
        <DashboardNavbarContent userInfo={userInfo} />
      </div>
    </header>
  );
};

export default DashboardNavbar;
