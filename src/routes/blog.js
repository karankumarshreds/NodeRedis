const express = require("express");

const router = express.Router();

router.post("/api/blog", async (req, res) => {
  const { title, description } = req.body;
  console.log(title, description);
  res.send({ ok: "ok" });
});

module.exports = router;
