"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { UserMenu } from "./user-menu";

type UserState = {
  name: string | null;
  email: string;
  isAdmin: boolean;
} | null;

export function NavbarAuth() {
  const [user, setUser] = useState<UserState>(undefined as unknown as UserState);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        setUser(null);
        return;
      }

      // Fetch profile from our users table
      const res = await fetch("/api/me");
      if (res.ok) {
        const profile = await res.json();
        setUser({
          name: profile.name,
          email: profile.email,
          isAdmin: profile.role === "admin",
        });
      } else {
        // Fallback to auth metadata if API fails
        setUser({
          name: authUser.user_metadata?.name ?? null,
          email: authUser.email!,
          isAdmin: false,
        });
      }
    }

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
      } else {
        loadUser();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Still loading — render nothing to avoid flash
  if (user === undefined) return null;

  if (user) {
    return (
      <UserMenu
        name={user.name}
        email={user.email}
        isAdmin={user.isAdmin}
      />
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex h-9 items-center rounded-full bg-terracotta-500 px-4 text-sm font-medium text-white transition-colors hover:bg-terracotta-600"
    >
      Sign In
    </Link>
  );
}
