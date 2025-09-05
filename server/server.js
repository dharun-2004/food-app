// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

const app = express();

// Hardcoded configurations
const PORT = 5000;
const MONGO_URI = "mongodb+srv://tharuntharun1846_db_user:Gftau9P8Y6NbzwbK@cluster0.vaqh1m8.mongodb.net/foodshare?retryWrites=true&w=majority&appName=Cluster0";
const CLIENT_ORIGIN = "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));