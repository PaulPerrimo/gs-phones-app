const mongoose = require("mongoose");

const { Schema } = mongoose;

const phoneSchema = new Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  imageFileName: { type: String, required: true },
  screen: { type: String, required: true },
  processor: { type: String, required: true },
  ram: { type: Number, required: true },
  fileImg: { type: Boolean, required: false },
});

module.exports = mongoose.model("Phone", phoneSchema);
