const express = require("express");
const router = express.Router();

// Example user endpoints
router.get("/", (req, res) => {
  res.json({ message: "List all users (to be implemented)" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Get user by ID ${req.params.id} (to be implemented)` });
});

module.exports = router;
