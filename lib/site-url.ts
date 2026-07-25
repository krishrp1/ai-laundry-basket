export type SiteUrlEnv = {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  VERCEL_URL?: string;
};

/**
 * No custom domain yet — fall back through explicit override, then Vercel's
 * own auto-assigned URLs (production alias first, then the per-deployment
 * one), then localhost. Swap in a real domain here once one exists.
 *
 * Do NOT set NEXT_PUBLIC_SITE_URL in the Vercel dashboard until that real
 * domain exists. It was set there once to a leftover local value
 * ("http://localhost:3000"), which took priority over the Vercel-provided
 * URLs below and baked "localhost:3000" into every static page, robots.txt,
 * sitemap.xml, and OG tag in production. Leaving it unset lets this function
 * resolve the correct URL on its own for every environment.
 *
 * Also: deploy via `git push`, not `vercel --prod` from a local checkout —
 * the CLI uploads the local .env file as part of the deploy, which silently
 * reintroduces the same bug if NEXT_PUBLIC_SITE_URL is set locally for dev.
 */
export function resolveSiteUrl(env: SiteUrlEnv): string {
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL;
  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return "http://localhost:3000";
}
