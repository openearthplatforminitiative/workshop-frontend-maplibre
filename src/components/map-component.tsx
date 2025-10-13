"use client"

import * as React from 'react';
import Map, { NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export function MapComponent() {
  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 0
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
    >
      <NavigationControl />
    </Map>
  );
}