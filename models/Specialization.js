const { Schema, model } = require("mongoose");

const SpecializationSchema = new Schema({
    name: { type: String, required: true }
});

module.exports = model("Specialization", SpecializationSchema);
