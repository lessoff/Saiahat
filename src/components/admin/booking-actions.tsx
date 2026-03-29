"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, X } from "lucide-react";

interface BookingActionsProps {
  bookingId: number;
}

export function BookingActions({ bookingId }: BookingActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(status: "confirmed" | "rejected") {
    setLoading(true);
    await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex justify-end gap-1">
      <button
        onClick={() => updateStatus("confirmed")}
        disabled={loading}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-green-500 hover:bg-green-50 hover:text-green-700 disabled:opacity-50"
        title="Confirm"
      >
        <Check className="h-4 w-4" />
      </button>
      <button
        onClick={() => updateStatus("rejected")}
        disabled={loading}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
        title="Reject"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
