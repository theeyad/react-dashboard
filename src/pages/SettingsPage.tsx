import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useTheme } from "@/components/ThemeProvider";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuthStore } from "@/stores/useAuthStore";

export default function SettingsPage() {
  const { setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const logout = useAuthStore((s) => s.logout);

  const documentTitle = useDocumentTitle();
  return (
    <>
      <h1 className="text-2xl font-bold">{documentTitle}</h1>
      <div className="px-4 py-6 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="@container/card">
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Change the theme of the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 cursor-pointer hover:bg-muted"
                onClick={() => setTheme("light")}
              >
                Light
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 cursor-pointer hover:bg-muted"
                onClick={() => setTheme("dark")}
              >
                Dark
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 cursor-pointer hover:bg-muted"
                onClick={() => setTheme("system")}
              >
                System
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardTitle>Sidebar Settings</CardTitle>
            <CardDescription>Set sidebar preference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 cursor-pointer hover:bg-muted"
                onClick={() => toggleSidebar()}
              >
                Toggle Sidebar
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="@container/card col-span-2">
          <CardHeader>
            <CardTitle>Log Settings</CardTitle>
            <CardDescription>Log out of your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="lg"
                className="flex-1 cursor-pointer hover:bg-destructive/80"
                onClick={() => logout()}
              >
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
