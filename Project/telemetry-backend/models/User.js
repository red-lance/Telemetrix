const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  team: { type: String },
  vehicleType: { type: String },
  plan: {
    type: String,
    enum: ["Free", "Pro", "Enterprise"],
    default: "Free"
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
