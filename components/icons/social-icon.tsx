import type { SocialPlatform } from "@/config/social";

/**
 * lucide-react ships no brand marks, and hand-drawn brand SVGs are easy to
 * get subtly wrong — so these render as small monogram badges instead.
 * Swap in real brand icons/assets whenever the social accounts go live.
 */
const labels: Record<SocialPlatform, string> = {
  instagram: "IG",
  facebook: "f",
  linkedin: "in",
  x: "X",
};

export function SocialIcon({ platform }: { platform: SocialPlatform }) {
  return (
    <span aria-hidden="true" className="text-[11px] font-bold tracking-tight">
      {labels[platform]}
    </span>
  );
}
