const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const express = require("express");

const router = express.Router();
async function signup_test(req, res) {
  const { email, password, phoneno, role } = req.body;
  let user_data = {
    email,
    password,
    phoneno,
  };

  if (role) {
    user_data.role = role;
  }

  const new_user = new User(user_data);
  await new_user.save();

  return res.status(201).json({
    msg: "new user created successfully",
  });
}

async function login_test(req, res) {
  const { email, password } = req.body;
  const db_user = await User.findOne({ email: email });

  try {
    const isPassValid = await bcrypt.compare(password, db_user.password);
    if (!isPassValid) {
      return res.status(403).json({ err: "Invalid creds" });
    }

    const token = jwt.sign(
      { userId: db_user._id, role: db_user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({ msg: "login successful", token: token });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ err: e });
  }
}

// router.post("/login", login);
// router.post("/signup", signup);

router.post("/signup", signup_test);
router.post("/login", login_test);

module.exports = router;