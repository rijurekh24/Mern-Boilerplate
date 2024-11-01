import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of Express

// Middleware to parse JSON requests with a limit of 30mb
app.use(express.json({ limit: "30mb", extended: true }));
// Middleware to parse URL-encoded requests with a limit of 30mb
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// CORS middleware configuration to allow all origins (modify for production)
app.use(
  cors({
    origin: "*", // Allow all origins (change this in production)
    optionsSuccessStatus: 200, // Set success status for legacy browsers
  })
);

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

connectDB();

// Starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`); // command : npm start
});

app.get("/", (req, res) => {
  res.json("Hello, World!");
});
