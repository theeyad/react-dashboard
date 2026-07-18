import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!user || !isAuthenticated())
    return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}
