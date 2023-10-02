const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        trim: true
    },
    to: {
        type: String,
        required: true,
        trim: true
    },
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
    }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
