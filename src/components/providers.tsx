"use client"

import { MapProvider } from "react-map-gl/maplibre";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <MapProvider>{children}</MapProvider>;
}