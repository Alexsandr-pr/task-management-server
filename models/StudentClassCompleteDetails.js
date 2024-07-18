const { Schema, model } = require("mongoose");

const StudentTaskCompleteDetailsSchema = new Schema({
    videoWatchedTime: Number,
    assignedFileUrl: String,
    assignedText: String,
    assigneeDate: Date,
    isCompleted: { type: Boolean, default: false }
});

module.exports = model("StudentTaskCompleteDetails", StudentTaskCompleteDetailsSchema);
