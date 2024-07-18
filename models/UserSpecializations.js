const { Schema, model } = require("mongoose");

const UsersSpecializationsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    specializationId: [{ type: Schema.Types.ObjectId, ref: 'Specialization', required: true }]
});

module.exports = model("UsersSpecializations", UsersSpecializationsSchema);
