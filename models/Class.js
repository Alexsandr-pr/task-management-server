const { Schema, model } = require("mongoose");

const ClassSchema = new Schema({
    name: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' }
});

module.exports = model("Class", ClassSchema);
