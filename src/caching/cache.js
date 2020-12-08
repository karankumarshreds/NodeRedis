const { json } = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

// redis config
const redisURL = "redis://127.0.0.1:6379";
const client = redis.createClient(redisURL);
client.get = util.promisify(client.get);

function redisCacheConfig() {
  // backup of default exec method
  const exec = mongoose.Query.prototype.exec;
  // overriding the default behaviour of exec
  mongoose.Query.prototype.exec = async function () {
    /**
     * @redisKey
     * this.getQuery() => { user: 'user_1' }
     * this.mongooseCollection.name => COLLECTION NAME blogs
     * right before running the query in the db add that query
     * as the key for redis and save results in the cache
     */

    const redisKey = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name,
      })
    ); // { user: 'user_1', collection: 'blogs' }

    // see if we have redis key in redis cache
    const cacheValue = await client.get(redisKey);
    if (cacheValue) {
      console.log("CACHE VALUE", cacheValue);
      return JSON.parse(cacheValue); // as result
    }
    // if cache value does not exist run the original query
    const result = await exec.apply(this, arguments);
    client.set(redisKey, JSON.stringify(result));
    return result;
  };
}

module.exports = { redisCacheConfig };
