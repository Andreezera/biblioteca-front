import { isAuthenticate } from "@/api/auth-service";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateWrapper() {
  return isAuthenticate() ? <Outlet /> : <Navigate to="/login" />;
}
