import { Router, type Response } from "express";
import { capture, type ServiceResult } from "../lib/result.js";
import { getCurrencyInfo } from "../services/currency.service.js";
import { getHolidayInfo } from "../services/holidays.service.js";
import { getNetworkInfo } from "../services/network.service.js";
import { getTimeInfo } from "../services/time.service.js";
import { getWeatherInfo } from "../services/weather.service.js";

export const apiRouter = Router();

function sendSingle<T>(response: Response, result: ServiceResult<T>): void {
  response.status(result.status === "ok" ? 200 : 502).json(result);
}

apiRouter.get("/time", async (_request, response) => {
  sendSingle(response, await capture(getTimeInfo));
});

apiRouter.get("/currency", async (_request, response) => {
  sendSingle(response, await capture(getCurrencyInfo));
});

apiRouter.get("/weather", async (_request, response) => {
  sendSingle(response, await capture(getWeatherInfo));
});

apiRouter.get("/network", async (_request, response) => {
  sendSingle(response, await capture(getNetworkInfo));
});

apiRouter.get("/holidays", async (_request, response) => {
  sendSingle(response, await capture(getHolidayInfo));
});

apiRouter.get("/overview", async (_request, response) => {
  const [time, currency, weather, network, holidays] = await Promise.all([
    capture(getTimeInfo),
    capture(getCurrencyInfo),
    capture(getWeatherInfo),
    capture(getNetworkInfo),
    capture(getHolidayInfo),
  ]);

  const services = { time, currency, weather, network, holidays };
  const successes = Object.values(services).filter((result) => result.status === "ok").length;

  response.json({
    status: successes === 5 ? "ok" : successes === 0 ? "error" : "partial",
    generatedAt: new Date().toISOString(),
    successfulServices: successes,
    totalServices: 5,
    services,
  });
});
