import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUserCircle } from "react-icons/fa";
import { User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUserInfo } from "@/types/user.interface";
import LogoutUserButton from "@/components/LogoutUserButton";
import getLogedInUser from "@/services/user/userManagement";

interface IDropdownMenu {
  title: string;
  link: string;
  icon: React.ReactElement;
}

const DashboardNavbarProfile = async () => {
  const user = (await getLogedInUser()) as IUserInfo;

  const dropdownMenuList = [
    {
      title: "Profile",
      link:
        user?.role === "ADMIN"
          ? "/admin/dashboard/profile"
          : "/user/dashboard/profile",
      icon: <FaRegUserCircle />,
    },
  ];

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : user?.firstName
      ? user.firstName.slice(0, 2).toUpperCase()
      : null;

  return (
    <div className="flex items-center gap-5">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all cursor-pointer focus:outline-none"
            >
              <Avatar className="size-9 rounded-full border border-gray-200">
                {user?.profileImage && (
                  <AvatarImage
                    src={user.profileImage}
                    alt={user.firstName ? `${user.firstName} ${user.lastName || ""}` : "User"}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                  {initials || <User className="size-4 text-gray-600" />}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="text-sm font-semibold">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex flex-col text-left items-start gap-0.5">
                <h4 className="font-semibold text-sm text-gray-900">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Guest User"}
                </h4>
                <p className="text-xs text-gray-500 truncate w-full">{user?.email}</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {dropdownMenuList.length > 0 &&
                dropdownMenuList.map((item: IDropdownMenu, index: number) => {
                  return (
                    <Link
                      href={item?.link}
                      key={index}
                      className="cursor-pointer"
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        {item?.title}
                        <DropdownMenuShortcut>
                          {item?.icon}
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  );
                })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-transparent focus:bg-transparent p-0">
              <LogoutUserButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardNavbarProfile;

