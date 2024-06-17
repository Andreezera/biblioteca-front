import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <RequireAuth fallbackPath={"/login"}>
        <HomePage />
      </RequireAuth>
    ),
    children: [],
  },
]);
