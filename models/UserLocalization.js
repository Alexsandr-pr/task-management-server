const { Schema, model } = require("mongoose");

const UserLocalizationSchema = new Schema({
    languageId: { type: String, required: false },
    timezoneId: { type: String, required: false },
    hourFormat: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model("UserLocalization", UserLocalizationSchema);
