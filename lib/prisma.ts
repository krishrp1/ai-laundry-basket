import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { env } from "@/lib/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Each serverless instance opens its own pg.Pool against Supabase's
  // pooler (port 6543); a low max keeps a burst of concurrent Vercel
  // invocations from exhausting the pooler's own connection budget.
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL, max: 3 });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
