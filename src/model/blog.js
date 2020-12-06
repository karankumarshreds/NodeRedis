const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
});

module.exports = mongoose.model("Blog", blogSchema);
