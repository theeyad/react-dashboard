import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import dashboardLogo from "@/assets/dashboard-sidebar-logo.svg";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { navMainData } from "@/data/navigationData";
import { useAuthStore } from "@/stores/useAuthStore";

export default function DashboardSidebar() {
  const user = useAuthStore((state) => state.user);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <img className="p-1" src={dashboardLogo} alt="dashboard icon" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Dashboard</span>
                <span className="text-xs text-muted-foreground">Admin Panel</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
