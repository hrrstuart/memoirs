import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-type'],
    origin: "http://localhost:3000" // front-end
}));

app.use("*", (_, res) => res.status(404).json({ error: "Endpoint not found"}));

export default app;