import "./App.css";
import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router";
import PageLoader from "./components/PageLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import {
  LoginPage,
  OverviewPage,
  TasksPage,
  TeamPage,
  AnalyticsPage,
  SettingsPage,
  AccountPage,
  NotFoundPage,
} from "./pages";

function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected — wrapped in auth guard */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<OverviewPage />} />
              <Route path="/dashboard/tasks" element={<TasksPage />} />
              <Route path="/dashboard/team" element={<TeamPage />} />
              <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
              <Route path="/dashboard/account" element={<AccountPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
