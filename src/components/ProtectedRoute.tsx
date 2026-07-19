import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
