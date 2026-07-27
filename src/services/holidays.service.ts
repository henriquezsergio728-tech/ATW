import { config } from "../config/index.js";
import { fetchJson } from "../lib/fetch-json.js";

interface NagerHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  global: boolean;
  types: string[];
}

export interface HolidayInfo {
  countryCode: string;
  year: number;
  upcoming: Array<{
    date: string;
    localName: string;
    name: string;
    types: string[];
  }>;
}

export async function getHolidayInfo(): Promise<HolidayInfo> {
  const year = new Date().getUTCFullYear();
  const url = `https://date.nager.at/api/v3/publicholidays/${year}/${config.countryCode}`;
  const holidays = await fetchJson<NagerHoliday[]>(url);
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = holidays
    .filter((holiday) => holiday.date >= today)
    .slice(0, 5)
    .map((holiday) => ({
      date: holiday.date,
      localName: holiday.localName,
      name: holiday.name,
      types: holiday.types,
    }));

  return {
    countryCode: config.countryCode,
    year,
    upcoming,
  };
}
