
import express from "express";
import healthRouter from "./routes/health";
import incidentsRouter from "./routes/incidents";
import app from "./app";

const port = 3000;

app.use(express.json());


app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to the AI Cloud Operations Platform",
    endpoints: ["/", "/health"]
  });
});

app.use("/health", healthRouter);
app.use("/incidents", incidentsRouter);

app.listen(port, () => {
  console.log(
    `AI Cloud Operations Platform listening on http://localhost:${port}`
  );
});
