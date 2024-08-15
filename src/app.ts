import express, {
  NextFunction,
  Request,
  Response
} from "express";

export const app = express();

// cors

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// roues import
import { ApiError, ApiResponse } from "./lib/utils.js";
import aptitudeRoute from "./routes/aptitude.routes.js";

// routes declaration
app.use("/", (req: Request, res: Response) => {
  res.status(200).send(new ApiResponse(200, {
    msg: "Wellcome to the amazing Aptitude API"
  }));
});
app.use("/api/v1/ambitionbox", aptitudeRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send(new ApiError(404, "API endpoint not found"));
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).send(new ApiError(500, "Internal Server Error"));
});
