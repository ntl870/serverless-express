// @ts-nocheck
import "dotenv/config";
import "reflect-metadata";
import express from "express";
import serverless from "serverless-http";
import { User } from "./entities/User";
import { initializeDatabase } from "./database/data-source";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get("/users", async (req, res) => {
  try {
    const dataSource = await initializeDatabase();
    const users = await dataSource.getRepository(User).find();
    return res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

app.post("/users", async (req, res) => {
  try {
    const dataSource = await initializeDatabase();
    const body = req.apiGateway.event.body;
    // Handle potential missing body
    if (!body) {
      console.error("Request body is undefined or null");
      return res.status(400).json({
        success: false,
        message: "Missing request body1",
      });
    }

    const userRepository = dataSource.getRepository(User);
    const { firstName, lastName, age, address } = JSON.parse(body);
    console.log("Request body:", body, typeof body);
    // Validate required fields
    if (!firstName || !lastName || !age) {
      return res.status(400).json({
        success: false,
        message: "firstName, lastName, and age are required fields",
      });
    }

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;

    // Address is optional
    if (address) {
      user.address = address;
    }

    await userRepository.save(user);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
      stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
    });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Modify the handler to include raw body handling
export const handler = serverless(app);
