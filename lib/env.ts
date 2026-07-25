import "server-only";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  DATABASE_URL: z.url({ error: "DATABASE_URL must be a valid connection string" }),

  SESSION_SECRET: z
    .string()
    .min(32, { error: "SESSION_SECRET must be at least 32 characters" }),

  ADMIN_EMAIL: z.email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  ADMIN_NAME: z.string().optional(),

  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  BUSINESS_NOTIFICATION_EMAIL: z.email().optional(),

  NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Invalid environment variables. Check your .env file:\n${issues}`
    );
  }

  return parsed.data;
}

export const env = loadEnv();
