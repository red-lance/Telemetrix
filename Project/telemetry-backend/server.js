const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const WebSocket = require('ws');
const Telemetry = require('./models/Telemetry');

const app = express();
app.use(express.json());
app.use(cors()); // <-- Add this line (allows all origins)


dotenv.config();

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

// Import Routes
const authRoutes = require('./routes/auth');
const telemetryRoutes = require('./routes/telemetry');

app.use('/api/auth', authRoutes);
app.use('/api/telemetry', telemetryRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// WebSocket setup
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Stream latest telemetry data every second
  const sendData = async () => {
    const data = await Telemetry.find().sort({ timestamp: -1 }).limit(1);
    ws.send(JSON.stringify(data[0]));
  };

  const interval = setInterval(sendData, 1000);

  ws.on('close', () => clearInterval(interval));
});

// --- Simulate Live Telemetry Data (Realistic for All Pages) ---
let time = 0;
let increasing = true;
let uptime = 0;

const generateLiveTelemetry = async () => {
  try {
    // Acceleration/Deceleration pattern
    if (increasing) time += 0.5;
    else time -= 0.5;
    if (time >= 20) increasing = false;
    if (time <= 0) increasing = true;

    // --- Core telemetry ---
    let rpm = Math.floor(Math.max(0, 2000 + Math.sin(time / 2) * 6000 + Math.random() * 500));
    let torque = Math.floor(Math.max(0, 100 + Math.cos(time / 3) * 150 + Math.random() * 20));
    let power = Math.floor(Math.max(0, (rpm * torque) / 9550));

    // --- Efficiency behavior (drops under high/low load) ---
    const powerRatio = power / 280;
    let efficiency = 95 - Math.abs(powerRatio - 0.6) * 40 + (Math.random() * 2 - 1);
    efficiency = Math.min(Math.max(efficiency, 70), 98);
    efficiency = Math.round(efficiency);

    // --- Battery & temperatures ---
    let voltageDrop = Math.min(power / 20, 30);
    let recovery = increasing ? 0 : Math.random() * 3;
    let batteryVoltage = 400 - voltageDrop + recovery + Math.random() * 2;
    batteryVoltage = Math.max(360, Math.min(batteryVoltage, 405));
    batteryVoltage = Math.round(batteryVoltage);

    let accumulatorTemp = Math.floor(Math.max(0, 28 + (power / 50) + Math.random() * 2));
    let motorTemp = Math.floor(Math.max(0, 50 + (torque / 4) + (rpm / 1000) + Math.random() * 3));

    // --- Extra Data Simulation ---
    let energyConsumption = Math.max(16 + (power / 1000) * 4 + Math.random() * 2, 16); // 16–25 kWh/100km
    let signalStrength = -70 + Math.sin(time / 4) * 5 + (Math.random() * 4 - 2); // -65 to -75 dBm
    let satellites = Math.max(8, Math.round(10 + Math.sin(time / 5) * 3 + Math.random() * 2)); // 8–14 sats
    let accuracy = Math.max(1.5, (10 - satellites * 0.5) + Math.random() * 1); // inversely linked
    let altitude = Math.round(240 + Math.sin(time / 3) * 10 + Math.random() * 2); // ~240–260m
    uptime += 0.003; // adds roughly 10s per data cycle
    let systemLoad = Math.round(20 + (Math.random() * 10 + Math.abs(Math.sin(time)) * 15)); // 20–45%

    // --- Round for neat UI ---
    rpm = Math.round(rpm / 10) * 10;
    torque = Math.round(torque / 10) * 10;
    power = Math.round(power / 10) * 10;
    energyConsumption = Math.round(energyConsumption * 10) / 10;

    // --- Save to Mongo ---
    const newEntry = new Telemetry({
      rpm,
      torque,
      power,
      efficiency,
      batteryVoltage,
      accumulatorTemp,
      motorTemp,
      energyConsumption,
      signalStrength,
      satellites,
      accuracy,
      altitude,
      uptime: Math.round(uptime * 10) / 10,
      systemLoad,
      timestamp: new Date(),
    });

    await newEntry.save();

    console.log(
      `Inserted → RPM:${rpm}, Power:${power}, Eff:${efficiency}%, Batt:${batteryVoltage}V, EC:${energyConsumption}kWh/100km, Sats:${satellites}, Load:${systemLoad}%`
    );
  } catch (err) {
    console.error("Telemetry generation error:", err);
  }
};

// Generate new telemetry every 3 seconds
setInterval(generateLiveTelemetry, 3000);
