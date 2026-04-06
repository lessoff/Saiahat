"use client";

import { MapPin, ExternalLink } from "lucide-react";

interface TourMapProps {
  location: string;
}

export function TourMap({ location }: TourMapProps) {
  const query = encodeURIComponent(`${location}, Kazakhstan`);
  const embedSrc = `https://maps.google.com/maps?q=${query}&output=embed&z=10`;
  const mapsUrl = `https://www.google.com/maps/search/${query}`;

  return (
    <div className="rounded-2xl border border-sand-200 overflow-hidden bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-sand-200">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-terracotta-600" />
          <span className="font-semibold text-sand-800 text-sm">Location</span>
          <span className="text-sand-500 text-sm">— {location}</span>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-terracotta-600 hover:text-terracotta-700 font-medium transition-colors"
        >
          Open in Maps
          <ExternalLink size={12} />
        </a>
      </div>
      <iframe
        src={embedSrc}
        width="100%"
        height="340"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${location}`}
      />
    </div>
  );
}
