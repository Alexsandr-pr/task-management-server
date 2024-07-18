const { Schema, model } = require("mongoose");

const UserNotificationsSchema = new Schema({
    isMessage: { type: Boolean, default: false },
    isTaskUpdate: { type: Boolean, default: false },
    isTaskDeadline: { type: Boolean, default: false },
    isMentorHelp: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model("UserNotifications", UserNotificationsSchema);
