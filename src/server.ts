import "dotenv/config";
import { createApp } from "./app.js";
import { config } from "./config/index.js";

const app = createApp();

const server = app.listen(config.port, "0.0.0.0", () => {
  console.log(`ATW server listening on http://localhost:${config.port}`);
});

function shutdown(signal: string): void {
  console.log(`${signal} received. Closing HTTP server...`);
  server.close((error) => {
    if (error) {
      console.error("Failed to close the server cleanly.", error);
      process.exit(1);
    }

    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
