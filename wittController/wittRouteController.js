const mongoose = require('mongoose');
const User = require('./../wittModel/userModel');
const jwt = require('jsonwebtoken');
const signToken = (id) => {
  return jwt.sign({ id }, 'this is the secret key for the witt user');
};
exports.signUp = async (req, res) => {
  try {
    const data = await User.create(req.body);
    const token = signToken(data._id);
    // jwt.sign(
    //   { id: data._id },
    //   'this is the secret key for the witt user'
    // );

    res.status(200).json({
      error: false,
      details: {
        token: token,
        id: data._id,
        name: data.name,
        email: data.email,
      },
      message: null,
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fails',
      data: {
        details: error,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // email or password is not present.
    if (!email || !password) {
      res
        .status(400)
        .json({ status: 'fail ', message: 'please enter email or password' });
    }

    // checking if the user is already exist or not
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(400).json({
        status: 'fail ',
        message: 'incorrect email or the password is incorrect',
      });
    }

    const token = signToken(user._id);
    return res.status(200).json({
      error: false,
      details: {
        token: token,
        id: user._id,
        name: user.name,
        email: email,
      },
      message: null,
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      token: error,
    });
  }
};

exports.test = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Request Recieved',
  });
};
