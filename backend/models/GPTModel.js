const mongoose = require("mongoose");

const GPTModelSchema = new mongoose.Schema({
  modelId: {
    type: String,
    required: true,
  },
  modelObject: {
    type: String,
    required: true,
  },
  modelOwner: {
    type: String,
    required: true,
  },
  permissions: {
    type: Array,
    default: null,
  },
  created: {
    type: Date,
    default: null,
  },
  ready: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("GPTModel", GPTModelSchema);
