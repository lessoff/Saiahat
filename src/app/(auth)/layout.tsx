import { Mountain } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand-50 px-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Mountain className="h-8 w-8 text-terracotta-500" />
        <span className="text-2xl font-bold text-sand-900">Saiahat</span>
      </Link>
      {children}
    </div>
  );
}
