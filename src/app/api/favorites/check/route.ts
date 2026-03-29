import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth/get-user";
import { db } from "@/db";
import { favorites } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ favorited: false });
  }

  const { searchParams } = new URL(request.url);
  const tourId = parseInt(searchParams.get("tourId") || "");

  if (isNaN(tourId)) {
    return NextResponse.json({ error: "Invalid tourId" }, { status: 400 });
  }

  const [existing] = await db
    .select()
    .from(favorites)
    .where(and(eq(favorites.userId, user.id), eq(favorites.tourId, tourId)))
    .limit(1);

  return NextResponse.json({ favorited: !!existing });
}
