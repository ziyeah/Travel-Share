const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // unique ==> Assign a index to email. Speed up the query process
  // Can't varify whether the email is already exist. 
  // To do that use npm package: mongoose-unique-validator
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places:  [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);