// Create web server

// Import modules
const express = require('express');
const router = express.Router();

// Import models
const Comment = require('../models/comment');
const Post = require('../models/post');

// Import utilities
const { checkAuthenticated } = require('../utils/authentication');

// Create comment
router.post('/', checkAuthenticated, async (req, res) => {
  const comment = new Comment({
    post: req.body.postId,
    user: req.user._id,
    content: req.body.content
  });

  try {
    await comment.save();
    res.redirect(`/posts/${req.body.postId}`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// Delete comment
router.delete('/:id', checkAuthenticated, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const post = await Post.findById(comment.post);

    if (comment.user == req.user._id || post.user == req.user._id) {
      await comment.delete();
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;

