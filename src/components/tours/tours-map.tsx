"use client";

import dynamic from "next/dynamic";
import type { MapTour } from "./leaflet-map";

const LeafletMap = dynamic(
  () => import("./leaflet-map").then((m) => m.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-2xl border border-sand-200 bg-sand-100 animate-pulse flex items-center justify-center text-sand-400 text-sm">
        Loading map…
      </div>
    ),
  }
);

interface ToursMapProps {
  tours: MapTour[];
}

export function ToursMap({ tours }: ToursMapProps) {
  return <LeafletMap tours={tours} />;
}
