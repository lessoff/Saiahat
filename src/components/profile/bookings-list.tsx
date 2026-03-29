import Link from "next/link";
import { format } from "date-fns";
import { CalendarDays, Users } from "lucide-react";

interface Booking {
  id: number;
  status: string;
  travelDate: string;
  numTravelers: number;
  createdAt: Date;
  tour: {
    id: number;
    title: string;
  };
}

interface BookingsListProps {
  bookings: Booking[];
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export function BookingsList({ bookings }: BookingsListProps) {
  if (bookings.length === 0) {
    return (
      <div className="py-12 text-center">
        <CalendarDays className="mx-auto mb-3 h-10 w-10 text-sand-300" />
        <p className="text-sand-500">No bookings yet.</p>
        <Link
          href="/tours"
          className="mt-2 inline-block text-sm font-medium text-terracotta-500 hover:text-terracotta-600"
        >
          Browse tours to book your first adventure
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="flex items-center justify-between rounded-xl border border-sand-200 bg-white p-4"
        >
          <div>
            <Link
              href={`/tours/${booking.tour.id}`}
              className="font-medium text-sand-900 hover:text-terracotta-500"
            >
              {booking.tour.title}
            </Link>
            <div className="mt-1 flex items-center gap-3 text-sm text-sand-500">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {format(new Date(booking.travelDate), "MMM d, yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {booking.numTravelers} traveler{booking.numTravelers > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[booking.status] || statusStyles.pending}`}
          >
            {booking.status}
          </span>
        </div>
      ))}
    </div>
  );
}
