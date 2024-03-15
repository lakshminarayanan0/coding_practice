const redisClient = require('./redis');

function getFromCache(key, callback) {
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error(err);
      callback(err, null);
    }

    if (data !== null) {
        console.log("from cache");
      callback(null, JSON.parse(data));
    } else {
      callback(null, null);
    }
  });
}

function saveToCache(key, value, expirationInSeconds) {
  redisClient.setEx(key, expirationInSeconds, JSON.stringify(value));
}

module.exports = { getFromCache, saveToCache };
