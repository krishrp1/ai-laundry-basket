export type SiteUrlEnv = {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  VERCEL_URL?: string;
};

/**
 * No custom domain yet — fall back through explicit override, then Vercel's
 * own auto-assigned URLs (production alias first, then the per-deployment
 * one), then localhost. Swap in a real domain here once one exists.
 */
export function resolveSiteUrl(env: SiteUrlEnv): string {
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL;
  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return "http://localhost:3000";
}
