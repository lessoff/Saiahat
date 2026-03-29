"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "moderate", label: "Moderate" },
  { value: "hard", label: "Hard" },
];

const durationOptions = [
  { value: "short", label: "1–3 days" },
  { value: "medium", label: "4–7 days" },
  { value: "long", label: "8+ days" },
];

const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function FilterControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showFilters, setShowFilters] = useState(false);

  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "popularity";
  const difficulty = searchParams.get("difficulty") || "";
  const duration = searchParams.get("duration") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const activeFilterCount = [difficulty, duration, minPrice, maxPrice].filter(Boolean).length;

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    startTransition(() => {
      router.push(`/tours?${params.toString()}`);
    });
  }

  function clearAll() {
    startTransition(() => {
      router.push("/tours");
    });
  }

  const handleSearch = useCallback(
    (value: string) => {
      updateParams({ q: value });
    },
    [searchParams]
  );

  return (
    <div className={`space-y-3 ${isPending ? "opacity-60 pointer-events-none" : ""}`}>
      {/* Search bar + filter toggle */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
          <input
            type="text"
            placeholder="Search tours by name or location..."
            defaultValue={q}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-xl border border-sand-200 bg-white py-2.5 pl-9 pr-4 text-sm text-sand-900 placeholder-sand-400 outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-100"
          />
          {q && (
            <button
              onClick={() => updateParams({ q: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-400 hover:text-sand-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
            showFilters || activeFilterCount > 0
              ? "border-terracotta-400 bg-terracotta-50 text-terracotta-600"
              : "border-sand-200 bg-white text-sand-600 hover:border-sand-300 hover:bg-sand-50"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-terracotta-500 text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="rounded-xl border border-sand-200 bg-white p-4 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Sort */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sand-400">
                Sort by
              </p>
              <div className="flex flex-col gap-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateParams({ sort: option.value })}
                    className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                      sort === option.value
                        ? "bg-terracotta-50 font-medium text-terracotta-600"
                        : "text-sand-600 hover:bg-sand-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sand-400">
                Difficulty
              </p>
              <div className="flex flex-col gap-1">
                {difficultyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      updateParams({
                        difficulty: difficulty === option.value ? "" : option.value,
                      })
                    }
                    className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                      difficulty === option.value
                        ? "bg-terracotta-50 font-medium text-terracotta-600"
                        : "text-sand-600 hover:bg-sand-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sand-400">
                Duration
              </p>
              <div className="flex flex-col gap-1">
                {durationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      updateParams({
                        duration: duration === option.value ? "" : option.value,
                      })
                    }
                    className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                      duration === option.value
                        ? "bg-terracotta-50 font-medium text-terracotta-600"
                        : "text-sand-600 hover:bg-sand-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sand-400">
                Price range (KZT)
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  placeholder="Min price"
                  defaultValue={minPrice}
                  onBlur={(e) => updateParams({ minPrice: e.target.value })}
                  className="w-full rounded-lg border border-sand-200 px-3 py-1.5 text-sm text-sand-900 placeholder-sand-400 outline-none focus:border-terracotta-400 focus:ring-1 focus:ring-terracotta-100"
                />
                <input
                  type="number"
                  placeholder="Max price"
                  defaultValue={maxPrice}
                  onBlur={(e) => updateParams({ maxPrice: e.target.value })}
                  className="w-full rounded-lg border border-sand-200 px-3 py-1.5 text-sm text-sand-900 placeholder-sand-400 outline-none focus:border-terracotta-400 focus:ring-1 focus:ring-terracotta-100"
                />
              </div>
            </div>
          </div>

          {(activeFilterCount > 0 || sort !== "popularity") && (
            <div className="mt-4 border-t border-sand-100 pt-3">
              <button
                onClick={clearAll}
                className="text-sm text-sand-500 hover:text-sand-700 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active filter chips (when panel is closed) */}
      {!showFilters && (activeFilterCount > 0 || sort !== "popularity") && (
        <div className="flex flex-wrap items-center gap-2">
          {sort !== "popularity" && (
            <Chip
              label={sortOptions.find((o) => o.value === sort)?.label ?? sort}
              onRemove={() => updateParams({ sort: "popularity" })}
            />
          )}
          {difficulty && (
            <Chip
              label={`Difficulty: ${difficulty}`}
              onRemove={() => updateParams({ difficulty: "" })}
            />
          )}
          {duration && (
            <Chip
              label={`Duration: ${durationOptions.find((o) => o.value === duration)?.label}`}
              onRemove={() => updateParams({ duration: "" })}
            />
          )}
          {minPrice && (
            <Chip
              label={`Min: ${Number(minPrice).toLocaleString()} KZT`}
              onRemove={() => updateParams({ minPrice: "" })}
            />
          )}
          {maxPrice && (
            <Chip
              label={`Max: ${Number(maxPrice).toLocaleString()} KZT`}
              onRemove={() => updateParams({ maxPrice: "" })}
            />
          )}
          <button
            onClick={clearAll}
            className="text-xs text-sand-400 hover:text-sand-600 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-terracotta-50 px-2.5 py-1 text-xs font-medium text-terracotta-700">
      {label}
      <button onClick={onRemove} className="hover:text-terracotta-900">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
