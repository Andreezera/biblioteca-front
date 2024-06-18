import { api } from "@/lib/axios";
import { jwtDecode } from "jwt-decode";

export async function login(body: { email: string; password: string }) {
  const { data } = await api.post<{ token: string }>("/auth/login", body);
  return data;
}

export async function register(body: {
  role: string;
  email: string;
  password: string;
}) {
  const { data } = await api.post("/auth/register", body);
  return data;
}

export function logout() {
  sessionStorage.removeItem("token");
}

export function setToken(userToken: string) {
  sessionStorage.setItem("token", userToken);
}

export function getToken() {
  const tokenString = sessionStorage.getItem("token");
  return tokenString;
}

export function isAuthenticate() {
  const token = getToken();

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp && decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
}
