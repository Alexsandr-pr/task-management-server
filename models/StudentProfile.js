const { Schema, model } = require("mongoose");

const StudentProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model("StudentProfile", StudentProfileSchema);
