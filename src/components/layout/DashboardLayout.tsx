import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import TopBar from "./Topbar";
import { useSidebarStore } from "@/stores/useSidebarStore";

export default function DashboardLayout() {
  const sidebarOpen = useSidebarStore((state) => state.sidebarOpen);
  const setSidebarOpen = useSidebarStore((state) => state.setSidebarOpen);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <DashboardSidebar />
      <main className="flex min-h-screen flex-1 flex-col min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
