-- Security hardening: the app's runtime connection used the default
-- Supabase `postgres` role (schema owner, full DDL/DML rights across the
-- whole database) for every Prisma query. A dedicated, least-privilege
-- role confines the running app to exactly the CRUD it needs on its own
-- tables -- nothing else -- so a bug or a leaked runtime connection string
-- can't be used to alter schema, drop tables, or touch anything outside
-- this app's own data model.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'ai_laundry_app') THEN
    CREATE ROLE ai_laundry_app WITH LOGIN;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO ai_laundry_app;

GRANT SELECT, INSERT, UPDATE, DELETE ON
  "Customer", "PickupAddress", "Service", "QuoteRequest", "LaundryOrder",
  "OrderStatusHistory", "ContactMessage", "AdminUser", "RateLimitHit"
  TO ai_laundry_app;

-- Cover future tables created by this app's own migrations too, so a new
-- model doesn't silently need a manual grant added.
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ai_laundry_app;

-- Sequences back every @default(autoincrement()) id column.
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ai_laundry_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO ai_laundry_app;
