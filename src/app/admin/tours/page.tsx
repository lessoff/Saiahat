export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/db";
import { tours } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteTourButton } from "@/components/admin/delete-tour-button";

export default async function AdminToursPage() {
  const allTours = await db
    .select()
    .from(tours)
    .orderBy(desc(tours.createdAt));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sand-900">Manage Tours</h1>
        <Link href="/admin/tours/new">
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" />
            New Tour
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sand-200 bg-sand-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-sand-600">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-sand-600">
                Location
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-sand-600">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-sand-600">
                Difficulty
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-sand-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allTours.map((tour) => (
              <tr
                key={tour.id}
                className="border-b border-sand-100 last:border-0"
              >
                <td className="px-4 py-3 text-sm font-medium text-sand-900">
                  {tour.title}
                </td>
                <td className="px-4 py-3 text-sm text-sand-600">
                  {tour.location}
                </td>
                <td className="px-4 py-3 text-sm text-sand-600">
                  {Number(tour.price).toLocaleString()} KZT
                </td>
                <td className="px-4 py-3 text-sm capitalize text-sand-600">
                  {tour.difficulty}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/tours/${tour.id}/edit`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sand-500 hover:bg-sand-100 hover:text-sand-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteTourButton tourId={tour.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {allTours.length === 0 && (
          <div className="py-12 text-center text-sand-500">
            No tours yet. Create your first one!
          </div>
        )}
      </div>
    </div>
  );
}
