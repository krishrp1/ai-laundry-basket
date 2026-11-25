import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { LinkListItem } from "@/components/admin/link-list-item";
import { getDashboardStats } from "@/lib/data/dashboard";
import { quoteStatusLabels, orderStatusLabels } from "@/lib/order-status-labels";

export const metadata: Metadata = { title: "Dashboard" };

const statCards = [
  { key: "newQuotes" as const, label: "New quote requests", href: "/admin/quotes" },
  { key: "activeOrders" as const, label: "Active orders", href: "/admin/orders" },
  { key: "unreadMessages" as const, label: "Unread messages", href: "/admin/messages" },
  { key: "totalCustomers" as const, label: "Total customers", href: "/admin/customers" },
];

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A snapshot of what needs attention today.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="group bg-card p-5 outline-none hover:bg-accent focus-visible:bg-accent"
          >
            <p className="font-heading text-4xl font-semibold tabular-nums">{stats[card.key]}</p>
            <p className="text-sm text-muted-foreground underline-offset-4 group-hover:underline">
              {card.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg sm:text-lg">Recent quote requests</h2>
              <Link href="/admin/quotes" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <ul className="flex flex-col gap-3">
              {stats.recentQuotes.length === 0 && (
                <li className="text-sm text-muted-foreground">No quote requests yet.</li>
              )}
              {stats.recentQuotes.map((quote) => (
                <LinkListItem
                  key={quote.id}
                  href={`/admin/quotes/${quote.id}`}
                  title={quote.name}
                  subtitle={quote.serviceType}
                  badge={<StatusBadge status={quote.status} label={quoteStatusLabels[quote.status]} />}
                />
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg sm:text-lg">Recent orders</h2>
              <Link href="/admin/orders" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <ul className="flex flex-col gap-3">
              {stats.recentOrders.length === 0 && (
                <li className="text-sm text-muted-foreground">No orders yet.</li>
              )}
              {stats.recentOrders.map((order) => (
                <LinkListItem
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  title={order.customer.name}
                  subtitle={order.orderId}
                  badge={<StatusBadge status={order.status} label={orderStatusLabels[order.status]} />}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
