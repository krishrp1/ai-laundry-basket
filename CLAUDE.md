# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Git commits

Never add AI attribution to commit messages. Do not include:
- Co-Authored-By: Claude
- Generated with Claude Code

## Next.js version

**Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`.** This repo runs a non-stock Next.js — APIs, conventions, and file structure may differ from training data (e.g. `proxy.ts` at the repo root is this version's replacement for `middleware.ts`; see `proxy.ts` and `next.config.ts`).

## Commands

```bash
npm install          # postinstall runs `prisma generate` -> generated/prisma (gitignored)
npm run dev           # dev server (Turbopack)
npm run build         # production build
npm run lint           # ESLint
npx tsc --noEmit       # typecheck (no separate script in package.json)
npm test               # tsx --test lib/**/*.test.ts (node:test, no framework)
npx tsx --test lib/pricing-engine.test.ts   # run a single test file
npx tsx --test --test-name-pattern="coupon" lib/pricing-engine.test.ts  # run matching test cases

npm run db:migrate     # create/apply a migration in development (writes to prisma/migrations)
npm run db:deploy      # apply existing migrations in production, no schema diffing
npm run db:seed        # (re-)seed the admin user + default services from .env
npm run db:studio      # Prisma Studio
```

Tests only cover the pure-function layer (`lib/pricing-engine.test.ts`, `lib/site-url.test.ts`) — nothing hits the database. CI (`.github/workflows/ci.yml`) runs typecheck + lint + test on push/PR to `main`; it does not run `next build` or touch the database.

## Architecture

**Two independent surfaces sharing one Prisma schema:** a public marketing site (`app/(marketing)/*`, fully static-renderable) and a password-protected admin dashboard (`app/admin/*`, `force-dynamic`). There are no API routes — every mutation is a Server Action under `lib/actions/`.

**Auth is a custom JWT-in-cookie session, not middleware-enforced:**
- `lib/session.ts` signs/verifies an HS256 JWT (`jose`) stored in the httpOnly `admin_session` cookie.
- `proxy.ts` only checks that the cookie *exists* (no DB call) and redirects `/admin/*` to `/admin/login` if absent — it is explicitly not the authorization boundary.
- Real authorization is `lib/auth/dal.ts`: `verifySession()` decodes the JWT (redirects if invalid), `getCurrentAdmin()` re-reads the admin row from the DB (doesn't trust the JWT payload), and `requireSuperAdmin()` gates destructive actions, redirecting to `/admin/forbidden` rather than throwing. Every admin Server Action calls one of these itself — don't assume the layout's check is enough.
- Role model is flat: `ADMIN` can manage all records; only `SUPER_ADMIN` can delete. There's no per-admin data partitioning (single-tenant business), so any authenticated admin can read/edit any record by design.

**Public form submissions (`lib/actions/contact.ts`, `lib/actions/quote.ts`) all follow the same pipeline** — reuse it for any new public-facing form:
1. `checkFormSpamSignals()` (honeypot + fill-time heuristics, `lib/spam-guards.ts`) — spam is silently accepted (fake success) so bots don't learn they were caught.
2. Zod validation (`lib/validations/*`).
3. `checkRateLimit()` (`lib/rate-limit.ts`) — Postgres-backed fixed-window counter (`RateLimitHit` table) using a `Serializable` transaction so concurrent requests can't both slip under the limit. No external cache/Redis.
4. `isDuplicateSubmission()` — same Serializable-transaction pattern, guards against double-click retries.
5. Prisma write, then a best-effort email via `lib/email/send.tsx` (`sendEmail` wraps every Resend call in an 8s timeout and never throws — a Resend outage must not fail a request that already persisted to the DB).

**Booking flow / entity relationships:** `QuoteRequest` -> (admin action `convertQuoteToOrderAction`) -> `LaundryOrder` (status `PENDING`) with a `OrderStatusHistory` row created at every status transition. `ContactMessage` is a separate, unrelated inbox. See README's "How the booking flow works" for the full status sequence.

**Pricing engine (`lib/pricing-engine.ts` + `config/pricing.ts`) is pure and outside the trust boundary:** `computeEstimate()`/`computeEstimate_UI()` power the homepage's live estimator display only. Quote/order creation never accepts a client-computed price — `quotedPrice`/`finalPrice` on `LaundryOrder` are set by an admin, not derived from estimator input. Don't wire the estimator's output directly into a write path.

**Database:** Prisma 7 with `@prisma/adapter-pg`, two connection strings — `DATABASE_URL` (pooled, port 6543, used at runtime, capped at `max: 3` connections per instance in `lib/prisma.ts` to avoid exhausting Supabase's pooler under serverless concurrency) and `DIRECT_URL` (direct, port 5432, migrations/seed only). The runtime connection uses a least-privilege `ai_laundry_app` Postgres role (see `prisma/migrations/20260729193000_create_least_privilege_app_role`), not the schema-owner role. Trigram GIN search indexes backing admin list search exist only as raw-SQL migrations (`20260725083045_...`) and are intentionally absent from `schema.prisma` — Prisma's schema DSL has no trigram/GIN syntax in this version; `prisma migrate dev` won't detect them, this is expected. Supabase RLS is deliberately left off — the app connects via Prisma/`DATABASE_URL` as a normal Postgres role, bypassing PostgREST, so RLS policies would only block Prisma's own queries. All authorization lives in `lib/auth/dal.ts` and the Server Actions.

**Env vars are validated once at import time** (`lib/env.ts`, Zod schema) — importing `@/lib/env` anywhere throws immediately with a readable list of what's missing/invalid, rather than failing later with an obscure error. Add new env vars to this schema, not just `.env.example`.

**Site URL resolution (`lib/site-url.ts`) has a documented footgun:** don't set `NEXT_PUBLIC_SITE_URL` in the Vercel dashboard unless there's a real custom domain — it overrides the Vercel-provided URL fallback chain and previously baked `localhost:3000` into production `robots.txt`/`sitemap.xml`/OG tags. Deploy via `git push`, not `vercel --prod` from a local checkout (the CLI uploads the local `.env`).

**CSP (`next.config.ts`) intentionally allows `'unsafe-inline'`** for `script-src`/`style-src` — this is a static-site-safe (no nonce) CSP because the site is fully statically prerendered; nonces would force dynamic rendering site-wide. The inline allowances exist specifically for Next's RSC hydration payload scripts and base-ui's runtime inline positioning styles, not general laxity — don't tighten this without reading the comment in full first.
