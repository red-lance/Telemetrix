const express = require('express');
const router = express.Router();
const Telemetry = require('../models/Telemetry');

// GET all telemetry data
router.get('/', async (req, res) => {
  try {
    const data = await Telemetry.find().sort({ timestamp: -1 }).limit(100);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
