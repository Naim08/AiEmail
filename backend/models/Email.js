
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({

    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    dateSent: {
        type: Date,
        default: Date.now
    },
    to: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});




module.exports = mongoose.model("Email", emailSchema);
