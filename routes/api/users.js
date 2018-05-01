const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// For avatar uploads
const cloudinary = require("cloudinary");
// Credentials for cloudinary
const cloudName = require("../../config/keys").cloud_name;
const cloudKey = require("../../config/keys").cloudinary_api_key;
const cloudSecret = require("../../config/keys").cloudinary_api_secret;
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

module.exports = router;
