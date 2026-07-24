"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import { checkRateLimit, rateLimitKey } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";

const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1),
});

export type LoginState =
  | { status: "idle" }
  | { status: "error"; message: string };

const GENERIC_ERROR = "Invalid email or password.";

export async function loginAdmin(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: GENERIC_ERROR };
  }

  const { email, password } = parsed.data;
  const ip = await getClientIp();

  const rateLimit = await checkRateLimit(rateLimitKey("admin-login", `${ip}:${email}`), {
    limit: 5,
    windowSeconds: 15 * 60,
  });
  if (!rateLimit.allowed) {
    return {
      status: "error",
      message: "Too many login attempts. Please try again in a few minutes.",
    };
  }

  const admin = await db.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return { status: "error", message: GENERIC_ERROR };
  }

  const passwordValid = await bcrypt.compare(password, admin.passwordHash);
  if (!passwordValid) {
    return { status: "error", message: GENERIC_ERROR };
  }

  await createSession({ adminId: admin.id, email: admin.email, role: admin.role });
  await db.adminUser.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  await deleteSession();
  redirect("/admin/login");
}
