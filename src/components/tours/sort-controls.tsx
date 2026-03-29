"use client";

import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function SortControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "popularity";

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`/tours?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-sand-500">Sort by:</span>
      <div className="flex gap-1">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSort(option.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              currentSort === option.value
                ? "bg-terracotta-500 text-white"
                : "bg-sand-100 text-sand-600 hover:bg-sand-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
