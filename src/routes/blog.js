const express = require("express");
const Blog = require("../model/blog");

const router = express.Router();
// redis config
const redis = require("redis");
const redisURL = "redis://127.0.0.1:6379";
const client = redis.createClient(redisURL);

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

router.get("/api/blog", async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

router.get("/api/blog/user/:userId", async (req, res) => {
  // check if we have any cache data in redis for this query
  // if we have then fetch it from redis and return request
  // if not then reach out to mongodb and set cache in redis
  const blogs = await Blog.find({
    user: req.params.userId,
  });
  res.send(blogs);
});

module.exports = router;
