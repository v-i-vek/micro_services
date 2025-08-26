const {redisClient} = require('../config/redis')


const invalidateCache = async(cacheKey)=>{
try {
    await redisClient.del(cacheKey)
} catch (error) {
    console.error("error while executing invaliateCache function",error)
    throw error
}

}

module.exports = {
  invalidateCache,
};