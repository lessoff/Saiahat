import { notFound } from "next/navigation";
import { db } from "@/db";
import { tours } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TourForm } from "@/components/admin/tour-form";

interface EditTourPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTourPage({ params }: EditTourPageProps) {
  const { id } = await params;
  const tourId = parseInt(id);
  if (isNaN(tourId)) notFound();

  const [tour] = await db
    .select()
    .from(tours)
    .where(eq(tours.id, tourId))
    .limit(1);

  if (!tour) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-sand-900">Edit Tour</h1>
      <TourForm initialData={tour} />
    </div>
  );
}
