const { Schema, model } = require("mongoose");

const StudentsClassesSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true }
});

module.exports = model("StudentsClasses", StudentsClassesSchema);
