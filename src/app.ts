import express from "express";
import { apiRouter } from "./routes/api.routes.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/", (_request, response) => {
    response.json({
      name: "ATW Public API Server",
      version: "0.1.0",
      endpoints: [
        "/health",
        "/api/v1/overview",
        "/api/v1/time",
        "/api/v1/currency",
        "/api/v1/weather",
        "/api/v1/network",
        "/api/v1/holidays",
      ],
    });
  });

  app.get("/health", (_request, response) => {
    response.json({
      status: "ok",
      service: "atw-public-api-server",
      timestamp: new Date().toISOString(),
    });
  });

  app.use("/api/v1", apiRouter);

  app.use((_request, response) => {
    response.status(404).json({ error: "Route not found." });
  });

  return app;
}
