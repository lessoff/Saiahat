import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <Mountain className="mb-4 h-16 w-16 text-sand-300" />
      <h1 className="mb-2 text-4xl font-bold text-sand-900">404</h1>
      <p className="mb-6 text-sand-500">
        This page seems to have wandered off the trail.
      </p>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
