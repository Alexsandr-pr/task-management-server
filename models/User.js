const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    role: { type: String, enum: ['STUDENT', 'MENTOR'], default:"STUDENT"},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLogin: Date,
    dateJoined: { type: Date, default: Date.now },
    isEmailVerified: { type: Boolean, default: false },
    activationLink: {type:String, required:true, unique:true}
});

module.exports = model("User", UserSchema);
