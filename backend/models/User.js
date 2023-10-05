const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    googleAccessToken: {
      type: String,
      default: null,
    },
    googleRefreshToken: {
      type: String,
      default: null,
    },
    googleTokenExpiry: {
      type: Date,
      default: null,
    },
    emails: [{
        type: Schema.Types.ObjectId,
        ref: 'Email'
    }]
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("User", userSchema);
