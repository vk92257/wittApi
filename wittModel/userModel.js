const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name field can not be empty'],
  },
  email: {
    type: String,
    required: [true, 'name field can not be empty'],
    unique: true,
    select: false,
  },
  password: {
    type: String,
    required: [true, 'name field can not be empty'],
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
