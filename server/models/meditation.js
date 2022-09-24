const mongoose = require("mongoose");

const MeditationSchema = new mongoose.Schema(
  {
    goals: {
      type: String,
    },
    experience: {
      type: Number,
      min: 0,
      max: 10,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meditation", MeditationSchema);
