"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut, Heart, BookOpen, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UserMenuProps {
  name: string | null;
  email: string;
  isAdmin: boolean;
}

export function UserMenu({ name, email, isAdmin }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const displayName = name || email.split("@")[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-600 transition-colors hover:bg-terracotta-200"
      >
        <User className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-sand-200 bg-white py-1 shadow-lg">
          <div className="border-b border-sand-100 px-4 py-3">
            <p className="text-sm font-medium text-sand-900">{displayName}</p>
            <p className="text-xs text-sand-500">{email}</p>
          </div>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-sand-700 hover:bg-sand-50"
          >
            <BookOpen className="h-4 w-4" />
            My Bookings
          </Link>
          <Link
            href="/profile?tab=favorites"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-sand-700 hover:bg-sand-50"
          >
            <Heart className="h-4 w-4" />
            Favorites
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-sand-700 hover:bg-sand-50"
            >
              <Shield className="h-4 w-4" />
              Admin Panel
            </Link>
          )}

          <div className="border-t border-sand-100">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
