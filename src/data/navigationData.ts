import { TbDashboard, TbListDetails, TbSettings, TbChartBar, TbUsers } from "react-icons/tb";
import { BadgeCheck } from "lucide-react";

export const navMainData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: TbDashboard,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: TbChartBar,
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: TbListDetails,
  },
  {
    title: "Team",
    url: "/dashboard/team",
    icon: TbUsers,
  },
  {
    title: "Account",
    url: "/dashboard/account",
    icon: BadgeCheck,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: TbSettings,
  },
];