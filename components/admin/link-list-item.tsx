import Link from "next/link";

export function LinkListItem({
  href,
  title,
  subtitle,
  badge,
}: {
  href: string;
  title: string;
  subtitle?: string;
  badge: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm hover:bg-muted/50"
      >
        {subtitle ? (
          <div className="min-w-0">
            <p className="truncate font-medium">{title}</p>
            <p className="truncate text-muted-foreground">{subtitle}</p>
          </div>
        ) : (
          <span>{title}</span>
        )}
        {badge}
      </Link>
    </li>
  );
}
