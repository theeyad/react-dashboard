import { lazy } from "react";

export const LoginPage = lazy(() => import("./LoginPage"));
export const OverviewPage = lazy(() => import("./OverviewPage"));
export const TasksPage = lazy(() => import("./TasksPage"));
export const TaskDetailPage = lazy(() => import("./TaskDetailPage"));
export const TeamPage = lazy(() => import("./TeamPage"));
export const TeamMemberPage = lazy(() => import("./TeamMemberPage"));
export const AnalyticsPage = lazy(() => import("./AnalyticsPage"));
export const SettingsPage = lazy(() => import("./SettingsPage"));
