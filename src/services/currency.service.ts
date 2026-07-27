import { config } from "../config/index.js";
import { fetchJson } from "../lib/fetch-json.js";

interface FrankfurterRate {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export interface CurrencyInfo {
  base: "USD";
  asOf: string | null;
  rates: Record<string, number>;
}

export async function getCurrencyInfo(): Promise<CurrencyInfo> {
  const quotes = encodeURIComponent(config.currencyQuotes.join(","));
  const url = `https://api.frankfurter.dev/v2/rates?base=USD&quotes=${quotes}`;
  const rows = await fetchJson<FrankfurterRate[]>(url);

  const rates = Object.fromEntries(rows.map((row) => [row.quote, row.rate]));
  const asOf = rows[0]?.date ?? null;

  return {
    base: "USD",
    asOf,
    rates,
  };
}
