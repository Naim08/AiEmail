const mongoose = require("mongoose");

const chatGPTSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: false,
  },
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  modelUsed: {
    type: String,
    default: "text-davinci-003",
  },
  apiParameters: {
    temperature: Number,
    maxTokens: Number,
  },
  apiResponseMetadata: {
    duration: Number,
    responseId: String,
  },
  errorData: {
    type: {
      errorCode: Number,
      errorMessage: String,
    },
    default: null,
  },
  userContext: {
    deviceInfo: String,
    userAgent: String,
    location: String,
  },
  costData: {
    type: Number,
    default: 0, // If the API doesn't provide this, you might default to zero
  },
  version: String,
  interactionType: String,
  feedback: {
    type: String,
    default: null,
  },
  userBehavior: {
    interactionFrequency: Number,
    responseReadingDuration: Number,
    followUpQueries: Number,
    modifiedPrompt: Boolean,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatGPT = mongoose.model("ChatGPT", chatGPTSchema);
module.exports = ChatGPT;
