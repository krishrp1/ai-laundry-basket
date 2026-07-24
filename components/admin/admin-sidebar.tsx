"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Package,
  MessageSquare,
  Users,
  LogOut,
  WashingMachine,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { logoutAdmin } from "@/lib/actions/admin/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/quotes", label: "Quotes", icon: FileText },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

export function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col gap-6 border-r border-border bg-card p-4 sm:w-56">
      <Link href="/admin" className="flex items-center gap-2 px-1 font-heading text-base font-semibold">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <WashingMachine className="size-4" aria-hidden="true" />
        </span>
        Admin
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <p className="truncate px-1 text-xs text-muted-foreground">{adminName}</p>
        <form action={logoutAdmin}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground"
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </form>
      </div>
    </aside>
  );
}
