import Link from "next/link";
import { Mountain } from "lucide-react";
import { NavbarAuth } from "./navbar-auth";

export function Navbar() {
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

          <NavbarAuth />
        </div>
      </nav>
    </header>
  );
}
