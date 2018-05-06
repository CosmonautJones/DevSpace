const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Profile
const User = require("../../models/User");

// @route    GET api/profile/test
// @desc     Tests profile route
// @access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile works!" }));

// @route    GET api/profile
// @desc     Get current user's profile
// @access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }), // 'jwt' of authenticate comes from config strategy
  (req, res) => {
    const errors = {};
    
    // Find User that's logged in by their ID from the request
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
