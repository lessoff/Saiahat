"use client";

import { User } from "lucide-react";

export type Post = {
  id: number;
  content: string;
  mediaUrls: string[];
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
  };
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function isVideo(url: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

export function PostCard({ post }: { post: Post }) {
  const displayName = post.user.name ?? "Traveler";
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <article className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-100 text-sm font-semibold text-terracotta-600">
          {post.user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.user.avatarUrl}
              alt={displayName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-sand-900">{displayName}</p>
          <p className="text-xs text-sand-400">{timeAgo(post.createdAt)}</p>
        </div>
      </div>

      {/* Content */}
      <p className="mb-4 text-sm leading-relaxed text-sand-700 whitespace-pre-line">
        {post.content}
      </p>

      {/* Media */}
      {post.mediaUrls.length > 0 && (
        <div
          className={`grid gap-2 ${
            post.mediaUrls.length === 1
              ? "grid-cols-1"
              : post.mediaUrls.length === 2
                ? "grid-cols-2"
                : "grid-cols-2"
          }`}
        >
          {post.mediaUrls.map((url, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl ${
                post.mediaUrls.length === 3 && i === 0 ? "col-span-2" : ""
              }`}
            >
              {isVideo(url) ? (
                <video
                  src={url}
                  controls
                  className="w-full rounded-xl object-cover"
                  style={{ maxHeight: "320px" }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={url}
                  alt={`Post media ${i + 1}`}
                  className="w-full object-cover rounded-xl"
                  style={{ maxHeight: "320px" }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
