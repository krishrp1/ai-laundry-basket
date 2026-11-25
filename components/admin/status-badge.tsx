import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Four tones, each with one meaning: needs attention, in progress, done, and
// stopped. The label carries the detail.
const NEW = "bg-highlight text-highlight-foreground";
const ACTIVE = "bg-accent text-accent-foreground";
const DONE = "bg-success/12 text-success";
const IDLE = "bg-muted text-muted-foreground";
const STOPPED = "bg-destructive/10 text-destructive";

const STATUS_COLORS: Record<string, string> = {
  NEW,
  PENDING: NEW,
  CONTACTED: ACTIVE,
  READ: ACTIVE,
  CONFIRMED: ACTIVE,
  PICKUP_SCHEDULED: ACTIVE,
  PICKED_UP: ACTIVE,
  CLEANING: ACTIVE,
  QUALITY_CHECK: ACTIVE,
  READY_FOR_DELIVERY: ACTIVE,
  OUT_FOR_DELIVERY: ACTIVE,
  CONVERTED: DONE,
  REPLIED: DONE,
  DELIVERED: DONE,
  CLOSED: IDLE,
  SPAM: STOPPED,
  CANCELLED: STOPPED,
};

export function StatusBadge({ status, label }: { status: string; label: string }) {
  return (
    <Badge variant="outline" className={cn("border-transparent font-semibold", STATUS_COLORS[status])}>
      {label}
    </Badge>
  );
}
