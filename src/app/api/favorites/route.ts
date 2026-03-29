import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth/get-user";
import { db } from "@/db";
import { favorites } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tourId } = await request.json();

  if (!tourId || typeof tourId !== "number") {
    return NextResponse.json({ error: "Invalid tourId" }, { status: 400 });
  }

  // Check if already favorited
  const [existing] = await db
    .select()
    .from(favorites)
    .where(and(eq(favorites.userId, user.id), eq(favorites.tourId, tourId)))
    .limit(1);

  if (existing) {
    // Unfavorite
    await db.delete(favorites).where(eq(favorites.id, existing.id));
    return NextResponse.json({ favorited: false });
  }

  // Favorite
  await db.insert(favorites).values({ userId: user.id, tourId });
  return NextResponse.json({ favorited: true });
}
