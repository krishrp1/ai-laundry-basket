import { cn } from "@/lib/utils";

/** The wordmark: "A&I" set on an indigo tag, followed by the rest of the name. */
export function Brand({ label = "Laundry Basket", className }: { label?: string; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 font-heading text-lg font-semibold", className)}>
      <span className="rounded-sm bg-band px-1.5 py-1 text-sm leading-none font-bold text-band-foreground">
        A&amp;I
      </span>{" "}
      <span>{label}</span>
    </span>
  );
}
