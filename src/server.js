const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/blog");
const { redisCacheConfig } = require("./caching/cache");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

/** Redis global config */
redisCacheConfig();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to db");
  } catch (err) {
    console.log("Error connecting to database", err);
  }
};
connectMongo();

app.listen(3000, () => {
  console.log("Server listening on 3000");
});
