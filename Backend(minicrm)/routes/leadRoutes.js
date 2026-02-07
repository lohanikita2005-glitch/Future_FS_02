const express = require("express");
const Lead = require("../models/Lead");

const router = express.Router();

// Add Lead
router.post("/", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Leads
router.get("/", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

module.exports = router;
