"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h1 className="mb-2 text-4xl font-bold text-sand-900">Oops!</h1>
      <p className="mb-6 text-sand-500">Something went wrong. Please try again.</p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
