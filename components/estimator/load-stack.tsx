import { cn } from "@/lib/utils";

/** A small stack of folded cloth: one more layer for each step up in load size. Decorative. */
export function LoadStack({ level, active }: { level: number; active: boolean }) {
  return (
    <span aria-hidden="true" className="flex h-9 w-12 shrink-0 flex-col-reverse items-center justify-start gap-[3px]">
      {Array.from({ length: 4 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-[5px] rounded-full transition-all duration-500",
            i <= level ? (active ? "bg-foreground" : "bg-foreground/45") : "bg-foreground/10",
          )}
          style={{ width: `${100 - i * 9}%`, transitionDelay: `${i * 60}ms` }}
        />
      ))}
    </span>
  );
}
