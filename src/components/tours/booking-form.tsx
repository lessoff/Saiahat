"use client";

import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle, ChevronDown, ChevronUp, Users } from "lucide-react";

interface BookingFormProps {
  tourId: number;
  tourTitle: string;
  isLoggedIn: boolean;
}

export function BookingForm({ tourId, tourTitle, isLoggedIn }: BookingFormProps) {
  const [travelDate, setTravelDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const totalTravelers = adults + children;

  const travelerLabel =
    children > 0
      ? `Adult x ${adults}, Child x ${children}`
      : `Adult x ${adults}`;

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
          numTravelers: totalTravelers,
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

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Travelers dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTravelersDropdown((v) => !v)}
            className="flex w-full items-center justify-between rounded-full bg-sand-100 px-4 py-3 text-sm font-medium text-sand-800 transition-colors hover:bg-sand-200"
          >
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-sand-500" />
              {travelerLabel}
            </span>
            {showTravelersDropdown ? (
              <ChevronUp className="h-4 w-4 text-sand-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-sand-500" />
            )}
          </button>

          {showTravelersDropdown && (
            <div className="absolute left-0 right-0 z-10 mt-1 rounded-2xl border border-sand-200 bg-white shadow-lg">
              {/* Adult row */}
              <div className="flex items-center justify-between border-b border-sand-100 px-4 py-4">
                <div>
                  <p className="font-semibold text-sand-900">Adult</p>
                  <p className="text-xs text-sand-400">(Age 5–99)</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdults((v) => Math.max(1, v - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-terracotta-400 text-terracotta-500 transition-colors hover:bg-terracotta-50 disabled:border-sand-200 disabled:text-sand-300"
                    disabled={adults <= 1}
                  >
                    <span className="text-lg leading-none">−</span>
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-sand-900">
                    {adults}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAdults((v) => v + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-terracotta-400 text-terracotta-500 transition-colors hover:bg-terracotta-50"
                  >
                    <span className="text-lg leading-none">+</span>
                  </button>
                </div>
              </div>

              {/* Child row */}
              <div className="flex items-center justify-between px-4 py-4">
                <div>
                  <p className="font-semibold text-sand-900">Child</p>
                  <p className="text-xs text-sand-400">(Age 4 and younger)</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setChildren((v) => Math.max(0, v - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-terracotta-400 text-terracotta-500 transition-colors hover:bg-terracotta-50 disabled:border-sand-200 disabled:text-sand-300"
                    disabled={children <= 0}
                  >
                    <span className="text-lg leading-none">−</span>
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-sand-900">
                    {children}
                  </span>
                  <button
                    type="button"
                    onClick={() => setChildren((v) => v + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-terracotta-400 text-terracotta-500 transition-colors hover:bg-terracotta-50"
                  >
                    <span className="text-lg leading-none">+</span>
                  </button>
                </div>
              </div>

              {/* Continue button */}
              <div className="px-4 pb-4">
                <button
                  type="button"
                  onClick={() => setShowTravelersDropdown(false)}
                  className="w-full rounded-full bg-terracotta-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta-600"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Date picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => dateInputRef.current?.showPicker()}
            className="flex w-full items-center gap-2 rounded-full bg-sand-100 px-4 py-3 text-sm font-medium text-sand-800 transition-colors hover:bg-sand-200"
          >
            <CalendarDays className="h-4 w-4 shrink-0 text-sand-500" />
            {travelDate
              ? new Date(travelDate + "T00:00:00").toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Select date"}
          </button>
          <input
            ref={dateInputRef}
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
            className="absolute inset-0 opacity-0 pointer-events-none"
            tabIndex={-1}
          />
        </div>

        {/* Optional message */}
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

      {/* Trust badges */}
      <div className="mt-5 space-y-4 border-t border-sand-100 pt-5">
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
          <div>
            <p className="text-sm font-semibold text-sand-900">Free cancellation</p>
            <p className="text-xs text-sand-500">
              Cancel up to 24 hours in advance for a full refund
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
          <div>
            <p className="text-sm font-semibold text-sand-900">Reserve now &amp; pay later</p>
            <p className="text-xs text-sand-500">
              Keep your travel plans flexible — book your spot and pay nothing today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
