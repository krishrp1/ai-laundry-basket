import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Status colors follow the brand palette in a deliberate progression rather
// than arbitrary hues: primary (new/created) -> secondary sky (in progress)
// -> brand accent green (success/complete), plus neutral (archived) and
// destructive (spam/cancelled, kept red since that's this theme's own
// destructive token and a near-universal danger convention).
const STATUS_COLORS: Record<string, string> = {
  // New / informational
  NEW: "border-primary/20 bg-primary/10 text-primary",
  PENDING: "border-primary/20 bg-primary/10 text-primary",

  // In progress (early stage)
  CONTACTED: "border-[var(--chart-2)]/25 bg-[var(--chart-2)]/10 text-chart-2-strong",
  READ: "border-[var(--chart-2)]/25 bg-[var(--chart-2)]/10 text-chart-2-strong",
  CONFIRMED: "border-[var(--chart-2)]/25 bg-[var(--chart-2)]/10 text-chart-2-strong",
  PICKUP_SCHEDULED: "border-[var(--chart-2)]/25 bg-[var(--chart-2)]/10 text-chart-2-strong",

  // Active processing (deeper primary tint)
  PICKED_UP: "border-primary/30 bg-primary/15 text-primary",
  CLEANING: "border-primary/30 bg-primary/15 text-primary",
  QUALITY_CHECK: "border-primary/30 bg-primary/15 text-primary",

  // Moving toward completion (deeper secondary tint)
  READY_FOR_DELIVERY: "border-[var(--chart-2)]/35 bg-[var(--chart-2)]/15 text-chart-2-strong",
  OUT_FOR_DELIVERY: "border-[var(--chart-2)]/35 bg-[var(--chart-2)]/15 text-chart-2-strong",

  // Success / complete
  CONVERTED: "border-brand-accent/25 bg-brand-accent/10 text-brand-accent-strong",
  REPLIED: "border-brand-accent/25 bg-brand-accent/10 text-brand-accent-strong",
  DELIVERED: "border-brand-accent/25 bg-brand-accent/10 text-brand-accent-strong",

  // Neutral / archived
  CLOSED: "border-transparent bg-muted text-muted-foreground",

  // Negative / terminal
  SPAM: "border-destructive/20 bg-destructive/10 text-destructive",
  CANCELLED: "border-destructive/20 bg-destructive/10 text-destructive",
};

export function StatusBadge({ status, label }: { status: string; label: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", STATUS_COLORS[status] ?? "")}
    >
      {label}
    </Badge>
  );
}
