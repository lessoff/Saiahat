export const dynamic = "force-dynamic";

import { db } from "@/db";
import { tours, bookings, users } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { Map, BookOpen, Users, Clock } from "lucide-react";

export default async function AdminDashboard() {
  const [tourCount] = await db.select({ count: count() }).from(tours);
  const [bookingCount] = await db.select({ count: count() }).from(bookings);
  const [userCount] = await db.select({ count: count() }).from(users);
  const [pendingCount] = await db
    .select({ count: count() })
    .from(bookings)
    .where(eq(bookings.status, "pending"));

  const stats = [
    {
      label: "Total Tours",
      value: tourCount.count,
      icon: Map,
      color: "text-ocean-600 bg-ocean-100",
    },
    {
      label: "Total Bookings",
      value: bookingCount.count,
      icon: BookOpen,
      color: "text-terracotta-600 bg-terracotta-100",
    },
    {
      label: "Pending Bookings",
      value: pendingCount.count,
      icon: Clock,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      label: "Total Users",
      value: userCount.count,
      icon: Users,
      color: "text-green-600 bg-green-100",
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-sand-900">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-sand-500">{stat.label}</p>
                <p className="text-2xl font-bold text-sand-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
