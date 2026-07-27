import { config } from "../config/index.js";
import { fetchJson } from "../lib/fetch-json.js";

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
}

export interface WeatherInfo {
  location: string;
  observedAt: string;
  temperature: { value: number; unit: string };
  relativeHumidity: { value: number; unit: string };
  windSpeed: { value: number; unit: string };
  weatherCode: number;
}

export async function getWeatherInfo(): Promise<WeatherInfo> {
  const params = new URLSearchParams({
    latitude: String(config.latitude),
    longitude: String(config.longitude),
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
    timezone: config.timezone,
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const response = await fetchJson<OpenMeteoResponse>(url);

  return {
    location: config.locationName,
    observedAt: response.current.time,
    temperature: {
      value: response.current.temperature_2m,
      unit: response.current_units.temperature_2m,
    },
    relativeHumidity: {
      value: response.current.relative_humidity_2m,
      unit: response.current_units.relative_humidity_2m,
    },
    windSpeed: {
      value: response.current.wind_speed_10m,
      unit: response.current_units.wind_speed_10m,
    },
    weatherCode: response.current.weather_code,
  };
}
