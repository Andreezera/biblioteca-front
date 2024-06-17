import { z } from "zod";

export const envSchema = z.object({
  MODE: z.enum(["production", "development", "test"]),
  VITE_API_URL: z.string(),
});

export const env = envSchema.parse(import.meta.env);
