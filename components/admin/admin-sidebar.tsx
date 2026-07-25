"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Package,
  MessageSquare,
  Users,
  LogOut,
  Menu,
  WashingMachine,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logoutAdmin } from "@/lib/actions/admin/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/quotes", label: "Quotes", icon: FileText },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

function AdminSidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
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
    </>
  );
}

function AdminLogoutForm({ adminName }: { adminName: string }) {
  return (
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
  );
}

/** Desktop/tablet: permanent sidebar, hidden below sm where it would otherwise
 * push page content below a full-width stack of nav links. */
export function AdminSidebar({ adminName }: { adminName: string }) {
  return (
    <aside className="hidden h-full w-56 shrink-0 flex-col gap-6 border-r border-border bg-card p-4 sm:flex">
      <Link href="/admin" className="flex items-center gap-2 px-1 font-heading text-base font-semibold">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <WashingMachine className="size-4" aria-hidden="true" />
        </span>
        Admin
      </Link>

      <AdminSidebarNav />
      <AdminLogoutForm adminName={adminName} />
    </aside>
  );
}

/** Mobile: sticky top bar with a hamburger that opens the same nav in a Sheet,
 * matching the pattern already used by the public site's Navbar. */
export function AdminMobileNav({ adminName }: { adminName: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:hidden">
      <Link href="/admin" className="flex items-center gap-2 font-heading text-base font-semibold">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <WashingMachine className="size-4" aria-hidden="true" />
        </span>
        Admin
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="size-11"
              aria-label="Open admin menu"
            />
          }
        >
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side="right" className="flex w-3/4 flex-col gap-6 p-4 sm:max-w-xs">
          <SheetHeader className="p-0">
            <SheetTitle className="flex items-center gap-2 font-heading text-base font-semibold">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <WashingMachine className="size-4" aria-hidden="true" />
              </span>
              Admin
            </SheetTitle>
          </SheetHeader>
          <AdminSidebarNav onNavigate={() => setOpen(false)} />
          <AdminLogoutForm adminName={adminName} />
        </SheetContent>
      </Sheet>
    </header>
  );
}
