const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const httpError = require("../utils/http-error");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -email -__v");

    if (!users) {
      return next(new httpError("No users found in database", 422));
    }

    res.json({ users });
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists already
    let user = await User.findOne({ email });

    if (user) {
      return next(
        new httpError("User allready registered, please try login instead", 422)
      );
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    return next(error);
  }
};

const logUserIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return next(
        new httpError(
          "No user found with that email, please check it or register if you haven't done so already",
          422
        )
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return next(new httpError("Password incorrect please try again", 422));
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    return next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("id");

    res.json({ user });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllUsers, registerUser, logUserIn, currentUser };
