const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Letter = mongoose.model("Letter", letterSchema);
