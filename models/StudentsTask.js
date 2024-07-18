const { Schema, model } = require("mongoose");

const StudentsTasksSchema = new Schema({
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    detailsId: { type: Schema.Types.ObjectId, ref: 'StudentTaskCompleteDetails' },
    takenAt: { type: Date, default: Date.now }
});

module.exports = model("StudentsTasks", StudentsTasksSchema);
