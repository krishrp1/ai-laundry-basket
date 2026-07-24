# AI Laundry Basket

Production MVP for AI Laundry Basket: a marketing site plus the backend needed to
actually run the business — quote requests, bookings, an order workflow, a
password-protected admin dashboard, and transactional email.

## Tech stack

- **Next.js 16** (App Router, Server Actions, Turbopack)
- **TypeScript**, **Tailwind CSS v4**
- **Prisma 7** ORM with a Postgres driver adapter (`@prisma/adapter-pg`)
- **PostgreSQL** (Supabase in production)
- **Zod** for validation
- **Resend** + **@react-email/components** for transactional email
- **Vercel Blob** for quote-photo uploads
- **jose** (JWT) + **bcryptjs** for a small custom admin-auth system (no third-party auth provider)

## How the booking flow works

1. A visitor submits **Request a Quote** → creates a `QuoteRequest` row and emails
   the customer + the business inbox.
2. An admin reviews it in `/admin/quotes` and clicks **Convert to order** →
   creates a `LaundryOrder` (status `PENDING`) linked back to the quote, with the
   first entry in its status history, and emails the customer a booking
   confirmation.
3. The admin advances the order through the workflow from `/admin/orders/[id]`:
   `Pending → Confirmed → Pickup Scheduled → Picked Up → Cleaning → Quality Check
   → Ready for Delivery → Out for Delivery → Delivered` (or `Cancelled`). Every
   change is recorded in `OrderStatusHistory` and emails the customer.

The **Contact** form is separate and creates a `ContactMessage`, managed from
`/admin/messages`.

## Environment variables

Copy `.env.example` to `.env` and fill in real values (see setup steps below for
where each one comes from):

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | Supabase **pooled** connection string (port `6543`, `pgbouncer=true`) — used by the app at runtime |
| `DIRECT_URL` | Yes | Supabase **direct** connection string (port `5432`) — used only by `prisma migrate`/`db seed` |
| `SESSION_SECRET` | Yes | 32+ byte random secret signing the admin session JWT. Generate with `openssl rand -base64 32` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Yes (for seeding) | Bootstraps the first admin user via `npm run db:seed`. Not read at runtime after that — change the password from the database afterward if desired |
| `RESEND_API_KEY` | Recommended | Enables transactional email. Without it, forms still save to the database — emails are skipped with a console warning instead of failing the request |
| `EMAIL_FROM` | Recommended | Verified sender, e.g. `AI Laundry Basket <no-reply@yourdomain.com>` |
| `BUSINESS_NOTIFICATION_EMAIL` | Recommended | Inbox that receives new-quote/booking/contact alerts |
| `BLOB_READ_WRITE_TOKEN` | Optional | Enables quote-photo uploads via Vercel Blob. Without it, uploads are skipped (the rest of the quote request still saves) |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical origin for non-production deploys |

## Local development

### 1. Install dependencies

```bash
npm install
```

`postinstall` runs `prisma generate`, which writes the generated Prisma Client
into `generated/prisma` (gitignored, regenerated automatically).

### 2. Set up a Postgres database

Easiest path: create a free [Supabase](https://supabase.com) project, then from
**Project Settings → Database**:
- Copy the **connection pooling** string (port `6543`) into `DATABASE_URL`, and
  append `?pgbouncer=true` if it isn't already there.
- Copy the **direct connection** string (port `5432`) into `DIRECT_URL`.

(Any Postgres works, including a local instance — just set both variables to
point at it.)

### 3. Run migrations and seed the first admin user

```bash
npm run db:migrate   # applies prisma/migrations, creates tables
npm run db:seed       # creates the admin user + default services from .env
```

### 4. Configure Resend and Vercel Blob (optional but recommended)

- [Resend](https://resend.com): create an API key, verify a sending domain, set
  `RESEND_API_KEY` and `EMAIL_FROM`.
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob): create a Blob
  store on your Vercel project, copy its read/write token into
  `BLOB_READ_WRITE_TOKEN`.

Both are optional for local development — the app degrades gracefully (logs a
warning, keeps the DB write) if either is missing.

### 5. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000` for the marketing site and
`http://localhost:3000/admin/login` for the admin dashboard (sign in with
`ADMIN_EMAIL`/`ADMIN_PASSWORD`).

## Useful scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Create/apply a migration in development |
| `npm run db:deploy` | Apply existing migrations in production (no schema diffing) |
| `npm run db:seed` | (Re-)seed the admin user and default services |
| `npm run db:studio` | Open Prisma Studio to browse the database |

## Deploying

### Database — Supabase

1. Create a Supabase project.
2. Set `DATABASE_URL` (pooled) and `DIRECT_URL` (direct) in your Vercel project's
   environment variables.
3. After the first deploy (or locally, pointed at the production database), run:
   ```bash
   npm run db:deploy
   npm run db:seed
   ```

### Frontend — Vercel

1. Import the repository into Vercel.
2. Add all environment variables from the table above in **Project Settings →
   Environment Variables**.
3. Deploy. `postinstall` regenerates the Prisma Client automatically as part of
   the build.
4. Add the Vercel Blob integration/store to the project if you want quote-photo
   uploads to work in production.

### Email — Resend

Verify your sending domain in Resend so `EMAIL_FROM` isn't flagged as spam, then
set `RESEND_API_KEY` and `BUSINESS_NOTIFICATION_EMAIL` in Vercel.

## Security notes

- Admin auth is a custom JWT-in-httpOnly-cookie session (`lib/session.ts`), not a
  third-party provider — there's exactly one role hierarchy (`ADMIN` /
  `SUPER_ADMIN`) and no public sign-up route. Create additional admins via
  Prisma Studio or a script that hashes a password with `bcryptjs`.
- `proxy.ts` does a cheap, cookie-only redirect for unauthenticated `/admin/*`
  requests; the real authorization check happens in `lib/auth/dal.ts` and inside
  every admin Server Action, per Next.js's guidance that Proxy/Middleware is not
  a substitute for per-request authorization.
- Rate limiting (`lib/rate-limit.ts`) and duplicate/honeypot spam guards
  (`lib/spam-guards.ts`) run inside the contact/quote/login Server Actions,
  backed by a `RateLimitHit` Postgres table — no external cache required.
- Server Actions get Next.js's built-in Origin/Host CSRF check for free; combined
  with `SameSite=Lax` cookies this covers the standard CSRF threat model.
