const mongoose = require('mongoose');
const Telemetry = require('./models/Telemetry'); // make sure this path is correct

// Connect to local MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/telemetryDB')
  .then(() => console.log('✅ MongoDB connected for seeding'))
  .catch(err => console.log(err));

async function seedData() {
  const fakeData = [];

  // Generate 100 random telemetry entries
  for (let i = 0; i < 100; i++) {
    fakeData.push({
      timestamp: new Date(Date.now() - i * 1000),
      rpm: Math.floor(Math.random() * 8000),  // random RPM
      torque: (Math.random() * 300).toFixed(2), // random torque
      power: (Math.random() * 200).toFixed(2)   // random power
    });
  }

  await Telemetry.insertMany(fakeData);
  console.log('✅ 100 fake telemetry entries inserted!');
  mongoose.connection.close();
}

seedData();
