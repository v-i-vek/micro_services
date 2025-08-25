require("dotenv").config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const redis = require('ioredis')

const routes = require('./route/route')



const PORT = process.env.PORT || 3002

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connected")).catch((err) => console.log(err));
const redisClient = new redis(process.env.REDIS_URL)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/blog",(req, res, next) => {
    req.redisClient = redisClient;
    next();
  },routes)








app.listen(PORT,()=>{
    console.log(`Post_Service is running on ${PORT}`)
})


