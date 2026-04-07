import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth/get-user";
import { db } from "@/db";
import { reviews, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { reviewSchema } from "@/lib/validations/review";

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const [review] = await db
    .insert(reviews)
    .values({
      userId: user.id,
      tourId: parsed.data.tourId,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
      photos: parsed.data.photos,
    })
    .returning();

  const [profile] = await db
    .select({ name: users.name, avatarUrl: users.avatarUrl })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  revalidatePath("/tours");
  revalidatePath(`/tours/${parsed.data.tourId}`);

  return NextResponse.json(
    {
      review: {
        ...review,
        user: profile,
      },
    },
    { status: 201 }
  );
}
