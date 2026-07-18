import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import TopBar from "./Topbar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex min-h-screen flex-1 flex-col">
        <TopBar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
