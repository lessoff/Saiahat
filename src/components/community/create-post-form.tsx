"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, Loader2, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Post } from "./post-card";

interface CreatePostFormProps {
  onPost: (post: Post) => void;
}

type MediaItem = { url: string; type: "image" | "video" };

function isVideoFile(file: File) {
  return file.type.startsWith("video/");
}

export function CreatePostForm({ onPost }: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError("");
    setUploading(true);

    const newItems: MediaItem[] = [];
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/community/upload", { method: "POST", body: form });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Upload failed");
        setUploading(false);
        return;
      }
      const data = await res.json();
      newItems.push({ url: data.url, type: data.type });
    }

    setMedia((prev) => [...prev, ...newItems]);
    setUploading(false);
  }

  function removeMedia(index: number) {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) {
      setError("Write something before posting.");
      return;
    }
    setError("");
    setSubmitting(true);

    const res = await fetch("/api/community", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, mediaUrls: media.map((m) => m.url) }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to post");
      setSubmitting(false);
      return;
    }

    const post = await res.json();
    onPost(post);
    setContent("");
    setMedia([]);
    setSubmitting(false);
  }

  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-terracotta-500">
        Share Your Experience
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          id="community-post"
          label=""
          placeholder="Tell the community about your adventure..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />

        {/* Media previews */}
        {media.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {media.map((item, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg aspect-square bg-sand-100">
                {item.type === "video" ? (
                  <video src={item.url} className="h-full w-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt="" className="h-full w-full object-cover" />
                )}
                <button
                  type="button"
                  onClick={() => removeMedia(i)}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-sand-500 transition-colors hover:bg-sand-50 hover:text-sand-700 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ImagePlus className="h-4 w-4" />
                <Film className="h-4 w-4" />
              </>
            )}
            <span>{uploading ? "Uploading..." : "Add photos / videos"}</span>
          </button>

          <Button type="submit" size="sm" disabled={submitting || uploading}>
            {submitting ? "Posting..." : "Post"}
          </Button>
        </div>

        <input
          ref={fileRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
      </form>
    </div>
  );
}
