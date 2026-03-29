"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TourFormProps {
  initialData?: {
    id: number;
    title: string;
    description: string;
    price: string;
    location: string;
    duration: string;
    difficulty: string;
    maxGroupSize: number | null;
    images: string[];
  };
}

export function TourForm({ initialData }: TourFormProps) {
  const isEditing = !!initialData;
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "moderate");
  const [maxGroupSize, setMaxGroupSize] = useState(
    initialData?.maxGroupSize?.toString() || ""
  );
  const [imagesInput, setImagesInput] = useState(
    initialData?.images.join("\n") || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const images = imagesInput
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    const body = {
      title,
      description,
      price,
      location,
      duration,
      difficulty,
      maxGroupSize: maxGroupSize ? parseInt(maxGroupSize) : undefined,
      images,
    };

    try {
      const url = isEditing
        ? `/api/admin/tours/${initialData.id}`
        : "/api/admin/tours";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save tour");
      }

      router.push("/admin/tours");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <Input
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        id="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="price"
          label="Price (KZT)"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Input
          id="location"
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Input
          id="duration"
          label="Duration"
          placeholder="e.g., 2 days"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <Select
          id="difficulty"
          label="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
        </Select>
        <Input
          id="maxGroupSize"
          label="Max Group Size"
          type="number"
          value={maxGroupSize}
          onChange={(e) => setMaxGroupSize(e.target.value)}
        />
      </div>
      <Textarea
        id="images"
        label="Image URLs (one per line)"
        placeholder="https://images.unsplash.com/..."
        value={imagesInput}
        onChange={(e) => setImagesInput(e.target.value)}
        rows={3}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEditing ? "Update Tour" : "Create Tour"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin/tours")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
