
import express from "express";
import healthRouter from "./routes/health";
import incidentsRouter from "./routes/incidents";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to the AI Cloud Operations Platform",
    endpoints: ["/", "/health"]
  });
});

app.use("/health", healthRouter);
app.use("/incidents", incidentsRouter);

export default app;
