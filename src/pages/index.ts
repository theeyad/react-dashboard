import { lazy } from "react";

export const LoginPage = lazy(() => import("./LoginPage"));
export const OverviewPage = lazy(() => import("./OverviewPage"));
export const TasksPage = lazy(() => import("./TasksPage"));
export const TeamPage = lazy(() => import("./TeamPage"));
export const AnalyticsPage = lazy(() => import("./AnalyticsPage"));
export const SettingsPage = lazy(() => import("./SettingsPage"));
export const AccountPage = lazy(() => import("./AccountPage"));
export const NotFoundPage = lazy(() => import("./NotFoundPage"));
