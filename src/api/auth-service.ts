import { api } from "@/lib/axios";

export async function login(body: { email: string; password: string }) {
  const { data } = await api.post<{ token: string }>("/login", body);
  return data;
}

export async function register(body: {
  role: string;
  email: string;
  password: string;
}) {
  const { data } = await api.post("/register", body);
  return data;
}
