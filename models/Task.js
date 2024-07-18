import { Schema, model, models } from "mongoose";



const TaskSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    videoUrl: String,
    imageUrl: String,
    dueTime: Date,
    createdAt: { type: Date, default: Date.now },
    specializationId: { type: Schema.Types.ObjectId, ref: 'Specialization' }
});

module.exports = model("Task", TaskSchema);
