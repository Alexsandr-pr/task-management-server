const { Schema, model,ObjectId } = require("mongoose");

const ChatSchema = new Schema({
    firstUser: { type: ObjectId, ref: 'User', required: true },
    secondUser: { type: ObjectId, ref: 'User', required: true }
});

module.exports = model("Chat", ChatSchema);
