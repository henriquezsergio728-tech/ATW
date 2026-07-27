import { config } from "../config/index.js";
import { fetchJson } from "../lib/fetch-json.js";

interface TimeApiResponse {
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  dayOfWeek: string;
  dstActive: boolean;
}

export interface TimeInfo {
  timezone: string;
  datetime: string;
  date: string;
  time: string;
  dayOfWeek: string;
  daylightSavingTime: boolean;
}

export async function getTimeInfo(): Promise<TimeInfo> {
  const timezone = encodeURIComponent(config.timezone);
  const url = `https://timeapi.io/api/Time/current/zone?timeZone=${timezone}`;
  const response = await fetchJson<TimeApiResponse>(url);

  return {
    timezone: response.timeZone,
    datetime: response.dateTime,
    date: response.date,
    time: response.time,
    dayOfWeek: response.dayOfWeek,
    daylightSavingTime: response.dstActive,
  };
}
