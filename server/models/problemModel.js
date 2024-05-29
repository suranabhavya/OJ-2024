const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: false },
});

module.exports = mongoose.model("Problem", problemSchema);