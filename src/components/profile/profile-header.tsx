import { User } from "lucide-react";

interface ProfileHeaderProps {
  name: string | null;
  email: string;
  avatarUrl: string | null;
}

export function ProfileHeader({ name, email }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
        <User className="h-8 w-8 text-terracotta-600" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-sand-900">
          {name || "Traveler"}
        </h1>
        <p className="text-sand-500">{email}</p>
      </div>
    </div>
  );
}
