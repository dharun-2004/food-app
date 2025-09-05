// server/routes/foodRoutes.js
import express from "express";
import Food from "../models/Food.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    let { item, quantity, location } = req.body;
    quantity = Number(quantity);

    if (!item || !quantity || !location) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newFood = new Food({
      item,
      quantity,
      location,
      donor: req.user.username || "Unknown Donor",
    });

    await newFood.save();
    res.json(newFood);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;   // ✅ important
