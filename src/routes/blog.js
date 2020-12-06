const express = require("express");
const Blog = require("../model/blog");

const router = express.Router();

router.post("/api/blog", async (req, res) => {
  const { title, description, user } = req.body;
  const blog = new Blog({
    title,
    description,
    user,
  });
  await blog.save();
  res.status(201).send(blog);
});

module.exports = router;
