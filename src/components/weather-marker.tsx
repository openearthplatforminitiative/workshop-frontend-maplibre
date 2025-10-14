"use client"

import { getWeather, WeatherData } from "@/actions/weather-action";
import Image from "next/image";
import { WeatherClient } from "openepi-client";
import { useCallback, useEffect, useState } from "react";
import { MapMouseEvent, Marker, useMap } from "react-map-gl/maplibre"

const client = new WeatherClient();

export const WeatherMarker = () => {
  const [latlng, setLatlng] = useState<{ latitude: number; longitude: number }>()
  const [weather, setWeather] = useState<WeatherData>()

  const map = useMap()

  const precipitation = weather?.properties.timeseries[0].data.next_6_hours?.details.precipitation_amount;
  const temperature = weather?.properties.timeseries[0].data.instant.details?.air_temperature;
  const windSpeed = weather?.properties.timeseries[0].data.instant.details?.wind_speed;
  const symbol = weather?.properties.timeseries[0].data.next_6_hours?.summary.symbol_code;

  const handleMarkerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLatlng(undefined)
  }

  const handleMapClick = useCallback((e: MapMouseEvent) => {
    setLatlng({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng
    })
    getWeather(e.lngLat.lat, e.lngLat.lng).then(setWeather).catch(console.error)
  }, [])

  useEffect(() => {
    const mapRef = map.current
    if (!mapRef) return

    mapRef.on('click', handleMapClick)
    return () => {
      mapRef.off('click', handleMapClick)
    }
  }, [handleMapClick, map])

  if (!latlng || !weather) return null

  return (
    <Marker longitude={latlng.longitude} latitude={latlng.latitude} anchor="bottom">
      <div>
        {weather ? (
          <div className="p-4 w-[300px] bg-white/50 backdrop-blur-lg text-black rounded shadow border border-gray-300">
            <div className="font-bold text-2xl">Weather</div>
            <button className="absolute top-1 right-3 text-2xl text-gray-500 hover:text-gray-700 curosr-pointer" onClick={handleMarkerClick}>X</button>
            <div className="flex items-center justify-between">
              <Image src={`/weather-icons/${symbol}.png`} alt="Weather icon" width={100} height={100} />
              <div className="grid grid-cols-2">
                {temperature && (
                  <p><span className="font-bold">Temperature:</span> {temperature} °C</p>
                )}
                {!!precipitation && (
                  <p><span className="font-bold">Precipitation:</span> {precipitation} mm</p>
                )}
                {windSpeed && (
                  <p><span className="font-bold">Wind Speed:</span> {windSpeed} m/s</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 bg-white rounded shadow">Loading...</div>
        )}
      </div>
    </Marker>
  )
}