const { Schema, model } = require("mongoose");

const MentorProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true }
});

module.exports = model("MentorProfile", MentorProfileSchema);
