const express = require("express");
const router = express.Router();

// Example food endpoints
router.get("/", (req, res) => {
  res.json({ message: "List available foods (to be implemented)" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create new food listing (to be implemented)" });
});

module.exports = router;
