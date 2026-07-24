import Link from "next/link";
import type { Metadata } from "next";
import { FileText, Package, MessageSquare, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { getDashboardStats } from "@/lib/data/dashboard";
import { quoteStatusLabels, orderStatusLabels } from "@/lib/order-status-labels";

export const metadata: Metadata = { title: "Dashboard" };

const statCards = [
  { key: "newQuotes" as const, label: "New quote requests", icon: FileText, href: "/admin/quotes" },
  { key: "activeOrders" as const, label: "Active orders", icon: Package, href: "/admin/orders" },
  { key: "unreadMessages" as const, label: "Unread messages", icon: MessageSquare, href: "/admin/messages" },
  { key: "totalCustomers" as const, label: "Total customers", icon: Users, href: "/admin/customers" },
];

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A snapshot of what needs attention today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Link key={card.key} href={card.href}>
            <Card className="transition-colors hover:border-primary/40">
              <CardContent className="flex items-center gap-4">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <card.icon className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-semibold">{stats[card.key]}</p>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Recent quote requests</h2>
              <Link href="/admin/quotes" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <ul className="flex flex-col gap-3">
              {stats.recentQuotes.length === 0 && (
                <li className="text-sm text-muted-foreground">No quote requests yet.</li>
              )}
              {stats.recentQuotes.map((quote) => (
                <li key={quote.id}>
                  <Link
                    href={`/admin/quotes/${quote.id}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{quote.name}</p>
                      <p className="truncate text-muted-foreground">{quote.serviceType}</p>
                    </div>
                    <StatusBadge status={quote.status} label={quoteStatusLabels[quote.status]} />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Recent orders</h2>
              <Link href="/admin/orders" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <ul className="flex flex-col gap-3">
              {stats.recentOrders.length === 0 && (
                <li className="text-sm text-muted-foreground">No orders yet.</li>
              )}
              {stats.recentOrders.map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{order.customer.name}</p>
                      <p className="truncate text-muted-foreground">{order.orderId}</p>
                    </div>
                    <StatusBadge status={order.status} label={orderStatusLabels[order.status]} />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
