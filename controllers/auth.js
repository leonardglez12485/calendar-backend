const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  let createdUser = await User.findOne({ email });
  if (createdUser) {
    return res.status(400).json({
      message: "User whith this email already exists",
      status: "error",
    });
  }

  const user = new User({ name, email, password });

  try {
    //*Encrypt password*/
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    createdUser = await user.save();
    const token = await generateJWT(createdUser.id, createdUser.name);
    res.status(201).json({
      message: "User registered successfully",
      status: "success",
      data: {
        createdUser,
        token,
      },
    });
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      error: error.message,
    });
  }
};

//*Login user

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let logeddUser = await User.findOne({ email });
    if (!logeddUser) {
      return res.status(400).json({
        message: "User whith this email not exists",
        status: "error",
      });
    }
    const validPassword = bcrypt.compareSync(password, logeddUser.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
        status: "error",
      });
    }
    const token = await generateJWT(logeddUser.id, logeddUser.name);
    res.json({
      message: "User logged in successfully",
      status: "success",
      data: {
        logeddUser,
        token,
      },
    });
  } catch (error) {
    console.log("Error logging in user:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      error: error.message,
    });
  }
};

//*Renew token*/
const renewToken = async (req, res = response) => {
  const { uid, name } = req;
  const newToken = await generateJWT(uid, name);

  res.json({
    message: "Token renewed successfully",
    status: "success",
    data: {
      token: newToken,
      uid,
      name,
    },
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
