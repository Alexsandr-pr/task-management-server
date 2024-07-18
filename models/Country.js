const { Schema, model } = require("mongoose");

const CountrySchema = new Schema({
    name: { type: String, required: true }
});

module.exports = model("Country", CountrySchema);
