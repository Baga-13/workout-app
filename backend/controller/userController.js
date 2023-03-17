const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// creating a token
const createToken = (_id) => {
  // three parameters a required
  return jwt.sign({ _id }, process.env.SECRET_PASSWORD, { expiresIn: "3d" });
};

// controller for login user
const loginUser = async (req, res) => {
  // rrequired parameter
  const { email, password } = req.body;

  try {
    // we now make use of required parameter
    const user = await User.login(email, password);

    // creating a token here
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// controller for signup user
const signupUser = async (req, res) => {
  // required parameter
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // creating a token here
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
