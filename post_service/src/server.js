require("dotenv").config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const routes = require('./route/route')



const PORT = process.env.PORT || 3002

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connected")).catch((err) => console.log(err));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/blog",routes)








app.listen(PORT,()=>{
    console.log(`Post_Service is running on ${PORT}`)
})


