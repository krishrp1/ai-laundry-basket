/**
 * Single source of truth for every social media link on the site (footer,
 * structured data sameAs, etc). Update the `href` values here once real
 * accounts exist — nothing else needs to change.
 */
export type SocialPlatform = "instagram" | "facebook" | "linkedin" | "x";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  { platform: "instagram", label: "Instagram", href: "#" },
  { platform: "facebook", label: "Facebook", href: "#" },
  { platform: "linkedin", label: "LinkedIn", href: "#" },
  { platform: "x", label: "X (Twitter)", href: "#" },
];
