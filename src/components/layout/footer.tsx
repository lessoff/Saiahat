import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Mountain className="h-5 w-5 text-terracotta-500" />
            <span className="font-semibold text-sand-900">Saiahat</span>
          </div>
          <p className="text-sm text-sand-500">
            &copy; {new Date().getFullYear()} Saiahat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
