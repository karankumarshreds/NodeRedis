# node-redis

Redis stores the data in memory as **KEY VALUE** store.

Setting and Getting methods:

```javascript
set("name", "karan");
get("name", (err, val) => console.log("val")); // returns true and prints "karan"
```

### Connection

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

### Nested Hash

This is a data structure which is a nested key-value store :

```javascript
KEY: 'football'
VALUE: { key: 'club', value: 'Manchester United' }
```

**methods used :**

- hset()
- hget()

```javascript
client.hset("football", "club", "manchester united");
client.hget("football", "club", (err, val) => console.log(val)); // returns true
// and prints "manchester united"
```

### NOTE :

SET function only takes in either `string` or `number` as a value inputs. In case you wish to pass in the JavaScript object, you would need to stringify it first:

```javascript
client.set('football', JSON.stringify({ club: "manchester united" })
client.get('football', (err, val) => console.log(val));  // returns true
                                                         // and prints {"club":"manchester united"}
client.get('football', (err, val) => console.log(JSON.parse(val))); // returns true
                                                         // and prints { club: 'manchester united' }
```

### Clean Redis Cache

```javascript
client.flushall();
```
