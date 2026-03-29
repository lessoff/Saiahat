import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth/get-user";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { bookingSchema } from "@/lib/validations/booking";

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const [booking] = await db
    .insert(bookings)
    .values({
      userId: user.id,
      tourId: parsed.data.tourId,
      travelDate: parsed.data.travelDate,
      numTravelers: parsed.data.numTravelers,
      message: parsed.data.message,
    })
    .returning();

  return NextResponse.json({ booking }, { status: 201 });
}
