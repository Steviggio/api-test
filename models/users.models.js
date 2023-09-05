const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UsersSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, {versionKey: false});

UsersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", UsersSchema);