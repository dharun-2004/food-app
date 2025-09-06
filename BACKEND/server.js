// backend/src/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const foodRoutes = require("./routes/foods");
const userRoutes = require("./routes/users");

const PORT = 5000;
const MONGO_URI =
  "mongodb+srv://tharuntharun1846_db_user:Gftau9P8Y6NbzwbK@cluster0.vaqh1m8.mongodb.net/foodshare?retryWrites=true&w=majority&appName=Cluster0";
const CLIENT_ORIGIN = "http://localhost:5173";

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/users", userRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Food Share API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Connect DB and start server
(async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
})();
