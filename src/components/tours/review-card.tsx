import Image from "next/image";
import { StarRating } from "@/components/ui/star-rating";
import { format } from "date-fns";

interface ReviewCardProps {
  userName: string | null;
  userAvatar: string | null;
  rating: number;
  comment: string | null;
  photos: string[];
  createdAt: Date;
}

export function ReviewCard({
  userName,
  userAvatar,
  rating,
  comment,
  photos,
  createdAt,
}: ReviewCardProps) {
  return (
    <div className="border-b border-sand-100 py-4 last:border-0">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta-100 text-sm font-medium text-terracotta-600">
          {userAvatar ? (
            <Image
              src={userAvatar}
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            (userName?.[0] || "U").toUpperCase()
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-sand-900">
            {userName || "Anonymous"}
          </p>
          <p className="text-xs text-sand-400">
            {format(createdAt, "MMM d, yyyy")}
          </p>
        </div>
        <div className="ml-auto">
          <StarRating value={rating} readonly size={16} />
        </div>
      </div>

      {comment && (
        <p className="mb-2 text-sm text-sand-700">{comment}</p>
      )}

      {photos.length > 0 && (
        <div className="flex gap-2">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="relative h-16 w-16 overflow-hidden rounded-lg"
            >
              <Image
                src={photo}
                alt={`Review photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
