"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Menu, WashingMachine } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/layout/mode-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <WashingMachine className="size-4.5" aria-hidden="true" />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {mainNav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-lg"
              >
                <span
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.title}
                </span>
                {isActive && (
                  <m.span
                    layoutId="navbar-active-underline"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            render={<Link href="/quote" />}
            className="hidden lg:inline-flex"
          >
            Request a Quote
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-11 lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4 sm:max-w-xs">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <WashingMachine className="size-4" aria-hidden="true" />
                  </span>
                  {siteConfig.name}
                </SheetTitle>
              </SheetHeader>
              <Separator />
              <AnimatePresence>
                {mobileOpen && (
                  <m.ul
                    className="flex flex-col gap-1 px-4"
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      show: {
                        transition: { staggerChildren: 0.05 },
                      },
                    }}
                  >
                    {mainNav.map((item) => {
                      const isActive =
                        item.href === "/"
                          ? pathname === "/"
                          : pathname?.startsWith(item.href);
                      return (
                        <m.li
                          key={item.href}
                          variants={{
                            hidden: { opacity: 0, x: 16 },
                            show: { opacity: 1, x: 0 },
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                              isActive
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {item.title}
                          </Link>
                        </m.li>
                      );
                    })}
                  </m.ul>
                )}
              </AnimatePresence>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button
                  render={
                    <Link
                      href="/quote"
                      onClick={() => setMobileOpen(false)}
                    />
                  }
                >
                  Request a Quote
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
