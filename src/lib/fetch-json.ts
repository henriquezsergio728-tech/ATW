import { config } from "../config/index.js";

export class UpstreamHttpError extends Error {
  constructor(
    public readonly url: string,
    public readonly status: number,
    public readonly responseBody: string,
  ) {
    super(`Upstream request failed with HTTP ${status}.`);
    this.name = "UpstreamHttpError";
  }
}

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "ATW-course-project/0.1",
    },
    signal: AbortSignal.timeout(config.upstreamTimeoutMs),
  });

  if (!response.ok) {
    const responseBody = await response.text();
    throw new UpstreamHttpError(url, response.status, responseBody.slice(0, 300));
  }

  return (await response.json()) as T;
}
