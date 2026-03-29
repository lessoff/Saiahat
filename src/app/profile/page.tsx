export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { db } from "@/db";
import { bookings, favorites, tours } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { ProfileHeader } from "@/components/profile/profile-header";
import { BookingsList } from "@/components/profile/bookings-list";
import { FavoritesList } from "@/components/profile/favorites-list";

interface ProfilePageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const user = await getUser();
  if (!user) redirect("/login?redirect=/profile");

  const { tab = "bookings" } = await searchParams;

  const userBookings = await db
    .select({
      id: bookings.id,
      status: bookings.status,
      travelDate: bookings.travelDate,
      numTravelers: bookings.numTravelers,
      createdAt: bookings.createdAt,
      tour: {
        id: tours.id,
        title: tours.title,
      },
    })
    .from(bookings)
    .innerJoin(tours, eq(bookings.tourId, tours.id))
    .where(eq(bookings.userId, user.id))
    .orderBy(desc(bookings.createdAt));

  const userFavorites = await db
    .select({
      id: tours.id,
      title: tours.title,
      location: tours.location,
      price: tours.price,
      duration: tours.duration,
      difficulty: tours.difficulty,
      images: tours.images,
      maxGroupSize: tours.maxGroupSize,
    })
    .from(favorites)
    .innerJoin(tours, eq(favorites.tourId, tours.id))
    .where(eq(favorites.userId, user.id));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <ProfileHeader
        name={user.name}
        email={user.email}
        avatarUrl={user.avatarUrl}
      />

      {/* Tabs */}
      <div className="mt-8 flex gap-1 border-b border-sand-200">
        <a
          href="/profile?tab=bookings"
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === "bookings"
              ? "border-b-2 border-terracotta-500 text-terracotta-600"
              : "text-sand-500 hover:text-sand-700"
          }`}
        >
          My Bookings ({userBookings.length})
        </a>
        <a
          href="/profile?tab=favorites"
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === "favorites"
              ? "border-b-2 border-terracotta-500 text-terracotta-600"
              : "text-sand-500 hover:text-sand-700"
          }`}
        >
          Favorites ({userFavorites.length})
        </a>
      </div>

      <div className="mt-6">
        {tab === "favorites" ? (
          <FavoritesList tours={userFavorites} />
        ) : (
          <BookingsList bookings={userBookings} />
        )}
      </div>
    </div>
  );
}
