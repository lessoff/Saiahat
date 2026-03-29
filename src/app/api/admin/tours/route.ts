import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth/get-user";
import { db } from "@/db";
import { tours } from "@/db/schema";
import { tourSchema } from "@/lib/validations/tour";

export async function POST(request: Request) {
  const user = await getUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = tourSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const [tour] = await db
    .insert(tours)
    .values({
      title: parsed.data.title,
      description: parsed.data.description,
      price: parsed.data.price,
      location: parsed.data.location,
      duration: parsed.data.duration,
      difficulty: parsed.data.difficulty,
      maxGroupSize: parsed.data.maxGroupSize,
      images: parsed.data.images,
    })
    .returning();

  return NextResponse.json({ tour }, { status: 201 });
}
