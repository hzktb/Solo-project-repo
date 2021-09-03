const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  register: async (req, res) => {
    // check existing user
    try {
      const queriedUser = await User.findOne({ username: req.body.username });
      if (queriedUser) {
        res.status(400).json({ message: "username already in use" });
        return;
      }
    } catch (err) {
      res.status(400).json(err);
    }

    // no existing user, create the user
    const newUser = new User(req.body);
    try {
      const newUserObj = await newUser.save();
      res.json(newUserObj);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  login: async (req, res) => {
    //query the user
    let queriedUser;
    try {
      queriedUser = await User.findOne({ username: req.body.username });
      if (!queriedUser) {
        res.status(400).json({ message: "user not found" });
        return;
      }
    } catch (error) {
      res.status(400).json(error);
    }

    // checking the password
    const passwordCheck = bcrypt.compareSync(
      req.body.password,
      queriedUser.password
    );

    if (!passwordCheck) {
      res.status(400).json({ message: "password does not match" });
      return;
    }

    // password check pass, send the token back to client
    const usertoken = jwt.sign({ id: queriedUser._id }, process.env.SECRET_KEY);
    res
      .cookie("usertoken", usertoken, process.env.SECRET_KEY, {
        httpOnly: true,
      })
      .json({ message: "successfully logged in" });
  },

  logout: (req, res) => {
    // clears the cookie
    res.clearCookie("usertoken");
    res.json({ message: "logout successful" });
  },
};
