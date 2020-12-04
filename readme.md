# node-redis

Redis stores the data in memory as **KEY VALUE** store.

Setting and Getting methods:

```javascript
set("name", "karan");
get("name", (err, val) => console.log("val")); // returns true and prints "karan"
```

#### Connection

```javascript
const redis = require("redis");
const redisURL = "redis://127.0.0.1:6379";
// create client
const client = redis.createClient(redisURL);
```

Now we will use this client object to interact with redis server:

```javascript
client.set("name", "karan"); // returns boolean
client.get("name", (err, val) => console.log(val)); // returns true and prints "karan"
```
