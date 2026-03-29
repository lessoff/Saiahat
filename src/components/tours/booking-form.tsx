"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle } from "lucide-react";

interface BookingFormProps {
  tourId: number;
  tourTitle: string;
  isLoggedIn: boolean;
}

export function BookingForm({ tourId, tourTitle, isLoggedIn }: BookingFormProps) {
  const [travelDate, setTravelDate] = useState("");
  const [numTravelers, setNumTravelers] = useState("1");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      window.location.href = `/login?redirect=/tours/${tourId}`;
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId,
          travelDate,
          numTravelers: parseInt(numTravelers),
          message: message || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit booking");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <CheckCircle className="mx-auto mb-3 h-10 w-10 text-green-500" />
        <h3 className="mb-1 text-lg font-semibold text-green-800">
          Booking Request Submitted!
        </h3>
        <p className="text-sm text-green-600">
          We&apos;ll confirm your spot for &quot;{tourTitle}&quot; shortly. Check your
          profile for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-lg">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-sand-900">
        <CalendarDays className="h-5 w-5 text-terracotta-500" />
        Book This Tour
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="travelDate"
          label="Travel Date"
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          required
        />
        <Input
          id="numTravelers"
          label="Number of Travelers"
          type="number"
          min="1"
          max="20"
          value={numTravelers}
          onChange={(e) => setNumTravelers(e.target.value)}
          required
        />
        <Textarea
          id="message"
          label="Message (optional)"
          placeholder="Any special requests or questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {!isLoggedIn
            ? "Sign in to Book"
            : loading
              ? "Submitting..."
              : "Request to Book"}
        </Button>
      </form>
    </div>
  );
}
