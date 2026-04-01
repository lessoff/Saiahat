import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getUser } from "@/lib/auth/get-user";
import { db } from "@/db";
import { tours } from "@/db/schema";
import { eq } from "drizzle-orm";
import { tourSchema } from "@/lib/validations/tour";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  const user = await getUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const tourId = parseInt(id);
  if (isNaN(tourId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
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
    .update(tours)
    .set({
      title: parsed.data.title,
      description: parsed.data.description,
      price: parsed.data.price,
      location: parsed.data.location,
      duration: parsed.data.duration,
      difficulty: parsed.data.difficulty,
      maxGroupSize: parsed.data.maxGroupSize,
      images: parsed.data.images,
      updatedAt: new Date(),
    })
    .where(eq(tours.id, tourId))
    .returning();

  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  revalidateTag(`tour-${tourId}`);
  revalidateTag("tours-list");
  revalidateTag("tours-featured");

  return NextResponse.json({ tour });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const user = await getUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const tourId = parseInt(id);
  if (isNaN(tourId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await db.delete(tours).where(eq(tours.id, tourId));

  revalidateTag("tours");

  return NextResponse.json({ success: true });
}
