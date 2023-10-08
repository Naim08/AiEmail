const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    dateSent: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
        required: true,
    },
    fromEmail: {
        type: String,
        // required: true,
        default: "",
    },
    snippet: {
        type: String,
        // required: true,
        default: "",
    },
    threadId: {
        type: String,
        // required: true,
        default: "",
    },
    responseUrl: {
        type: String,
        // required: true,
        default: "",
    },
    emailId: {
        type: String,
        // required: true,
        default: "",
    },
    to: {
        type: String,
        // required: true,
        default: "",
    },
});

module.exports = mongoose.model("Email", emailSchema);
