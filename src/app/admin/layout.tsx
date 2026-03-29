import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import Link from "next/link";
import { LayoutDashboard, Map, BookOpen } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user || user.role !== "admin") redirect("/");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 md:block">
          <h2 className="mb-4 text-lg font-bold text-sand-900">Admin</h2>
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/tours"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
            >
              <Map className="h-4 w-4" />
              Tours
            </Link>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
            >
              <BookOpen className="h-4 w-4" />
              Bookings
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
