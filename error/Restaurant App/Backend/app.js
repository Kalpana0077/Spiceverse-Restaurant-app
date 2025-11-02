import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationsRoute.js";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"], // default for local dev
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to Database
dbConnection();

// ✅ Routes
app.use("/api/reservations", reservationRouter);

// ✅ Test route (fixed argument)
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB 🚀");
});

// ✅ Global Error Middleware
app.use(errorMiddleware);

export default app;
