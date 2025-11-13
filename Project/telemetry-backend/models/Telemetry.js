const mongoose = require("mongoose");

const TelemetrySchema = new mongoose.Schema({
  rpm: Number,
  torque: Number,
  power: Number,
  efficiency: Number,
  batteryVoltage: Number,
  accumulatorTemp: Number,
  motorTemp: Number,
  energyConsumption: Number, // kWh/100km
  signalStrength: Number, // dBm
  satellites: Number, // GPS satellites
  accuracy: Number, // meters
  altitude: Number, // meters
  uptime: Number, // hours
  systemLoad: Number, // percentage
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Telemetry", TelemetrySchema);
