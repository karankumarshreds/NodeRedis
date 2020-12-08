const express = require("express");
const util = require("util");
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

router.get("/api/blog", async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

// router.get("/api/blog/user/:userId", async (req, res) => {
//   // check if we have any cache data in redis for this query
//   const cachedBlogs = await client.get(req.params.userId);
//   // if we have then fetch it from redis and return request
//   if (cachedBlogs) {
//     console.log("SERVED FROM CACHE", cachedBlogs);
//     return res.send(JSON.parse(cachedBlogs));
//   }
//   // if not then reach out to mongodb and set cache in redis
//   const blogs = await Blog.find({
//     user: req.params.userId,
//   });
//   console.log("SERVED FROM MONGO");
//   try {
//     client.set(req.params.userId, JSON.stringify(blogs));
//   } catch (error) {
//     console.log(error);
//   }
//   res.send(blogs);
// });

router.get("/api/blog/user/:userId", async (req, res) => {
  const blogs = await Blog.find({ user: req.params.userId });
  res.send(blogs);
});

module.exports = router;
