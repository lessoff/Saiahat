import Link from "next/link";
import { Mountain } from "lucide-react";
import { getUser } from "@/lib/auth/get-user";
import { UserMenu } from "./user-menu";

export async function Navbar() {
  let user = null;
  try {
    user = await getUser();
  } catch {
    // DB not connected yet — show unauthenticated navbar
  }

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Mountain className="h-7 w-7 text-terracotta-500" />
          <span className="text-xl font-bold tracking-tight text-sand-900">
            Saiahat
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/tours"
            className="text-sm font-medium text-sand-600 transition-colors hover:text-terracotta-500"
          >
            Tours
          </Link>
          <Link
            href="/community"
            className="text-sm font-medium text-sand-600 transition-colors hover:text-terracotta-500"
          >
            Community
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-sand-600 transition-colors hover:text-terracotta-500"
          >
            About us
          </Link>

          {user ? (
            <UserMenu
              name={user.name}
              email={user.email}
              isAdmin={user.role === "admin"}
            />
          ) : (
            <Link
              href="/login"
              className="inline-flex h-9 items-center rounded-full bg-terracotta-500 px-4 text-sm font-medium text-white transition-colors hover:bg-terracotta-600"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
