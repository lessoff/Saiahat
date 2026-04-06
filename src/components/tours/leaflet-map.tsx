"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// Fix default marker icons broken by webpack
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export type MapTour = {
  id: number;
  title: string;
  location: string;
  price: string;
  difficulty: string;
  images: string[];
};

type GeocodedTour = MapTour & { lat: number; lng: number };

const geocodeCache = new Map<string, [number, number] | null>();

async function geocodeLocation(
  location: string
): Promise<[number, number] | null> {
  if (geocodeCache.has(location)) return geocodeCache.get(location)!;

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location + ", Kazakhstan")}&format=json&limit=1`,
      { headers: { "User-Agent": "Saiahat/1.0 (tour booking app)" } }
    );
    const data = await res.json();
    const result = data[0]
      ? ([parseFloat(data[0].lat), parseFloat(data[0].lon)] as [
          number,
          number,
        ])
      : null;
    geocodeCache.set(location, result);
    return result;
  } catch {
    geocodeCache.set(location, null);
    return null;
  }
}

const difficultyColors: Record<string, string> = {
  easy: "#16a34a",
  moderate: "#ca8a04",
  hard: "#dc2626",
};

interface LeafletMapProps {
  tours: MapTour[];
}

export function LeafletMap({ tours }: LeafletMapProps) {
  const [geocoded, setGeocoded] = useState<GeocodedTour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function geocodeAll() {
      const results: GeocodedTour[] = [];
      // Batch geocode with small delay to respect Nominatim rate limit
      for (const tour of tours) {
        const coords = await geocodeLocation(tour.location);
        if (coords) {
          results.push({ ...tour, lat: coords[0], lng: coords[1] });
        }
        await new Promise((r) => setTimeout(r, 200));
      }
      setGeocoded(results);
      setLoading(false);
    }
    geocodeAll();
  }, [tours]);

  // Center on Kazakhstan
  const center: [number, number] = [48.0, 68.0];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-sand-200 shadow-sm">
      {loading && geocoded.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-sand-50/80 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-center gap-2 text-sand-500">
            <div className="w-6 h-6 border-2 border-terracotta-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading map…</span>
          </div>
        </div>
      )}
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: 520, width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geocoded.map((tour) => (
          <Marker
            key={tour.id}
            position={[tour.lat, tour.lng]}
            icon={markerIcon}
          >
            <Popup maxWidth={220}>
              <div className="p-1">
                {tour.images[0] && (
                  <img
                    src={tour.images[0]}
                    alt={tour.title}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                )}
                <p className="font-semibold text-sand-900 text-sm leading-tight mb-1">
                  {tour.title}
                </p>
                <p className="text-xs text-sand-500 mb-1">{tour.location}</p>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                    style={{
                      color: difficultyColors[tour.difficulty] ?? "#64748b",
                      background: `${difficultyColors[tour.difficulty] ?? "#64748b"}18`,
                    }}
                  >
                    {tour.difficulty}
                  </span>
                  <span className="text-xs font-bold text-terracotta-600">
                    {Number(tour.price).toLocaleString()} KZT
                  </span>
                </div>
                <Link
                  href={`/tours/${tour.id}`}
                  className="block text-center text-xs bg-terracotta-600 text-white rounded-lg py-1.5 font-medium hover:bg-terracotta-700 transition-colors"
                >
                  View Tour →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
