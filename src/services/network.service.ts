import { fetchJson } from "../lib/fetch-json.js";

interface IpifyResponse {
  ip: string;
}

export interface NetworkInfo {
  publicIp: string;
  meaning: string;
}

export async function getNetworkInfo(): Promise<NetworkInfo> {
  const response = await fetchJson<IpifyResponse>("https://api64.ipify.org?format=json");

  return {
    publicIp: response.ip,
    meaning: "Public egress IP observed for the server making this request.",
  };
}
