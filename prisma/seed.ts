import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const seedServices = [
  {
    name: "Wash & Fold",
    slug: "wash-fold",
    description: "Everyday laundry washed, dried, and neatly folded.",
    unit: "per lb",
  },
  {
    name: "Dry Cleaning",
    slug: "dry-cleaning",
    description: "Professional dry cleaning for delicate and formal garments.",
    unit: "per item",
  },
  {
    name: "Pickup & Delivery",
    slug: "pickup-delivery",
    description: "Doorstep pickup and delivery for any service.",
    unit: "per order",
  },
  {
    name: "Commercial Laundry",
    slug: "commercial-laundry",
    description: "Bulk laundry service for businesses and properties.",
    unit: "per lb",
  },
  {
    name: "Ironing & Pressing",
    slug: "ironing-pressing",
    description: "Crisp, press-perfect finishing for shirts and linens.",
    unit: "per item",
  },
  {
    name: "Stain Treatment",
    slug: "stain-treatment",
    description: "Targeted treatment for tough or set-in stains.",
    unit: "per item",
  },
];

async function main() {
  const connectionString = process.env.DATABASE_URL ?? process.env.DIRECT_URL;
  if (!connectionString) {
    throw new Error(
      "Set DATABASE_URL (or DIRECT_URL) before running the seed script."
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env to seed the first admin user."
    );
  }
  if (adminPassword.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters.");
  }

  const db = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  try {
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    const admin = await db.adminUser.upsert({
      where: { email: adminEmail.toLowerCase() },
      update: { passwordHash, name: process.env.ADMIN_NAME },
      create: {
        email: adminEmail.toLowerCase(),
        passwordHash,
        name: process.env.ADMIN_NAME ?? "Admin",
        role: "SUPER_ADMIN",
      },
    });
    console.log(`Admin user ready: ${admin.email}`);

    for (const service of seedServices) {
      await db.service.upsert({
        where: { slug: service.slug },
        update: service,
        create: service,
      });
    }
    console.log(`Seeded ${seedServices.length} services.`);
  } finally {
    await db.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
