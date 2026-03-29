import { MapPin, Clock, Users, TrendingUp } from "lucide-react";

interface TourInfoProps {
  title: string;
  description: string;
  price: string;
  location: string;
  duration: string;
  difficulty: string;
  maxGroupSize: number | null;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

export function TourInfo({
  title,
  description,
  price,
  location,
  duration,
  difficulty,
  maxGroupSize,
}: TourInfoProps) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sand-900">{title}</h1>
          <div className="mt-2 flex items-center gap-1 text-sand-500">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-terracotta-600">
            {Number(price).toLocaleString()} KZT
          </p>
          <p className="text-sm text-sand-400">per person</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${difficultyColors[difficulty] || difficultyColors.moderate}`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          {difficulty}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-ocean-100 px-3 py-1 text-sm font-medium text-ocean-700">
          <Clock className="h-3.5 w-3.5" />
          {duration}
        </span>
        {maxGroupSize && (
          <span className="inline-flex items-center gap-1 rounded-full bg-sand-100 px-3 py-1 text-sm font-medium text-sand-700">
            <Users className="h-3.5 w-3.5" />
            Max {maxGroupSize} people
          </span>
        )}
      </div>

      <div className="prose prose-sand max-w-none">
        <p className="text-sand-700 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
}
