import axios from "axios";

import { getToken } from "@/api/auth-service";
import { env } from "@/env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
