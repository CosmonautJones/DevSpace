const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../../config/keys');

// For avatar uploads
const cloudinary = require("cloudinary");
// Credentials for cloudinary
const cloudName = keys.cloud_name;
const cloudKey = keys.cloudinary_api_key;
const cloudSecret = keys.cloudinary_api_secret;
cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecret
});

// Load User Model
const User = require("../../models/User");

// @route    GET api/users/test
// @desc     Tests users route
// @access   Public
router.get("/test", (req, res) => res.json({ msg: "Users works!" }));

// @route    GET api/users/register
// @desc     Register User
// @access   Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route    GET api/users/login
// @desc     Login User / Returning the JWT Token for user
// @access   Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check password -- Password from req.body && hashed password from DB
    bcrypt.compare(password, user.password).then(isMatch => {
      // Passes back a boolean is passwords match
      if (isMatch) {
        // User matched
        res.json({ msg: "Success!" });

        // Payload for JWT
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        // Sign Token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
