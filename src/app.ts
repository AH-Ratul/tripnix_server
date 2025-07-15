import express, { Request, Response } from "express";
import cors from "cors";
import { appRouter } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", appRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "TripNix App Server is Running...",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
