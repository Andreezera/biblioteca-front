import { getToken } from "@/api/auth-service";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateWrapper() {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to="/login" />;
}
