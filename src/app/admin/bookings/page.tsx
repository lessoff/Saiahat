export const dynamic = "force-dynamic";

import { db } from "@/db";
import { bookings, tours, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { format } from "date-fns";
import { BookingActions } from "@/components/admin/booking-actions";

export default async function AdminBookingsPage() {
  const allBookings = await db
    .select({
      id: bookings.id,
      status: bookings.status,
      travelDate: bookings.travelDate,
      numTravelers: bookings.numTravelers,
      message: bookings.message,
      createdAt: bookings.createdAt,
      user: {
        name: users.name,
        email: users.email,
      },
      tour: {
        title: tours.title,
      },
    })
    .from(bookings)
    .innerJoin(users, eq(bookings.userId, users.id))
    .innerJoin(tours, eq(bookings.tourId, tours.id))
    .orderBy(desc(bookings.createdAt));

  const statusStyles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-sand-900">
        Manage Bookings
      </h1>

      <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sand-200 bg-sand-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-sand-600">
                Tour
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-sand-600">
                Guest
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-sand-600">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-sand-600">
                Travelers
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-sand-600">
                Status
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-sand-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-sand-100 last:border-0"
              >
                <td className="px-4 py-3 text-sm font-medium text-sand-900">
                  {booking.tour.title}
                </td>
                <td className="px-4 py-3 text-sm text-sand-600">
                  <div>{booking.user.name || "N/A"}</div>
                  <div className="text-xs text-sand-400">
                    {booking.user.email}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-sand-600">
                  {format(new Date(booking.travelDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3 text-sm text-sand-600">
                  {booking.numTravelers}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[booking.status] || statusStyles.pending}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {booking.status === "pending" && (
                    <BookingActions bookingId={booking.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {allBookings.length === 0 && (
          <div className="py-12 text-center text-sand-500">
            No bookings yet.
          </div>
        )}
      </div>
    </div>
  );
}
