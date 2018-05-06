const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Post Model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/post");

// @route    GET api/posts/test
// @desc     Tests post route
// @access   Public
router.get("/test", (req, res) => res.json({ msg: "Posts works!" }));

// @route    GET api/posts
// @desc     Get all post
// @access   Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 }) // gets latest
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

// @route    GET api/posts/:id
// @desc     Get specific post
// @access   Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route    POST api/posts
// @desc     Create post
// @access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(erros);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.json(err));
  }
);

// @route    DELETE api/posts/:id
// @desc     Delete post
// @access   Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ noauthorixed: "User not authorized" });
          }

          // Delete Post
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

module.exports = router;
