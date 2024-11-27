const mongoose = require("mongoose");
const passportLoaclMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLoaclMongoose);
module.exports = mongoose.model("User", userSchema);
