import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.DB_URL as string);
    console.log("Connected to Database");

    server = app.listen(config.PORT, () => {
      console.log(`Server is listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log("server error -> ", error);
  }
}

main();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved.. shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal recieved.. shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// handlig unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log("Unhandeld Rejection detected.. shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log("Uncought Exception detected.. Shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
