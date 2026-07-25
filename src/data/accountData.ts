import {
  Activity,
  Lock,
  Laptop,
  Smartphone,
  Key,
} from "lucide-react";

export const activities = [
  {
    id: 1,
    title: "Session established",
    description: "Logged in via auth system.",
    time: "Just now",
    icon: Key,
    iconColor: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    id: 2,
    title: "Dashboard overview sync",
    description: "Successfully fetched active tasks and team members.",
    time: "10 mins ago",
    icon: Activity,
    iconColor: "text-blue-500 bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    id: 3,
    title: "Security keys loaded",
    description: "Retrieved user credentials.",
    time: "15 mins ago",
    icon: Lock,
    iconColor: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/20",
  },
];

export const sessions = [
  {
    device: "Windows 11 PC",
    browser: "Chrome Browser (Current Session)",
    location: "London, UK",
    status: "Active Now",
    icon: Laptop,
  },
  {
    device: "iPhone 15 Pro",
    browser: "Safari Browser",
    location: "Paris, FR",
    status: "2 days ago",
    icon: Smartphone,
  },
];
