"use client";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Activity,
  ActivityIcon,
  BaggageClaim,
  GitPullRequestIcon,
  LayoutDashboard,
  List,
  ListCheck,
  MessageSquareDiff,
  PersonStanding,
  PlaneTakeoff,
  Send,
  Settings,
  Star,
  User,
  User2,
  Users,
} from "lucide-react";
import { IUserInfo } from "@/types/user.interface";

const data = {
  adminNavItems: [
    {
      title: "Overview",
      icon: <LayoutDashboard />,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: <LayoutDashboard />,
        },
        {
          title: "Activities & Analytics",
          url: "/admin/dashboard/activity",
          icon: <ActivityIcon />,
        },
      ],
    },
    {
      title: "User Management",
      icon: <User />,
      isActive: false,
      items: [
        {
          title: "Users",
          url: "/admin/dashboard/users",
          icon: <PersonStanding />,
        },
      ],
    },
    {
      title: "Travel Management",
      icon: <PlaneTakeoff />,
      isActive: false,
      items: [
        {
          title: "Travel Plans",
          url: "/admin/dashboard/travel-plans",
          icon: <BaggageClaim />,
        },
      ],
    },
  ],
  userNavItems: [
    {
      title: "Overview",
      icon: <LayoutDashboard />,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/user/dashboard",
          icon: <LayoutDashboard />,
        },
      ],
    },
    {
      title: "Travel Plans",
      icon: <PlaneTakeoff />,
      isActive: false,
      items: [
        {
          title: "Create Plan",
          url: "/user/dashboard/create-plan",
          icon: <BaggageClaim />,
        },
        {
          title: "My Plans",
          url: "/user/dashboard/my-travel-plans",
          icon: <List />,
        },
        {
          title: "Matched Travelers",
          url: "/user/dashboard/matched-travelers",
          icon: <Users />,
        },
      ],
    },
    {
      title: "Trip Requests",
      icon: <GitPullRequestIcon />,
      isActive: false,
      items: [
        {
          title: "Incoming Requests",
          url: "/user/dashboard/incoming-requests",
          icon: <ListCheck />,
        },
        {
          title: "Outgoing Requests",
          url: "/user/dashboard/outgoing-requests",
          icon: <Send />,
        },
      ],
    },
    {
      title: "Reviews",
      icon: <Star />,
      isActive: false,
      items: [
        {
          title: "Given Reviews",
          url: "/user/dashboard/given-reviews",
          icon: <MessageSquareDiff />,
        },
        {
          title: "Received Reviews",
          url: "/user/dashboard/received-reviews",
          icon: <MessageSquareDiff />,
        },
      ],
    },
    {
      title: "Settings",
      icon: <Settings />,
      isActive: false,
      items: [
        {
          title: "Profile",
          url: "/user/dashboard/profile",
          icon: <User2 />,
        },
      ],
    },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  userInfo: IUserInfo;
};

export function AppSidebar({ userInfo, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain
          adminNavItems={data.adminNavItems}
          userNavItems={data.userNavItems}
          userInfo={userInfo}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
