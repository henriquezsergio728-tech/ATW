function readNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined) return fallback;

  const value = Number(raw);
  if (!Number.isFinite(value)) {
    throw new Error(`Environment variable ${name} must be a valid number.`);
  }

  return value;
}

function readList(name: string, fallback: string[]): string[] {
  const raw = process.env[name];
  if (!raw) return fallback;

  return raw
    .split(",")
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);
}

export const config = {
  port: readNumber("PORT", 3000),
  upstreamTimeoutMs: readNumber("UPSTREAM_TIMEOUT_MS", 5000),
  timezone: process.env.TIMEZONE ?? "America/El_Salvador",
  countryCode: (process.env.COUNTRY_CODE ?? "SV").toUpperCase(),
  latitude: readNumber("LATITUDE", 13.6929),
  longitude: readNumber("LONGITUDE", -89.2182),
  locationName: process.env.LOCATION_NAME ?? "San Salvador",
  currencyQuotes: readList("CURRENCY_QUOTES", ["EUR", "GBP", "JPY"]),
} as const;
