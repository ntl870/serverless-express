import "reflect-metadata";
import express from "express";
import ServerlessHttp from "serverless-http";
import dotenv from "dotenv"; // Load environment variables
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello, Express with TypeScript!" });
});

app.get("/api/greet", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

export const handler = ServerlessHttp(app);
