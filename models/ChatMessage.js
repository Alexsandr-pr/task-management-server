const { Schema, model } = require("mongoose");

const ChatMessageSchema = new Schema({
    text: { type: String, required: true },
    imageUrl: String,
    createdAt: { type: Date, default: Date.now },
    isEdited: { type: Boolean, default: false },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true }
});

module.exports = model("ChatMessage", ChatMessageSchema);
