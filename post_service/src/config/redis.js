const redis = require('ioredis')

const redisClient = new redis(process.env.REDIS_URL);



module.exports = {redisClient}