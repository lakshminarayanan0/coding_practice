
const Redis = require('redis');
const redisClient = Redis.createClient();

redisClient.connect()
.then(res=>console.log("connected to redis successfully"))
.catch(err=>console.log(err))


module.exports = redisClient;

