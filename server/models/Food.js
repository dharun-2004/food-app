// server/models/Food.js
import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true }, // must be number
  location: { type: String, required: true },
  donor: { type: String, required: true }, // username of donor
});

export default mongoose.model("Food", FoodSchema);
