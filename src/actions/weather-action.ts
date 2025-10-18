"use server";

import { WeatherClient } from "openepi-client";

const client = new WeatherClient();

type WeatherResponse = Awaited<ReturnType<typeof client.getLocationForecast>>;
export type WeatherData = WeatherResponse["data"];

export const getWeather = async (lat: number, lon: number) => {
  try {
    const response = (await client.getLocationForecast({
      lat,
      lon,
    })) as WeatherResponse;
    const { data } = response;
    console.log("Fetched weather data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
